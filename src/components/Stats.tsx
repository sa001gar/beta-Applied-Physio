import { motion } from 'framer-motion';

const stats = [
  { value: '50,000+', label: 'Physiotherapy Sessions Delivered' },
  { value: '15+', label: 'Years of Clinical Experience' },
  { value: '8,000+', label: 'Patients Successfully Treated' },
  { value: '95%', label: 'Patient Satisfaction Rate' }
];

const Stats = () => {
  return (
    <section 
      className="relative z-30 w-full bg-green-800 text-green-50 py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/landing/stats.png')" }}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
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
              <h3 className="text-3xl md:text-4xl font-semibold text-green-50 mb-1">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm text-green-400 font-semibold leading-snug max-w-[180px] mx-auto">
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
