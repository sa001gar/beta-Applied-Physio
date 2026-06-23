import { Link, useLocation } from 'react-router-dom';
import { services } from '../data/services';

const Services = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <section className={`py-16 bg-white`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-green-800 mb-3">Our Physiotherapy Services</h2>
          <p className="text-sm font-bold text-gray-500 max-w-xl mx-auto">
            Comprehensive care for every stage of your recovery
          </p>
        </div>

        {/* Responsive grid for 12 services */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-white border border-gray-100 hover:border-green-500/30 p-4 rounded-xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50/60 flex items-center justify-center text-green-600 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs md:text-sm text-green-700 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-[10px] md:text-[11px] text-gray-500 font-bold leading-normal mt-1">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-50">
                  <Link 
                    to={`/services/${service.id}`}
                    className="inline-flex items-center text-[10px] font-bold text-gray-400 group-hover:text-green-600 transition-colors"
                  >
                    <span>Learn More</span>
                    <svg className="w-2.5 h-2.5 ml-1 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {isHomePage && (
          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center border border-gray-200 bg-white hover:bg-gray-50/50 hover:border-green-600/40 px-6 py-2.5 rounded-full text-green-700 font-bold text-sm shadow-xs transition-colors"
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