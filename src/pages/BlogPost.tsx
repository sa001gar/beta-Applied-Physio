import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { blogPosts } from '../data';
import Breadcrumb from '../components/Breadcrumb';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <main className="pt-32 pb-16 min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Breadcrumb pageName={post.title} />
      
      <article className="container mx-auto px-4 max-w-4xl">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-8">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {post.date}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
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

            <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

            <div className="prose max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-6">{post.content}</p>
              <p className="text-lg leading-relaxed mb-6">
                Physiotherapy plays a crucial role in modern healthcare, offering evidence-based treatments that help patients recover from injuries, manage chronic conditions, and improve their overall quality of life. Through a combination of manual therapy, exercise prescription, and patient education, physiotherapists work to restore movement and function when someone is affected by injury, illness or disability.
              </p>
              <p className="text-lg leading-relaxed">
                The field continues to evolve with new research and technological advancements, providing increasingly effective treatment options for patients. Whether you're an athlete recovering from a sports injury, managing a chronic condition, or seeking to improve your general mobility, physiotherapy offers tailored solutions to meet your specific needs.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-600">{post.author.role}</p>
                  </div>
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
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