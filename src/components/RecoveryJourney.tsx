import { motion } from 'framer-motion';
import { Phone, Stethoscope, FileText, Heart, ChevronRight } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Assessment',
    desc: 'Detailed evaluation of your condition',
    icon: Phone
  },
  {
    number: 2,
    title: 'Diagnosis',
    desc: 'Root cause identification',
    icon: Stethoscope
  },
  {
    number: 3,
    title: 'Personalized Treatment',
    desc: 'Custom plan designed for your recovery',
    icon: FileText
  },
  {
    number: 4,
    title: 'Recovery',
    desc: 'Pain relief, improved mobility & long-term well-being',
    icon: Heart
  }
];

const RecoveryJourney = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-green-800 mb-3">Your Recovery Journey</h2>
          <p className="text-sm font-bold text-gray-500 max-w-xl mx-auto">
            Providing effective physiotherapy for a wide range of conditions
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 space-y-8 md:space-y-0 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex flex-1 items-center w-full">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-row items-center bg-[#F9FAF9] border border-gray-100 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 w-full"
                >
                  {/* Step icon */}
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0 mr-4">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Step number and text details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] font-black leading-none">
                        {step.number}
                      </span>
                      <h4 className="font-extrabold text-sm md:text-base text-gray-800 leading-none">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-[11px] md:text-xs text-gray-500 font-bold leading-normal">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-gray-300 mx-3 flex-shrink-0">
                    <ChevronRight className="w-6 h-6 stroke-[2]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecoveryJourney;
