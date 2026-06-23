import { Link, useLocation } from 'react-router-dom';
import { services } from '../data/services';

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
    <section className="py-24 bg-gradient-to-b from-[#0b3c25] to-[#041d11] text-white relative overflow-hidden">

      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-950/60 text-green-300 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase mb-4 border border-green-800">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span>Clinical Treatments & Care</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold instrument-font italic text-white mb-4 leading-tight tracking-wide">
            Our <span className="text-transparent bg-clip-text bg-green-300">Physiotherapy</span>{" "}<span className="text-transparent bg-clip-text bg-yellow-300">Services</span>
          </h2>
          <p className="text-sm md:text-base font-normal text-gray-300 max-w-xl mx-auto leading-relaxed">
            We provide evidence-based care tailored to accelerate healing, restore optimal movement, and prevent future injuries.
          </p>
        </div>

        {/* Responsive Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="group bg-[#fbfdfc] border border-[#e2e9e5] hover:border-green-400 p-6 md:p-7 rounded-2xl flex flex-col justify-between shadow-xl hover:shadow-[0_20px_50px_rgba(4,47,29,0.25)] hover:-translate-y-2 transition-all duration-300 cursor-default relative overflow-hidden"
              >
                {/* Data Metric Badge */}
                <span className="absolute top-4 right-4 bg-green-50/80 border border-green-100 text-green-700 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full">
                  {getServiceMetric(service.id)}
                </span>

                <div className="space-y-4">
                  {/* Premium Illustration Badge Container */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-50/60 to-emerald-50/40 border border-green-100/50 flex items-center justify-center p-3 transition-all duration-300 group-hover:scale-105 group-hover:from-green-50 group-hover:to-emerald-100/50 shadow-sm relative overflow-hidden">
                    <img 
                      src={`/images/landing/services/${service.id}.png`}
                      alt={service.title}
                      className="w-full h-full object-contain relative z-10"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-green-950 group-hover:text-green-600 transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed mt-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Benefits List (Clinical Checkmarks) */}
                  <ul className="space-y-2.5 pt-3.5 border-t border-green-100/60">
                    {service.benefits.slice(0, 2).map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                        <svg className="w-4 h-4 text-green-600 flex-shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="truncate">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3.5 border-t border-green-100/60">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center text-sm font-semibold text-green-700 group-hover:text-green-900 transition-colors gap-1.5"
                  >
                    <span>Learn More</span>
                    <svg className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore Button */}
        {isHomePage && (
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center bg-white hover:bg-green-50 border border-gray-100 hover:border-green-400 px-8 py-3.5 rounded-lg text-green-800 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
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
  );
};

export default Services;