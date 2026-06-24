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
    <main className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#042014] to-[#0b3c25] text-white pt-32 pb-36 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-[-10%] w-96 h-96 bg-emerald-500/[0.05] rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-green-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <div className="flex justify-center w-full">
            <Breadcrumb theme="dark" pageName="Blog" />
          </div>
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 text-emerald-100 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-md border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Daily Updates</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold instrument-font italic tracking-wide text-white">
              Our Exciting <span className="text-emerald-400">Blog</span>
            </h1>

            <p className="text-lg md:text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed pt-2 mb-10 font-medium">
              Discover expert insights, the latest clinical research, and practical wellness tips directly from our specialized physiotherapy team.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-20" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative z-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 relative z-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-emerald-500 text-[#042014] shadow-lg shadow-emerald-500/20'
                    : 'bg-white/5 text-emerald-50 border border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Elegant Bottom Curve Divider */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path className="fill-white" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,149.3C672,160,768,224,864,240C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
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
                        className="w-full aspect-[3/2] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                      {blog.category && (
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-[#042014] shadow-sm">
                          {blog.category}
                        </span>
                      )}
                    </div>
                    <div className="p-7">
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
                      <h2 className="text-xl font-bold text-[#042014] mb-3 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-base text-gray-500 mb-5 leading-relaxed line-clamp-3">{blog.excerpt}</p>
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