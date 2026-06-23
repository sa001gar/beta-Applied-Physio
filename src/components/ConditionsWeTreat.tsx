import { motion } from 'framer-motion';
import { Activity, Brain, Dumbbell, RefreshCw, ShieldAlert, Sparkles, Flame, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const conditions = [
  { name: 'Back Pain', icon: Flame },
  { name: 'Lower Back Pain', icon: ShieldAlert },
  { name: 'Sciatica', icon: Zap },
  { name: 'Cervical Pain', icon: Sparkles },
  { name: 'Frozen Shoulder', icon: Dumbbell },
  { name: 'Knee Pain', icon: Activity },
  { name: 'Arthritis', icon: Activity },
  { name: 'Sports Injuries', icon: Dumbbell },
  { name: 'Tennis Elbow', icon: Activity },
  { name: 'Stroke Rehabilitation', icon: Brain },
  { name: 'Parkinson\'s Rehab', icon: Brain },
  { name: 'Post Surgical Recovery', icon: RefreshCw }
];

const ConditionsWeTreat = () => {
  return (
    <section className="py-16 bg-[#F9FAF9]">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-green-800 mb-3">Conditions We Treat</h2>
          <p className="text-sm font-bold text-gray-500 max-w-xl mx-auto">
            Providing effective physiotherapy for a wide range of conditions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {conditions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white border border-gray-100/80 hover:border-green-500/30 p-4 rounded-xl flex items-center space-x-3 shadow-xs hover:shadow-md transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-800 text-xs md:text-sm leading-tight">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center border border-gray-200 bg-white hover:bg-gray-50/50 hover:border-green-600/40 px-6 py-2.5 rounded-full text-green-700 font-bold text-sm shadow-xs transition-colors"
          >
            <span>View All Conditions</span>
            <svg className="w-4 h-4 ml-2 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConditionsWeTreat;
