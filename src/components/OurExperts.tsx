import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const experts = [
  {
    name: 'Dr. Rohit Kumar',
    qualifications: 'MPT (Orthopedics)',
    experience: '8+ Years Experience',
    image: '/images/doctor_rohit_kumar.png',
    specialties: [
      'Orthopedic Physiotherapy',
      'Sports Injury Rehabilitation',
      'Manual Therapy'
    ]
  },
  {
    name: 'Dr. Ananya Singh',
    qualifications: 'MPT (Neurology)',
    experience: '6+ Years Experience',
    image: '/images/doctor_ananya_singh.png',
    specialties: [
      'Neurological Rehabilitation',
      'Stroke Rehabilitation',
      'Balance & Gait Training'
    ]
  },
  {
    name: 'Dr. Saurav Das',
    qualifications: 'MPT (Sports)',
    experience: '7+ Years Experience',
    image: '/images/doctor_saurav_das.png',
    specialties: [
      'Sports Physiotherapy',
      'Dry Needling Specialist',
      'Performance Enhancement'
    ]
  }
];

const OurExperts = () => {
  return (
    <section className="py-16 bg-[#F9FAF9]">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-green-800 mb-3">Meet Our Physiotherapists</h2>
          <p className="text-sm font-bold text-gray-500 max-w-xl mx-auto">
            Our highly qualified and experienced professionals are dedicated to your recovery.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {experts.map((expert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="bg-white border border-gray-100 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group"
            >
              {/* Doctor Image on the Left */}
              <div className="sm:w-[42%] relative h-56 sm:h-auto min-h-[220px] bg-gray-50 flex-shrink-0">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover transform group-hover:scale-[1.02] transition duration-500"
                />
              </div>

              {/* Doctor Details on the Right */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 group-hover:text-green-700 transition-colors leading-tight">
                    {expert.name}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 mt-0.5">
                    {expert.qualifications}
                  </p>
                  
                  {/* Experience Badge */}
                  <div className="inline-flex items-center gap-1 bg-green-50 border border-green-100/50 px-2.5 py-0.5 rounded-md text-[9px] font-bold text-green-700 mt-2">
                    <span>{expert.experience}</span>
                    <span className="text-[7px] font-extrabold">➜</span>
                  </div>
                </div>

                <div className="border-t border-gray-50 pt-3 space-y-1.5 flex-grow">
                  {expert.specialties.map((spec) => (
                    <div key={spec} className="flex items-center text-[10px] font-bold text-gray-600 gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{spec}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 border border-gray-200 hover:border-green-600/40 rounded-lg text-xs font-bold transition-all">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[11px] text-gray-400 font-semibold tracking-wide">
          All our physiotherapists are registered and follow the highest standards of clinical practice.
        </p>
      </div>
    </section>
  );
};

export default OurExperts;
