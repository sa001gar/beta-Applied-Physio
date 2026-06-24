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
    <section className="py-24 bg-gradient-to-b from-[#fafaf7] to-[#f4f7f5] relative overflow-hidden">

      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-green-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-yellow-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] relative z-10">

        {/* Section Header */}
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

        {/* Responsive Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="group bg-green-50/20 border border-emerald-950/[0.06] hover:border-emerald-600 p-6 md:p-7 rounded-2xl flex flex-col justify-between shadow-[0_10px_35px_rgba(4,32,20,0.03)] hover:shadow-[0_20px_50px_rgba(4,32,20,0.08)] hover:-translate-y-1.5 transition-all duration-500 cursor-default relative overflow-hidden"
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
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center text-sm font-semibold text-emerald-700 group-hover:text-emerald-900 transition-colors gap-1.5"
                  >
                    <span>Learn More</span>
                    <svg className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
};

export default Services;