import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Blog } from '../lib/supabase';
import Breadcrumb from '../components/Breadcrumb';
import Loader from '../components/Loader';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareSuccess, setShareSuccess] = useState(false);

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
      // Try using the Web Share API first
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        setShareSuccess(true);
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        );
        setShareSuccess(true);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      // If both methods fail, provide a manual fallback
      const textArea = document.createElement('textarea');
      textArea.value = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setShareSuccess(true);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
        alert('Unable to share. Please manually copy the URL from your browser.');
      }
      document.body.removeChild(textArea);
    }

    // Reset share success state after 2 seconds
    setTimeout(() => setShareSuccess(false), 2000);
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
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-8">
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

            <div className="prose max-w-none text-gray-700">
              <div className="text-lg leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
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
                  {shareSuccess ? 'Shared!' : 'Share'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;