import { Facebook, Instagram, Youtube, Twitter, Share2, ExternalLink, Heart, MessageCircle, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { socialPosts, socialLinks } from '../data';

const Social = () => {
  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Join Our Community
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-12"
          >
            Stay connected with us and join our growing community of health enthusiasts
          </motion.p>

          {/* Social Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.platform}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} text-white p-6 rounded-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-8 h-8" />
                <span className="font-medium">{social.platform}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Social Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Followers', value: '10K+' },
              { label: 'Posts', value: '500+' },
              { label: 'Engagement', value: '95%' },
              { label: 'Reviews', value: '4.9/5' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-4xl font-bold text-purple-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Updates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={`${post.platform} post`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: post.platform === 'Instagram' ? '#E1306C' :
                                    post.platform === 'Facebook' ? '#1877F2' :
                                    '#FF0000',
                      color: 'white'
                    }}
                  >
                    {post.platform}
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        className="hover:text-gray-700 transition-colors"
                        aria-label="Share post"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-700 transition-colors"
                        aria-label="View original post"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Never Miss an Update</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for exclusive content, tips, and special offers
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Social;