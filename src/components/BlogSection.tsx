import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 'back-pain-exercises',
    category: 'Back Pain',
    date: 'May 20, 2024',
    title: '7 Effective Exercises for Lower Back Pain Relief',
    excerpt: 'Discover simple, evidence-based exercises to strengthen your core, improve flexibility, and alleviate lower back discomfort at home.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'frozen-shoulder-guide',
    category: 'Shoulder Pain',
    date: 'May 18, 2024',
    title: 'Frozen Shoulder Treatment Guide: Causes & Recovery',
    excerpt: 'Learn about the phases of adhesive capsulitis, effective manual therapy exercises, and clinical treatments to regain shoulder mobility.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'knee-replacement-rehab',
    category: 'Knee Pain',
    date: 'May 15, 2024',
    title: 'How Physiotherapy Helps After Knee Replacement',
    excerpt: 'Understand the postoperative rehabilitation timeline, key exercises, and how physiotherapy accelerates your transition back to daily activities.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'sports-injury-timeline',
    category: 'Sports Injuries',
    date: 'May 12, 2024',
    title: 'Sports Injury Recovery Timeline: What to Expect',
    excerpt: 'A complete phase-by-phase breakdown of sports rehabilitation, from acute swelling management to active performance training.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'stroke-rehab-exercises',
    category: 'Neurology',
    date: 'May 10, 2024',
    title: 'Stroke Rehabilitation Exercises for Daily Life',
    excerpt: 'Explore neuro-rehabilitation exercises designed to rebuild motor pathways, improve balance, and restore daily functional independence.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400'
  }
];

const BlogSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#042014] to-[#0b3c25] text-white relative overflow-hidden">

      {/* Background Accent Decor */}
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-emerald-500/[0.05] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-green-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-12 max-w-[1500px] relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
              Insights
            </span>

            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-none">
              Latest From Our Blog
            </h2>
            <p className="text-sm md:text-base font-medium text-emerald-100/70 max-w-xl leading-relaxed mt-4">
              Read up on the latest trends in physical therapy, clinical recovery methods, and active lifestyle advice.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              to="/blog"
              className="inline-flex items-center text-sm font-semibold text-white hover:text-emerald-300 pb-1 border-b-2 border-white/80 hover:border-emerald-300 transition-colors duration-300 gap-1.5"
            >
              <span>Read All Articles</span>
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 3-column grid for blogs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <Link to={`/blog/${blog.id}`} className="space-y-4">
                {/* Highly Rounded Image Card */}
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/2] bg-[#0b3c25]/30 shadow-xs relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-500 ease-out"
                  />
                </div>

                {/* Metadata details flat below image */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-emerald-300/60 block">
                    {blog.date}
                  </span>

                  <h3 className="font-semibold text-lg md:text-2xl text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-emerald-100/70 font-medium leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
