import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 'back-pain-exercises',
    category: 'Back Pain',
    date: 'May 20, 2024',
    title: '7 Effective Exercises for Lower Back Pain Relief',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'frozen-shoulder-guide',
    category: 'Shoulder Pain',
    date: 'May 18, 2024',
    title: 'Frozen Shoulder Treatment Guide: Causes & Recovery',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'knee-replacement-rehab',
    category: 'Knee Pain',
    date: 'May 15, 2024',
    title: 'How Physiotherapy Helps After Knee Replacement',
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'sports-injury-timeline',
    category: 'Sports Injuries',
    date: 'May 12, 2024',
    title: 'Sports Injury Recovery Timeline: What to Expect',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'stroke-rehab-exercises',
    category: 'Neurology',
    date: 'May 10, 2024',
    title: 'Stroke Rehabilitation Exercises for Daily Life',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400'
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-green-800 mb-3">Health & Recovery Tips</h2>
            <p className="text-sm font-bold text-gray-500">Latest articles from our experts</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link
              to="/blog"
              className="inline-flex items-center border border-gray-200 bg-white hover:bg-gray-50/50 hover:border-green-600/40 px-5 py-2.5 rounded-full text-green-700 font-bold text-xs shadow-xs transition-colors"
            >
              <span>View All Blogs</span>
              <svg className="w-4 h-4 ml-2 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 5-column grid for blogs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="h-40 overflow-hidden relative bg-gray-50">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-green-50 border border-green-100 text-xs font-extrabold text-green-700 px-2 py-0.5 rounded-md leading-none uppercase">
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">
                      {blog.date}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-green-700 transition-colors leading-snug">
                    {blog.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  to={`/blog/${blog.id}`}
                  className="inline-flex items-center text-xs font-black text-green-700 hover:underline"
                >
                  <span>Read More</span>
                  <span className="ml-1 text-xs font-extrabold">➜</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
