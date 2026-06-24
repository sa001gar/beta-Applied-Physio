import { motion } from 'framer-motion';

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
            <span>Why Choose Us</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-green-950 mb-4 leading-tight tracking-tight">
            Why Patients Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-emerald-800">Applied Physio</span>
          </h2>
          <p className="text-sm md:text-base font-medium text-gray-500 max-w-xl mx-auto leading-relaxed">
            We combine expert rehabilitation with a compassionate approach to achieve long-lasting health results.
          </p>
        </div>

        {/* Bento Grid Wrapper */}
        <div className="bg-[#042014] border border-emerald-900/40 text-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle grid background lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 items-stretch">

            {/* Column 1: Left */}
            <div className="flex flex-col gap-6 h-full justify-between">

              {/* Card A */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group flex-1 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.05] p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 cursor-default"
              >
                <div className="p-3 bg-white/[0.04] rounded-xl text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-8 h-8 text-lime-400">
                    <line x1="12" y1="4" x2="12" y2="20" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" />
                    <line x1="6.34" y1="17.66" x2="17.66" y2="6.34" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-lime-400 transition-colors">Expert Physiotherapists</h4>
                  <p className="text-sm text-emerald-100/70 font-medium leading-relaxed">Doctors of physical therapy with advanced clinical training and certifications.</p>
                </div>
              </motion.div>

              {/* Card B */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group flex-1 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.05] p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 cursor-default"
              >
                <div className="p-3 bg-white/[0.04] rounded-xl text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-8 h-8 text-lime-400">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-lime-400 transition-colors">Clinical Excellence</h4>
                  <p className="text-sm text-emerald-100/70 font-medium leading-relaxed">Evidence-based methods integrated with state-of-the-art diagnostic protocols.</p>
                </div>
              </motion.div>

              {/* Card C (split) */}
              <div className="flex-1 grid grid-cols-2 gap-6">
                {/* C1: 15+ Years */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="group bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.05] p-6 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-lime-400 tracking-tighter">15+</span>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-emerald-100/70 font-medium leading-tight">Years<br />of Care</span>
                  </div>
                </motion.div>

                {/* C2: Personalized Plans */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="group bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.05] p-5 rounded-2xl flex flex-col justify-center transition-all duration-300 cursor-default"
                >
                  <h4 className="text-sm md:text-md font-bold text-white mb-1 group-hover:text-lime-400 transition-colors">Tailored Plans</h4>
                  <p className="text-xs text-emerald-100/60 leading-normal">Custom routines mapped to your body and lifestyle goals.</p>
                </motion.div>
              </div>

            </div>

            {/* Column 2: Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden group min-h-[400px] lg:min-h-full border border-white/[0.06] hover:border-lime-400/40 transition-colors duration-300"
            >
              {/* Background Image */}
              <img
                src="/images/landing/features/applied_physio_bg.png"
                alt="Applied Physio Rehabilitation Session"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.35]"
              />
              {/* Branded Logo Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#042014] via-[#042014]/50 to-black/60 flex flex-col items-center justify-center p-6 z-10">
                {/* The Branding Logo Badge */}
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 flex items-center justify-center w-48 h-48 md:w-56 md:h-56 group-hover:scale-105 transition-transform duration-500 select-none">
                  <img
                    src="/images/layout/logo.png"
                    alt="Applied Physio Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Column 3: Right */}
            <div className="flex flex-col gap-6 h-full justify-between">

              {/* Card D (split) */}
              <div className="flex-1 grid grid-cols-2 gap-6">
                {/* D1: Home Visits */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="group bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.05] p-5 rounded-2xl flex flex-col justify-center transition-all duration-300 cursor-default"
                >
                  <div className="mb-2 text-lime-400 group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <h4 className="text-sm md:text-md font-bold text-white mb-1 group-hover:text-lime-400 transition-colors">Home Visits</h4>
                  <p className="text-xs text-emerald-100/60 leading-normal">Clinical treatment at your doorstep.</p>
                </motion.div>

                {/* D2: Advanced Modalities */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="group bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.05] p-5 rounded-2xl flex flex-col justify-center transition-all duration-300 cursor-default"
                >
                  <h4 className="text-sm md:text-md font-bold text-white mb-1 group-hover:text-lime-400 transition-colors">Laser Therapy</h4>
                  <p className="text-xs text-emerald-100/60 leading-normal">Advanced pain-relief and healing modalities.</p>
                </motion.div>
              </div>

              {/* Card E */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="group flex-1 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.05] p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 cursor-default"
              >
                <div className="p-3 bg-white/[0.04] rounded-xl text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-lime-400">
                    <path d="M9 5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    <path d="M9 19v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2" />
                    <rect x="7" y="5" width="10" height="14" rx="4" strokeWidth="2" />
                    <rect x="9" y="8" width="6" height="8" rx="2" strokeWidth="1" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-lime-400 transition-colors">Smart Rehab</h4>
                  <p className="text-sm text-emerald-100/70 font-medium leading-relaxed">Advanced progress tracking and biomechanic analysis for targeted recovery.</p>
                </div>
              </motion.div>

              {/* Card F (split) */}
              <div className="flex-1 grid grid-cols-2 gap-6">
                {/* F1: Manual Therapy */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="group bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.05] p-5 rounded-2xl flex flex-col justify-center transition-all duration-300 cursor-default"
                >
                  <h4 className="text-sm md:text-md font-bold text-white mb-1 group-hover:text-lime-400 transition-colors">Manual Therapy</h4>
                  <p className="text-xs text-emerald-100/60 leading-normal">Specialized hands-on joint and muscle recovery.</p>
                </motion.div>

                {/* F2: 10k+ Stories */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="group bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.05] p-6 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-lime-400 tracking-tighter">10k+</span>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-emerald-100/70 font-medium leading-tight">Happy<br />Patients</span>
                  </div>
                </motion.div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;