import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Blog } from '../lib/supabase';
import Breadcrumb from '../components/Breadcrumb';
import Loader from '../components/Loader';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', id)
        .single();

      if (error) throw error;
      setBlog(data);

      // Fetch related posts
      if (data) {
        const { data: related } = await supabase
          .from('blogs')
          .select('*')
          .neq('id', data.id)
          .eq('published', true)
          .eq('category', data.category)
          .limit(3);

        setRelatedPosts(related || []);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!blog) return;

    const shareData = {
      title: blog.title,
      text: blog.excerpt,
      url: window.location.href
    };

    try {
      await navigator.clipboard.writeText(
        `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
      );
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Unable to share. Please manually copy the URL from your browser.');
    }
  };

  if (loading) {
    return (
      <main className="pt-32 min-h-screen">
        <div className="container mx-auto px-4">
          <Loader size="large" />
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="pt-32 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <Link to="/blog" className="text-green-600 hover:text-green-700">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 min-h-screen bg-gray-50">
      <Breadcrumb pageName={blog.title} />
      
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-[300px] md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {Math.ceil(blog.content.length / 1000)} min read
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-700"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
                <p className="text-lg text-gray-600 italic mb-6">{blog.excerpt}</p>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100">
              <div className="prose max-w-none text-gray-700">
                <div className="text-lg leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm text-gray-600">Published in</p>
                    <p className="font-semibold text-gray-900">{blog.category}</p>
                  </div>
                </div>
                <button 
                  onClick={handleShare}
                  className={`flex items-center ${
                    shareSuccess ? 'text-green-600' : 'text-gray-600'
                  } hover:text-gray-900 transition-colors`}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  {shareSuccess ? 'Copied!' : 'Share'}
                </button>
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-600">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Link
              to="/blog"
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Blog
            </Link>
            {relatedPosts.length > 0 && (
              <Link
                to={`/blog/${relatedPosts[0].slug}`}
                className="flex items-center text-green-600 hover:text-green-700"
              >
                Next Article
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;