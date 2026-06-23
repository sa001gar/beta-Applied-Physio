import { motion } from 'framer-motion';

const chooseReasons = [
  {
    title: 'Certified Physiotherapists',
    desc: 'Highly qualified & experienced team.',
    image: '/images/landing/features/certified.png'
  },
  {
    title: 'Personalized Treatment Plans',
    desc: 'Custom plans tailored to your needs.',
    image: '/images/landing/features/personalized.png'
  },
  {
    title: 'Modern Equipment',
    desc: 'Advanced technology for faster recovery.',
    image: '/images/landing/features/equipment.png'
  },
  {
    title: 'Evidence-Based Treatment',
    desc: 'Latest techniques with proven results.',
    image: '/images/landing/features/evidence.png'
  },
  {
    title: 'Home Visit Services',
    desc: 'Professional care at your doorstep.',
    image: '/images/landing/features/home-visit.png'
  },
  {
    title: 'Easy Appointment & Follow-up',
    desc: 'Quick scheduling & continuous support.',
    image: '/images/landing/features/easy-booking.png'
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-green-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-10%] w-96 h-96 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase mb-5 border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
            <span>The Applied Physio Advantage</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold text-green-950 mb-4 leading-tight tracking-tight">
            Why Patients Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-emerald-800">Applied Physio</span>
          </h2>
          <p className="text-sm md:text-base font-medium text-gray-500 max-w-xl mx-auto leading-relaxed">
            We combine expert rehabilitation with a compassionate approach to achieve long-lasting health results.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chooseReasons.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-gradient-to-br from-white to-[#fbfdfc] border border-[#e2e9e5] hover:border-green-400/80 p-8 rounded-2xl flex items-start space-x-5 shadow-sm hover:shadow-[0_20px_40px_rgba(4,120,87,0.06)] hover:-translate-y-1.5 transition-all duration-300 cursor-default relative overflow-hidden"
              >
                {/* Large Decorative Number */}
                <div className="absolute top-4 right-4 text-5xl font-black text-green-950/[0.03] group-hover:text-green-950/[0.06] transition-colors pointer-events-none select-none tracking-tighter">
                  {`0${index + 1}`}
                </div>

                {/* Illustration Container */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100/70 border border-green-100/50 flex items-center justify-center flex-shrink-0 transition-all duration-300 p-1.5 group-hover:from-green-50 group-hover:to-emerald-100 shadow-xs relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 relative z-10"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-2 relative z-10">
                  <h4 className="text-lg font-bold text-green-950 group-hover:text-green-700 transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;