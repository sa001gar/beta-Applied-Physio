import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Detailed Assessment',
    desc: 'A comprehensive initial evaluation by our certified doctors of physical therapy to understand your condition, pain triggers, and medical history.',
    illustration: (
      <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-20 h-14 text-lime-400 group-hover:scale-105 transition-transform duration-300">
        {/* Clipboard */}
        <rect x="35" y="6" width="30" height="46" rx="3" stroke="#adff2f" strokeWidth="2" />
        <path d="M47 6h6v4h-6z" fill="#adff2f" />
        {/* Checklist lines */}
        <line x1="45" y1="18" x2="57" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="45" y1="28" x2="57" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="45" y1="38" x2="57" y2="38" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        {/* Checkmarks */}
        <path d="M40 18l1.5 1.5 3-3" stroke="#adff2f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 28l1.5 1.5 3-3" stroke="#adff2f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 38l1.5 1.5 3-3" stroke="#adff2f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    number: 2,
    title: 'Precise Diagnosis',
    desc: 'Identifying the root cause of your pain or mobility restriction using biomechanical scans and advanced functional diagnostic testing.',
    illustration: (
      <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-20 h-14 text-lime-400 group-hover:scale-105 transition-transform duration-300">
        {/* Vertebrae / Spine Line Art */}
        <path d="M50 8v44" stroke="white" strokeWidth="2" strokeDasharray="3 3" />
        {/* Bone segment shapes */}
        <rect x="44" y="12" width="12" height="6" rx="2" stroke="#adff2f" strokeWidth="1.5" />
        <rect x="42" y="22" width="16" height="7" rx="2" stroke="#adff2f" strokeWidth="1.5" />
        <rect x="44" y="33" width="12" height="6" rx="2" stroke="#adff2f" strokeWidth="1.5" />
        {/* Magnifying Glass focusing on middle segment */}
        <circle cx="58" cy="25" r="9" stroke="white" strokeWidth="2" fill="#042014" fillOpacity="0.5" />
        <line x1="65" y1="31" x2="73" y2="39" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    number: 3,
    title: 'Targeted Treatment',
    desc: 'A customized recovery plan incorporating hands-on manual therapy, dry needling, and modern therapeutic modalities for pain relief.',
    illustration: (
      <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-20 h-14 text-lime-400 group-hover:scale-105 transition-transform duration-300">
        {/* Two hands holding a glowing joint/wave */}
        <path d="M25 45c5-3 15-3 20 2M75 45c-5-3-15-3-20 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        {/* Wave/Electrotherapy lines */}
        <path d="M35 25c8-6 12 6 20 0s12-6 20 0" stroke="#adff2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 31c10-6 14 6 20 0s14-6 20 0" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        {/* Pulse Sparkle */}
        <path d="M50 12l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#adff2f" />
      </svg>
    )
  },
  {
    number: 4,
    title: 'Sustained Recovery',
    desc: 'Rebuilding strength and functional capacity through guided exercise progression, posture correction, and continuous wellness support.',
    illustration: (
      <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-20 h-14 text-lime-400 group-hover:scale-105 transition-transform duration-300">
        {/* Silhouette active person jumping/celebrating */}
        <path d="M50 22v14M50 36l-8 12M50 36l8 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 18c6 4 12 4 12 4s6 0 12-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="15" r="4" fill="#adff2f" stroke="#adff2f" strokeWidth="1.5" />
        {/* Heart shape */}
        <path d="M72 15c-3-3-7 0-7 4 0 4 7 8 7 8s7-4 7-8c0-4-4-7-7-4z" fill="#adff2f" stroke="#adff2f" strokeWidth="1" />
        {/* Ground lines */}
        <path d="M20 48h60" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M30 52h40" stroke="#adff2f" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
];

const RecoveryJourney = () => {
  return (
    <section className="py-24 bg-amber-100 relative overflow-hidden">

      {/* Subtle organic light accent blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-100/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] relative z-10">

        {/* Outer Container - clean flow without borders */}
        <div className="py-2">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Sticky Section Header */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">

              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-[#042014]/5 text-[#042014] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  <span>Our Recovery Pathway</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#042014] tracking-normal leading-[1.1] instrument-font italic">
                  How we guide <br className="hidden lg:inline" />
                  your recovery?
                </h2>

                <p className="text-gray-600 text-base md:text-lg max-w-md leading-relaxed">
                  Our clinical method seamlessly combines advanced assessment, precise diagnosis, and modern therapy to restore your strength, mobility, and long-term health.
                </p>
              </div>

              {/* The Generated Illustration (Blended & Scaled) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-full max-w-[420px] mx-auto lg:mx-0 group/thumb"
              >
                <img
                  src="/images/landing/features/recovery_journey_left.png"
                  alt="Recovery Journey Illustration"
                  className="w-full h-auto object-contain group-hover/thumb:scale-103 transition-transform duration-500"
                />
              </motion.div>

              <div className="pt-4 hidden lg:block">
                <div className="w-16 h-[2px] bg-[#042014]/20"></div>
                <p className="text-md uppercase tracking-widest font-bold text-black mt-4">
                  The Applied Physio
                </p>
                <p className="text-sm text-[#042014] mt-2">
                  Best Physio Therapy in Durgapur
                </p>
              </div>

            </div>

            {/* Right Column: Timeline Cards List */}
            <div className="lg:col-span-7 relative pl-8 md:pl-16">

              {/* Vertical Timeline line */}
              <div className="absolute top-6 bottom-6 left-[19px] md:left-[31px] w-[2px] bg-[#042014]/15 pointer-events-none"></div>

              <div className="space-y-8">
                {steps.map((step, index) => {
                  return (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative flex flex-col items-start"
                    >
                      {/* Timeline circle node */}
                      <span className="absolute -left-[27px] md:-left-[43px] top-6 w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-[#042014] bg-[#faf8f4] z-10 transition-colors duration-300 group-hover:bg-[#adff2f]"></span>

                      {/* Card Content */}
                      <div className="w-full bg-[#042014] hover:bg-[#062c1d] border border-emerald-950/80 rounded-3xl p-6 md:p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 select-default">

                        {/* Illustration Container */}
                        <div className="mb-4">
                          {step.illustration}
                        </div>

                        {/* Text */}
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#adff2f] transition-colors duration-300">
                          {step.title}
                        </h4>

                        <p className="text-sm text-emerald-100/70 font-medium leading-relaxed">
                          {step.desc}
                        </p>

                      </div>

                    </motion.div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RecoveryJourney;
