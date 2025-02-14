import { useState } from 'react';
import { Calendar, Clock, ChevronRight, Tag, Search, Home } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Physiotherapy: A Comprehensive Guide',
    excerpt: 'Learn about the fundamentals of physiotherapy and how it can help improve your quality of life.',
    content: 'Full content here...',
    image: 'https://img.freepik.com/premium-vector/character-flat-drawing-isometric-doctor-physiotherapist-helping-male-patient-using-leg-prosthesis-take-first-step-physical-therapy-people-with-disabilities-cartoon-design-vector-illustration_620206-4827.jpg?w=826',
    date: 'March 15, 2025',
    readTime: '5 min read',
    category: 'Education',
    tags: ['Physiotherapy', 'Healthcare', 'Wellness']
  },
  {
    id: '2',
    title: 'Common Sports Injuries and Their Treatment',
    excerpt: 'Discover the most frequent sports injuries and learn about effective treatment methods.',
    content: 'Full content here...',
    image: 'https://img.freepik.com/free-vector/foot-pain-concept-illustration_114360-21592.jpg?t=st=1739558320~exp=1739561920~hmac=54b45379898f70500e090f61c0d72f2a7b0bee35967940b52441e4d966dade77&w=740',
    date: 'March 10, 2025',
    readTime: '7 min read',
    category: 'Sports',
    tags: ['Sports Injury', 'Recovery', 'Treatment']
  },
  {
    id: '3',
    title: 'The Importance of Posture in Modern Life',
    excerpt: 'Explore how proper posture can prevent pain and improve overall health.',
    content: 'Full content here...',
    image: 'https://img.freepik.com/free-vector/online-personal-trainer-concept_52683-37579.jpg?t=st=1739558367~exp=1739561967~hmac=a311c7393fe1ac1e5e3f4715994f7be4f5ce3ebdba18f00c5cf9d6a917e6358c&w=740',
    date: 'March 5, 2025',
    readTime: '6 min read',
    category: 'Lifestyle',
    tags: ['Posture', 'Office Health', 'Ergonomics']
  }
];

const categories = ['All', 'Education', 'Sports', 'Lifestyle', 'Treatment', 'Research'];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-6">
        <nav className="flex text-gray-700 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <a href="/" className="inline-flex items-center text-emerald-800 hover:text-emerald-600">
                <Home className="w-4 h-4 mr-2" />
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-5 h-5 text-gray-500 mx-2" />
                <span className="text-emerald-900">Blog</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Applied Physio Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Insights, tips, and updates from our physiotherapy experts
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-emerald-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;