import { Link, useLocation } from 'react-router-dom';
import { services } from '../data/services';
import Breadcrumb from './Breadcrumb';

const getServiceMetric = (id: string) => {
  switch (id) {
    case 'manual': return '98% Relief';
    case 'orthopaedic': return 'Joint Focus';
    case 'sports': return '99% Return';
    case 'neurological': return '1-on-1 Care';
    case 'pediatric': return 'Gentle Tech';
    case 'geriatric': return 'Fall Prev.';
    case 'post-surgical': return 'Rapid Rehab';
    case 'dry-needling': return 'Deep Release';
    case 'electrotherapy': return 'Advanced Tech';
    case 'posture': return 'Ergonomic';
    case 'home-physio': return 'Home Comfort';
    case 'corporate': return 'Wellness';
    default: return 'Certified';
  }
};

const Services = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Full Page Hero (Only on /services page) */}
      {!isHomePage && (
        <section className="bg-gradient-to-b from-[#042014] to-[#0b3c25] text-white pt-32 pb-36 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-[-10%] w-96 h-96 bg-emerald-500/[0.05] rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-green-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

          <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
            <div className="flex justify-center w-full">
              <Breadcrumb theme="dark" pageName="Services" />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 text-emerald-100 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Our Expertise</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-semibold instrument-font italic tracking-wide text-white">
                Specialized <span className="text-emerald-400">Physiotherapy</span> Care
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed pt-2">
                Explore our comprehensive range of clinical treatments. From advanced orthopaedic rehab to specialized neurological care, we offer evidence-based therapies designed to accelerate your healing and restore optimal movement.
              </p>
            </div>
          </div>

          {/* Elegant Bottom Curve Divider */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
            <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path className="fill-[#fafaf7]" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,149.3C672,160,768,224,864,240C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>
      )}

      <section className={`${isHomePage ? 'py-24' : 'py-16'} bg-gradient-to-b from-[#fafaf7] to-[#f4f7f5] relative overflow-hidden`}>
        {/* Background Decorative Blur Blobs */}
        <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-green-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-yellow-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] relative z-10">

          {/* Section Header (Only on Homepage) */}
          {isHomePage && (
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase mb-4 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Clinical Treatments & Care</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-semibold instrument-font italic text-[#042014] mb-4 leading-tight tracking-wide">
                Our Physiotherapy Services
              </h2>
              <p className="text-sm md:text-base font-medium text-gray-500 max-w-xl mx-auto leading-relaxed">
                We provide evidence-based care tailored to accelerate healing, restore optimal movement, and prevent future injuries.
              </p>
            </div>
          )}

          {/* Responsive Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {services.map((service) => {
              return (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="group bg-green-50/20 border border-emerald-950/[0.06] hover:border-emerald-600 p-6 md:p-7 rounded-2xl flex flex-col justify-between shadow-[0_10px_35px_rgba(4,32,20,0.03)] hover:shadow-[0_20px_50px_rgba(4,32,20,0.08)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer relative overflow-hidden"
                >
                  {/* Data Metric Badge */}
                  <span className="absolute top-4 right-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full z-10">
                    {getServiceMetric(service.id)}
                  </span>

                  <div className="space-y-4">
                    {/* Premium Illustration Badge Container */}
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50/80 border border-emerald-100/60 flex items-center justify-center p-2.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-100/50 shadow-sm relative overflow-hidden">
                      <img
                        src={`/images/landing/services/${service.id}.png`}
                        alt={service.title}
                        className="w-full h-full object-contain relative z-10"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-base md:text-lg text-[#042014] group-hover:text-emerald-700 transition-colors leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed mt-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Benefits List (Clinical Checkmarks) */}
                    <ul className="space-y-2.5 pt-3.5 border-t border-emerald-100/60">
                      {service.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 stroke-[3] bg-emerald-50/50 rounded-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span className="truncate">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-emerald-100/60">
                    <div className="inline-flex items-center text-sm font-semibold text-emerald-700 group-hover:text-emerald-900 transition-colors gap-1.5">
                      <span>Learn More</span>
                      <svg className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Explore Button */}
          {isHomePage && (
            <div className="text-center mt-12">
              <Link
                to="/services"
                className="inline-flex items-center bg-[#042014] hover:bg-emerald-950 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore All Services</span>
                <svg className="w-4 h-4 ml-2 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Services;