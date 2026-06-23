import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';

const testimonials = [
  {
    text: "I suffered from severe back pain for months. After treatment here, I feel 90% better and can do my daily activities easily.",
    author: "Subhankar Pal",
    location: "Durgapur"
  },
  {
    text: "Excellent care and professional therapists. My knee pain has reduced significantly. Highly recommended!",
    author: "Priti Sharma",
    location: "Benachity"
  },
  {
    text: "Home physiotherapy service is very helpful. The therapists are very supportive and experienced.",
    author: "Anindam Ghosh",
    location: "City Centre"
  }
];

const locationsColumn1 = [
  'Benachity',
  'City Centre',
  'Bidhan Nagar',
  'Fuljhore',
  'A-Zone',
  'B-Zone'
];

const locationsColumn2 = [
  'Muchipara',
  'Jemua',
  'Andal',
  'Panagarh',
  'Raniganj',
  'Coke Oven'
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-[#F9FAF9]">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: What Our Patients Say */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-3xl font-black text-green-800 mb-2">What Our Patients Say</h2>
              <p className="text-sm font-bold text-gray-500 mb-6">Real stories from real people</p>
              
              <div className="space-y-4">
                {testimonials.map((t, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs"
                  >
                    {/* Stars */}
                    <div className="flex text-yellow-400 mb-2.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-xs md:text-sm text-gray-600 font-bold leading-relaxed mb-3">
                      "{t.text}"
                    </p>

                    {/* Reviewer Details */}
                    <div className="flex items-center space-x-3 border-t border-gray-50 pt-2.5">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-700 text-xs font-black">
                        {t.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-gray-900 leading-tight">
                          {t.author}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-bold">
                          {t.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-green-700 hover:underline"
              >
                <span>View More Reviews on Google</span>
                <svg className="w-3 h-3 ml-1 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Serving Patients Across Durgapur */}
          <div className="lg:col-span-6 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <h2 className="text-2xl font-black text-green-800 mb-6">Serving Patients Across Durgapur</h2>
              
              <div className="grid md:grid-cols-12 gap-6 items-center">
                {/* Map illustration */}
                <div className="md:col-span-7 rounded-2xl overflow-hidden border border-gray-100 shadow-inner h-60">
                  <img
                    src="/images/durgapur_map.png"
                    alt="Map of Durgapur Service Areas"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Locations list in 2 columns */}
                <div className="md:col-span-5 grid grid-cols-2 gap-x-4 gap-y-3">
                  <div className="space-y-3">
                    {locationsColumn1.map((loc) => (
                      <div key={loc} className="flex items-center space-x-2 text-xs text-gray-700 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span className="truncate leading-none">{loc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {locationsColumn2.map((loc) => (
                      <div key={loc} className="flex items-center space-x-2 text-xs text-gray-700 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span className="truncate leading-none">{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;