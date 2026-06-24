// import { motion } from 'framer-motion';
import { Linkedin, Instagram, Facebook, Youtube, Award } from 'lucide-react';
import { teamMembers } from '../data';

const getExperienceBadge = (description: string) => {
  const match = description.match(/(\d+\+?\s*years?)/i);
  return match ? `${match[1]} Exp.` : null;
};

const OurExperts = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#f0fdf4] via-[#fefce8]/60 to-[#f0fdf4] relative overflow-hidden">

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

          <h2 className="text-3xl md:text-5xl font-semibold text-[#042014] mb-4 leading-none">
            Meet Our Physiotherapists
          </h2>
          <p className="text-sm md:text-base font-semibold text-gray-500 max-w-xl mx-auto leading-relaxed mt-2">
            Our highly qualified and experienced professionals are dedicated to your recovery and well-being.
          </p>
        </div>

        {/* Experts Grid / Horizontal Scroll for Mobile */}
        <div className="w-full py-4">
          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-8 md:pb-0 scrollbar-none justify-start md:justify-center">
            {teamMembers.map((member, index) => {
              const expBadge = getExperienceBadge(member.description);

              return (
                <div
                  key={index}
                  className="flex flex-col items-center group w-[320px] md:w-full shrink-0 snap-center"
                >
                  {/* Standard Rounded Portrait Card */}
                  <div className="relative rounded-[2.25rem] overflow-hidden aspect-[11/14] w-full border border-[#042014]/10 bg-white shadow-[0_15px_35px_rgba(4,32,20,0.02)] group-hover:scale-102 transition-all duration-500 group-hover:border-[#042014]/20 group-hover:shadow-[0_20px_45px_rgba(4,32,20,0.04)]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top filter brightness-[0.96]"
                    />

                    {/* Floating Exp Badge */}
                    {expBadge && (
                      <span className="absolute bottom-4 right-4 bg-[#042014] text-white text-sm uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                        <Award className="w-5 h-5 flex-shrink-0 text-lime-400" />
                        <span>{expBadge}</span>
                      </span>
                    )}
                  </div>

                  {/* Text Details Under Card */}
                  <div className="text-center mt-6 space-y-2.5 w-full px-2">
                    <div className="min-h-[48px] flex items-center justify-center">
                      <h3 className="text-lg md:text-2xl font-bold text-[#042014] leading-tight">
                        {member.name}
                      </h3>
                    </div>

                    <div className="min-h-[32px] flex items-center justify-center">
                      <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest leading-normal">
                        {member.role}
                      </p>
                    </div>

                    <div className="w-8 h-0.5 bg-[#042014]/10 mx-auto rounded-full group-hover:w-16 transition-all duration-300"></div>

                    <div className="min-h-[84px] flex items-center justify-center px-1">
                      <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[240px]">
                        {member.description}
                      </p>
                    </div>

                    {/* Social Profile Links */}
                    <div className="flex items-center justify-center space-x-2 pt-1">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center hover:bg-[#042014] hover:text-white transition-all duration-300"
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
                          className="w-8 h-8 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center hover:bg-[#042014] hover:text-white transition-all duration-300"
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
                          className="w-8 h-8 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center hover:bg-[#042014] hover:text-white transition-all duration-300"
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
                          className="w-8 h-8 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center hover:bg-[#042014] hover:text-white transition-all duration-300"
                          title="YouTube"
                        >
                          <Youtube className="w-4 h-4 stroke-[2]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        <p className="text-center text-sm text-gray-400 font-semibold tracking-wider uppercase mt-12 border-t border-[#042014]/5 pt-8 max-w-3xl mx-auto">
          Registered and practicing in compliance with medical board standards
        </p>
      </div>
    </section>
  );
};

export default OurExperts;
