import { motion } from 'framer-motion';
import { Users, Heart, Shield, Sparkles, Home, CheckCircle } from 'lucide-react';

const chooseReasons = [
  {
    title: 'Certified Physiotherapists',
    desc: 'Highly qualified & experienced team.',
    icon: Users,
    color: 'text-green-600',
    bg: 'bg-green-50/50'
  },
  {
    title: 'Personalized Treatment Plans',
    desc: 'Custom plans tailored to your needs.',
    icon: Heart,
    color: 'text-green-600',
    bg: 'bg-green-50/50'
  },
  {
    title: 'Modern Equipment',
    desc: 'Advanced technology for faster recovery.',
    icon: Shield,
    color: 'text-green-600',
    bg: 'bg-green-50/50'
  },
  {
    title: 'Evidence-Based Treatment',
    desc: 'Latest techniques with proven results.',
    icon: Sparkles,
    color: 'text-green-600',
    bg: 'bg-green-50/50'
  },
  {
    title: 'Home Visit Services',
    desc: 'Professional care at your doorstep.',
    icon: Home,
    color: 'text-green-600',
    bg: 'bg-green-50/50'
  },
  {
    title: 'Easy Appointment & Follow-up',
    desc: 'Quick scheduling & continuous support.',
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50/50'
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-green-800 mb-3">
            Why Patients Choose Applied Physio & Wellness?
          </h2>
          <p className="text-sm font-bold text-gray-500 max-w-xl mx-auto">
            We combine expert rehabilitation with a compassionate approach to achieve long-lasting health results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chooseReasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white border border-gray-100 hover:border-green-500/30 p-6 rounded-2xl flex items-start space-x-4 shadow-xs hover:shadow-md transition-all duration-300 cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-gray-800 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 font-bold leading-normal">
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