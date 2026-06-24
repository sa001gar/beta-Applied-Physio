import { Heart, Award, Users, Star, CheckCircle, Target, Shield, Clock, HandHeart } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import OurExperts from '../components/OurExperts';
import { motion } from 'framer-motion';

const stats = [
  { value: "7000+", label: "Patients Treated", icon: Users },
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "98%", label: "Success Rate", icon: Star },
  { value: "24/7", label: "Care & Support", icon: Heart }
];

const values = [
  {
    icon: HandHeart,
    title: "Patient-Centered Care",
    description: "Your healing journey is unique. We prioritize your specific needs, crafting tailored, evidence-based treatment plans designed to restore your optimal movement."
  },
  {
    icon: Shield,
    title: "Clinical Excellence",
    description: "We are committed to the highest medical standards, constantly updating our techniques with the latest research in physiotherapy and biomechanics."
  },
  {
    icon: Target,
    title: "Root Cause Resolution",
    description: "We don't just treat symptoms. Our comprehensive diagnostic approach identifies and resolves the underlying causes of pain to prevent recurrence."
  },
  {
    icon: Clock,
    title: "Dedicated Time",
    description: "Quality care cannot be rushed. We guarantee extensive 1-on-1 sessions, ensuring every question is answered and every treatment is precise."
  }
];

const About = () => {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#042014] to-[#0b3c25] text-white pt-32 pb-36 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-[-10%] w-96 h-96 bg-emerald-500/[0.05] rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-green-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <div className="flex justify-center w-full">
            <Breadcrumb theme="dark" pageName="About Us" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 text-emerald-100 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Our Story</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold instrument-font italic tracking-wide text-white">
              Transforming Lives Through <span className="text-emerald-400">Expert Care</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed pt-2">
              At Applied Physio, we're dedicated to helping you achieve optimal physical health through expert clinical care, modern rehabilitation techniques, and genuine compassion.
            </p>
          </motion.div>
        </div>

        {/* Elegant Bottom Curve Divider */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path className="fill-white" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,149.3C672,160,768,224,864,240C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Floating Section */}
      <section className="relative z-20 -mt-16 md:-mt-24 pb-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(4,32,20,0.06)] border border-emerald-50 p-6 text-center transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-[#042014] mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision Split */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-50 to-yellow-50 rounded-3xl transform -rotate-3 z-0"></div>
              <img
                src="https://img.freepik.com/premium-photo/chiropractor-assisting-senior-patient_482257-77377.jpg?w=826"
                alt="Physiotherapy treatment"
                className="relative z-10 w-full h-[280px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl border border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-emerald-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Certified</p>
                    <p className="font-bold text-[#042014] text-lg">Specialists</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold instrument-font italic text-[#042014] mb-5">
                  Our Mission & Vision
                </h2>
                <div className="w-16 h-1 bg-emerald-500 rounded-full mb-6"></div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We founded Applied Physio with a simple but powerful mission: to bridge the gap between temporary pain relief and long-term functional recovery.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#042014] mb-2">Our Mission</h4>
                    <p className="text-gray-600 leading-relaxed">To provide evidence-based, compassionate physiotherapy that empowers patients to overcome physical limitations and confidently return to the activities they love.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-yellow-50 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#042014] mb-2">Our Vision</h4>
                    <p className="text-gray-600 leading-relaxed">To be the region's leading standard in physical rehabilitation, recognized for unparalleled clinical outcomes and an unwavering commitment to patient well-being.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-[#fafaf7] to-[#f4f7f5] relative overflow-hidden">
        <div className="absolute top-1/4 right-[-10%] w-96 h-96 bg-yellow-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-[1400px] relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4 border border-emerald-100">
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold instrument-font italic text-[#042014] mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              These defining principles guide every assessment, treatment, and interaction at Applied Physio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-emerald-950/[0.06] hover:border-emerald-600 p-8 rounded-2xl flex flex-col shadow-[0_10px_35px_rgba(4,32,20,0.02)] hover:shadow-[0_20px_50px_rgba(4,32,20,0.06)] hover:-translate-y-1.5 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-emerald-100 group-hover:scale-110">
                  <value.icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-[#042014] mb-3 group-hover:text-emerald-700 transition-colors">{value.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm flex-grow">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <OurExperts />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 text-center px-4 border-t border-emerald-100/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold instrument-font italic text-[#042014] mb-6">
            Ready to start your recovery?
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Join thousands of patients who have trusted us with their rehabilitation journey.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#042014] hover:bg-emerald-950 text-white font-bold px-10 py-4 rounded-xl shadow-[0_8px_20px_rgba(4,32,20,0.12)] hover:shadow-[0_12px_25px_rgba(4,32,20,0.2)] transition-all duration-300 transform hover:-translate-y-1"
          >
            Book Your Consultation
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;