import { motion } from 'framer-motion';

const stats = [
  { value: '50,000+', label: 'Physiotherapy Sessions Delivered' },
  { value: '15+', label: 'Years of Clinical Experience' },
  { value: '8,000+', label: 'Patients Successfully Treated' },
  { value: '95%', label: 'Patient Satisfaction Rate' }
];

const Stats = () => {
  return (
    <section className="relative z-30 px-4 lg:px-8">
      <div className="max-w-[1500px] mx-auto bg-white border border-gray-100/80 rounded-2xl shadow-xl p-8 md:p-10 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center flex flex-col justify-center items-center px-2"
            >
              <h3 className="text-3xl md:text-4xl font-black text-green-700 mb-1">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 font-bold leading-snug max-w-[180px] mx-auto">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
