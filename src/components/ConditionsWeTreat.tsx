import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

const conditions = [
  { name: 'Back Pain', image: '/images/landing/conditions/back-pain.png' },
  { name: 'Lower Back Pain', image: '/images/landing/conditions/lower-back-pain.png' },
  { name: 'Sciatica', image: '/images/landing/conditions/sciatica.png' },
  { name: 'Cervical Pain', image: '/images/landing/conditions/cervical-pain.png' },
  { name: 'Frozen Shoulder', image: '/images/landing/conditions/frozen-shoulder.png' },
  { name: 'Knee Pain', image: '/images/landing/conditions/knee-pain.png' },
  { name: 'Arthritis', image: '/images/landing/conditions/arthritis.png' },
  { name: 'Sports Injuries', image: '/images/landing/conditions/sports-injuries.png' },
  { name: 'Tennis Elbow', image: '/images/landing/conditions/tennis-elbow.png' },
  { name: 'Stroke Rehab', image: '/images/landing/conditions/stroke-rehab.png' },
  { name: 'Parkinson\'s', image: '/images/landing/conditions/parkinsons.svg' },
  { name: 'Post Surgical', image: '/images/landing/conditions/post-surgical.svg' }
];

const ConditionsWeTreat = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f0fdf4]/50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Illustration and Heading */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Premium Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase mb-5 border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                <span>Our Clinical Focus</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-semibold text-green-950 mb-6 leading-tight tracking-tight">
                Conditions We Treat
              </h2>

              <p className="text-sm md:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                We provide highly effective, evidence-based physiotherapy for a wide spectrum of physical conditions, helping you restore mobility, relieve pain, and get back to your active life faster.
              </p>

              {/* Illustration Image (SVG) */}
              <div className="relative w-full max-w-md mx-auto lg:mx-0 hidden md:block">
                <div className="absolute inset-0 bg-green-100 rounded-full blur-3xl opacity-30"></div>
                <img
                  src="/images/landing/conditions_illustration.png"
                  alt="Physiotherapy Healing"
                  className="relative z-10 w-full h-auto object-contain transform hover:scale-102 transition-transform duration-500 "
                />
              </div>

            </motion.div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {conditions.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-green-100 border border-gray-100 hover:border-green-400 p-3 sm:p-5 md:p-6 rounded-2xl flex flex-row items-center gap-2.5 sm:gap-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:shadow-green-950/10 hover:-translate-y-1.5 transition-all duration-300 cursor-default"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center p-1 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="font-extrabold text-gray-900 text-xs sm:text-base md:text-lg leading-snug group-hover:text-green-700 transition-colors">
                      {item.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ConditionsWeTreat;
