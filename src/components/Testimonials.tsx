import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';

const testimonials = [
  {
    text: "The treatment I received was exceptional. The therapists are highly skilled and caring. They helped me get back on track after a bad injury.",
    author: "Sujoy Das",
    role: "Sports Enthusiast",
    location: "Srinagar Pally"
  },
  {
    text: "Best physiotherapy experience. The personalized attention and modern techniques made a significant difference. Highly recommend for any posture issues!",
    author: "Neha Jaiswal",
    role: "Corporate Professional",
    location: "City Centre"
  },
  {
    text: "Professional, knowledgeable, and effective. The team is dedicated to your recovery and helped me return to my active lifestyle in no time.",
    author: "Mainak Majumder",
    role: "Athlete",
    location: "Bidhannagar"
  }
];

const locations = [
  'Benachity',
  'City Centre',
  'Bidhan Nagar',
  'Fuljhore',
  'A-Zone',
  'B-Zone',
  'Muchipara',
  'Jemua',
  'Andal',
  'Panagarh',
  'Raniganj',
  'Coke Oven'
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-green-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-10%] w-96 h-96 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      {/* Elegant Section Separator */}
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] mb-20">
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-[#042014]/10"></div>
          <span className="flex-shrink mx-4 text-[#042014]/25 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#042014]/20"></span>
            <Star className="w-3.5 h-3.5 fill-transparent text-[#042014]/25" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#042014]/20"></span>
          </span>
          <div className="flex-grow border-t border-[#042014]/10"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] relative z-10">
        
        {/* Main Wrapper - clean flow without borders */}
        <div className="py-2">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            
            {/* Left Column: What Our Patients Say */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div>
                <div className="inline-flex items-center space-x-1.5 border border-[#042014]/20 text-[#042014] px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
                  <Star className="w-3 h-3 fill-[#042014]" />
                  <span>Google Reviews</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-semibold text-[#042014] tracking-normal mb-2 instrument-font italic">
                  What Our Patients Say
                </h2>
                
                <p className="text-sm font-semibold text-gray-500 mb-8 leading-none">
                  Real recovery stories from verified Google reviews
                </p>
                
                <div className="space-y-4">
                  {testimonials.map((t, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-[#faf8f4] border-l-4 border-[#042014] p-6 rounded-r-2xl shadow-[0_8px_30px_rgba(4,32,20,0.015)] hover:shadow-md transition-all duration-300 cursor-default"
                    >
                      {/* Stars */}
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                        ))}
                      </div>

                      {/* Review text */}
                      <p className="text-sm text-gray-700 font-medium leading-relaxed mb-4">
                        "{t.text}"
                      </p>

                      {/* Reviewer Details */}
                      <div className="flex items-center space-x-3 border-t border-gray-100 pt-3">
                        <div className="w-9 h-9 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center text-sm font-black border border-[#042014]/10">
                          {t.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#042014] leading-tight">
                            {t.author}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                            {t.role} • {t.location}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://g.co/kgs/D8sP7W9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-[#042014] hover:text-green-700 transition-colors bg-white border border-[#042014]/15 shadow-sm py-2.5 px-4 rounded-xl hover:shadow-md hover:scale-101 duration-300 w-fit"
                >
                  <span>View More Reviews on Google Maps</span>
                  <svg className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Serving Patients Across Durgapur */}
            <div className="lg:col-span-6 bg-[#faf8f4] border border-[#042014]/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(4,32,20,0.015)] hover:border-[#042014]/25 transition-colors duration-300">
              
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#042014] tracking-tight leading-none">
                    Serving Patients Across Durgapur
                  </h2>
                  <p className="text-xs font-semibold text-gray-400 mt-2">
                    Our primary clinic and active home-care service circles
                  </p>
                </div>
                
                {/* Interactive Map Wrapper */}
                <div className="rounded-2xl overflow-hidden border border-[#042014]/15 shadow-inner h-72 md:h-80 relative mb-6">
                  <iframe
                    src="https://maps.google.com/maps?q=The%20Applied%20Physio%2C%20Benachity%2C%20Durgapur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 rounded-2xl"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="The Applied Physio Location Map"
                  ></iframe>
                </div>

                {/* Locations Pills Container */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-black text-gray-400 mb-3.5">
                    Service Areas & Neighborhoods
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((loc) => (
                      <div
                        key={loc}
                        className="flex items-center space-x-1.5 bg-[#042014]/5 border border-transparent hover:border-[#adff2f]/40 hover:bg-[#adff2f]/10 hover:text-green-800 text-[#042014] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-default"
                      >
                        <MapPin className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                        <span>{loc}</span>
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