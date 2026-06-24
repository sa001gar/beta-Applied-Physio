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
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf8f4] to-[#f4fbf7] relative overflow-hidden">

      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-green-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-10%] w-96 h-96 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      {/* Elegant Section Separator */}
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] mb-12 md:mb-20">
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

                <h2 className="text-3xl md:text-5xl font-semibold text-[#042014] tracking-normal mb-2">
                  What Our Patients Say
                </h2>

                <p className="text-sm font-medium text-gray-500 mb-8 leading-none">
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
                      className="bg-white border border-[#042014]/10 border-l-4 border-l-[#042014] p-4 sm:p-6 rounded-r-2xl shadow-[0_8px_30px_rgba(4,32,20,0.015)] hover:shadow-[0_15px_40px_rgba(4,32,20,0.04)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                    >
                      {/* Stars */}
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Review text */}
                      <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4 italic">
                        "{t.text}"
                      </p>

                      {/* Reviewer Details */}
                      <div className="flex items-center space-x-3 border-t border-gray-100 pt-3">
                        <div className="w-10 h-10 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center text-sm font-bold border border-[#042014]/10">
                          {t.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#042014] leading-tight">
                            {t.author}
                          </h4>
                          <p className="text-xs text-gray-400 font-medium mt-1">
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
                  className="inline-flex items-center text-xs font-bold text-white hover:text-white transition-all duration-300 bg-[#042014] hover:bg-emerald-950 shadow-md py-3 px-5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 w-fit"
                >
                  <span>View More Reviews on Google Maps</span>
                  <svg className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Serving Patients Across Durgapur */}
            <div className="lg:col-span-6 bg-white border border-[#042014]/10 rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(4,32,20,0.02)] hover:border-[#042014]/25 transition-all duration-300">

              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#042014] tracking-tight leading-none">
                    Serving Patients Across Durgapur
                  </h2>
                  <p className="text-xs font-medium text-gray-500 mt-2">
                    Our primary clinic and active home-care service circles
                  </p>
                </div>

                {/* Interactive Map Wrapper */}
                <div className="rounded-2xl overflow-hidden border border-[#042014]/15 shadow-inner h-64 sm:h-80 md:h-[340px] relative mb-6">
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
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {locations.map((loc) => (
                      <div
                        key={loc}
                        className="flex items-center space-x-1 bg-[#042014]/5 border border-transparent hover:border-[#adff2f]/40 hover:bg-[#adff2f]/10 hover:text-green-800 text-[#042014] px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-default"
                      >
                        <MapPin className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                        <span>{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Home Visit Callout Banner */}
              <div className="mt-8 p-4 sm:p-5 bg-gradient-to-r from-emerald-50/50 to-green-50/30 border border-emerald-100/50 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-2xs">
                <div>
                  <h4 className="text-lg font-bold text-[#042014] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                    Need home physiotherapy care?
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 leading-normal">
                    We provide direct home visits in all active service circles in Durgapur.
                  </p>
                </div>

                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#042014] hover:bg-emerald-950 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-md transition-all duration-300 w-fit shrink-0 whitespace-nowrap"
                >
                  Book Home Visit
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;