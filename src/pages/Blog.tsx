import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Tag, Search } from 'lucide-react';
import { fetchPublishedBlogsCached } from '../lib/supabase';
import type { Blog } from '../lib/supabase';
import Breadcrumb from '../components/Breadcrumb';
import Loader from '../components/Loader';

const categories = ['All', 'Education', 'Sports', 'Lifestyle', 'Treatment', 'Research'];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogs, setBlogs] = useState<Omit<Blog, 'content'>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchBlogs = async () => {
      try {
        const { data, error } = await fetchPublishedBlogsCached();

        if (!active) return;
        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      active = false;
    };
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="pt-20 min-h-screen bg-white">
      <Breadcrumb pageName="Blog" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-yellow-50 py-16 md:py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-green-800 mb-4 tracking-tight">
            Our Blog
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 font-normal">
            Insights, tips, and updates from our physiotherapy experts
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative mb-10">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all shadow-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader size="large" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No blog posts found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <Link to={`/blog/${blog.slug}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-52 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      {blog.category && (
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
                          {blog.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(blog.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {Math.ceil((blog.excerpt.length * 6) / 1000) || 2} min read
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{blog.excerpt}</p>
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs text-green-700 bg-green-50 font-medium"
                            >
                              <Tag className="w-2.5 h-2.5 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center text-green-600 text-sm font-medium group-hover:gap-2 transition-all">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-0.5" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;