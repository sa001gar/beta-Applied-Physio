import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Eye, EyeOff, Loader2, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Blog } from '../lib/supabase';
import slugify from 'slugify';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

type BlogFormData = Omit<Blog, 'id' | 'author_id' | 'created_at' | 'updated_at'>;

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      setValue('content', editor.getText());
    }
  });

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<BlogFormData>();

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (editingBlog) {
      setValue('title', editingBlog.title);
      setValue('excerpt', editingBlog.excerpt);
      setValue('content', editingBlog.content);
      setValue('image_url', editingBlog.image_url);
      setValue('category', editingBlog.category);
      setValue('tags', editingBlog.tags ? editingBlog.tags.join(', ') : '');
      setValue('published', editingBlog.published);
      editor?.commands.setContent(editingBlog.content);
      setShowForm(true);
    }
  }, [editingBlog, setValue, editor]);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateWithRetry = async (model: any, prompt: string, attempt = 1): Promise<any> => {
    try {
      const result = await model.generateContent(prompt);
      setRetryCount(0); // Reset retry count on success
      return result;
    } catch (error: any) {
      if (error.message?.includes('503') && attempt <= MAX_RETRIES) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1);
        console.log(`Retry attempt ${attempt} after ${delay}ms delay`);
        await sleep(delay);
        return generateWithRetry(model, prompt, attempt + 1);
      }
      throw error;
    }
  };

  const generateBlogContent = async () => {
    const topic = watch('title');
    if (!topic) {
      alert('Please enter a topic first');
      return;
    }

    setGenerating(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const prompt = `Write a professional blog post about "${topic}" for a physiotherapy clinic website. Include:
      1. An engaging introduction
      2. Key points and explanations
      3. Professional medical terminology where appropriate
      4. A conclusion with actionable advice
      5. Suggest 3-5 relevant tags for the blog post
      
      Format the response as JSON with these keys:
      {
        "title": "The final title",
        "excerpt": "A compelling 2-3 sentence summary",
        "content": "The full blog post content",
        "tags": ["tag1", "tag2", "tag3"],
        "category": "The most appropriate category"
      }`;

      const result = await generateWithRetry(model, prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        // Remove markdown characters and trim whitespace before parsing JSON
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();
        const blogData = JSON.parse(cleanedText);
        
        setValue('title', blogData.title);
        setValue('excerpt', blogData.excerpt);
        setValue('content', blogData.content);
        setValue('category', blogData.category);
        setValue('tags', blogData.tags.join(', '));
        editor?.commands.setContent(blogData.content);

        // Generate a relevant image URL with retry mechanism
        const imagePrompt = `Give me a relevant Unsplash image URL for a blog post about ${topic}. The image should be professional and medical/physiotherapy related. Only return the URL, nothing else.`;
        const imageResult = await generateWithRetry(model, imagePrompt);
        const imageUrl = (await imageResult.response).text().trim();
        setValue('image_url', imageUrl);
      } catch (error) {
        console.error('Error parsing AI response:', error);
        alert('Error parsing AI response. Please try again or fill in the form manually.');
      }
    } catch (error: any) {
      console.error('Error generating blog:', error);
      if (error.message?.includes('503')) {
        alert('The AI service is currently experiencing high load. Please try again in a few moments.');
      } else {
        alert('Error generating blog content. Please try again or fill in the form manually.');
      }
    } finally {
      setGenerating(false);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    setSaving(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Not authenticated');

      const slug = slugify(data.title, { lower: true, strict: true });
      
      // Convert comma-separated tags string to array and clean up
      const tagsArray = data.tags 
        ? data.tags.split(',')
            .map(tag => tag.trim())
            .filter(Boolean)
            .map(tag => tag.toLowerCase())
        : [];

      const blogData = {
        ...data,
        tags: tagsArray,
        slug,
        content: editor?.getText() || data.content,
        updated_at: new Date().toISOString()
      };

      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingBlog.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([{
            ...blogData,
            author_id: user.id
          }]);

        if (error) throw error;
      }

      await fetchBlogs();
      reset();
      setShowForm(false);
      setEditingBlog(null);
      editor?.commands.setContent('');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    setDeleting(id);
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog post. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ published: !blog.published })
        .eq('id', blog.id);

      if (error) throw error;
      await fetchBlogs();
    } catch (error) {
      console.error('Error toggling publish status:', error);
      alert('Error updating blog status. Please try again.');
    }
  };

  return (
    <main className="pt-32 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <button
            onClick={() => {
              setEditingBlog(null);
              reset();
              editor?.commands.setContent('');
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            New Post
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                  </h2>
                  <button
                    onClick={generateBlogContent}
                    disabled={generating}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {generating ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Wand2 className="w-5 h-5" />
                    )}
                    {generating ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        {...register('title', { required: 'Title is required' })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <input
                        {...register('category', { required: 'Category is required' })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      {...register('image_url', { required: 'Image URL is required' })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      {...register('excerpt', { required: 'Excerpt is required' })}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <div className="prose max-w-none">
                      <EditorContent 
                        editor={editor} 
                        className="min-h-[300px] border rounded-lg p-4 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      {...register('tags')}
                      placeholder="physiotherapy, rehabilitation, health"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Enter tags separated by commas (e.g., physiotherapy, sports, health)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register('published')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Publish immediately
                    </label>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingBlog(null);
                        reset();
                        editor?.commands.setContent('');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      {saving ? 'Saving...' : 'Save Post'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.map(blog => (
              <motion.div
                key={blog.id}
                layout
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Category: {blog.category}</span>
                        <span>•</span>
                        <span>
                          {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => togglePublish(blog)}
                        className={`p-2 rounded-lg transition-colors ${
                          blog.published
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title={blog.published ? 'Unpublish' : 'Publish'}
                      >
                        {blog.published ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => setEditingBlog(blog)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deleting === blog.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === blog.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogAdmin;