import { motion } from 'framer-motion';
import { Linkedin, Instagram, Facebook, Youtube, Award } from 'lucide-react';
import { teamMembers } from '../data';

const getExperienceBadge = (description: string) => {
  const match = description.match(/(\d+\+?\s*years?)/i);
  return match ? `${match[1]} Exp.` : null;
};

const OurExperts = () => {
  return (
    <section className="py-24 bg-[#fbfdfc] relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-[-10%] w-96 h-96 bg-green-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-96 h-96 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase mb-5 border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
            <span>Our Clinical Team</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold text-green-950 mb-4 leading-tight tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-emerald-800">Physiotherapists</span>
          </h2>
          <p className="text-sm md:text-base font-medium text-gray-500 max-w-xl mx-auto leading-relaxed">
            Our highly qualified and experienced professionals are dedicated to your recovery and well-being.
          </p>
        </div>

        {/* Expert Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {teamMembers.map((member, index) => {
            const expBadge = getExperienceBadge(member.description);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group bg-white border border-[#e2e9e5] rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_50px_rgba(4,47,29,0.08)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Accent Blob */}
                <div className="absolute top-[-20%] left-[-20%] w-40 h-40 bg-green-500/[0.01] rounded-full blur-3xl pointer-events-none group-hover:bg-green-500/[0.03] transition-colors"></div>

                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Portrait Avatar with Dashed Orbit */}
                  <div className="relative w-40 h-40 rounded-full p-1.5 border-2 border-dashed border-green-200 group-hover:border-green-500 transition-colors duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 border border-gray-100 relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Floating Exp Badge */}
                    {expBadge && (
                      <span className="absolute bottom-1 right-1 bg-green-600 text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full shadow-md border border-green-500/20 flex items-center gap-1">
                        <Award className="w-2.5 h-2.5 flex-shrink-0" />
                        <span>{expBadge}</span>
                      </span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1 w-full">
                    <h3 className="text-xl font-bold text-green-950 group-hover:text-green-700 transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-green-600 uppercase tracking-widest">
                      {member.role}
                    </p>
                    
                    {/* Dynamic Divider */}
                    <div className="w-12 h-0.5 bg-green-200 mx-auto my-3 rounded-full group-hover:w-20 transition-all duration-300"></div>

                    <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-[260px] mx-auto">
                      {member.description}
                    </p>
                  </div>
                </div>

                {/* Social Profile Links */}
                <div className="flex items-center justify-center space-x-2.5 pt-6 mt-6 border-t border-green-50/50">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 stroke-[2]" />
                    </a>
                  )}
                  {member.social.facebook && (
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                      title="Facebook"
                    >
                      <Facebook className="w-4 h-4 stroke-[2]" />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4 stroke-[2]" />
                    </a>
                  )}
                  {member.social.youtube && (
                    <a
                      href={member.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                      title="YouTube"
                    >
                      <Youtube className="w-4 h-4 stroke-[2]" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-400 font-semibold tracking-wide mt-12">
          All our physiotherapists are registered and follow the highest standards of clinical practice.
        </p>
      </div>
    </section>
  );
};

export default OurExperts;
