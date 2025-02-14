import { Link, useLocation } from 'react-router-dom';
import { services } from '../data/services';

const ServiceCard = ({ service }: { service: typeof services[0] }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 z-10"></div>
    <img 
      src={service.image} 
      alt={service.title} 
      className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute top-4 left-4 z-20">
      <div className={`${service.color} bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg`}>
        <service.icon size={20} />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
      <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        {service.description}
      </p>
      <Link 
        to={`/services/${service.id}`}
        className="inline-flex items-center text-yellow-300 font-semibold hover:text-yellow-400 transition-colors"
      >
        Learn More
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </div>
);

const Services = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const displayedServices = isHomePage 
    ? services.filter(service => service.featured)
    : services;

  return (
    <section className={`${isHomePage ? 'py-20' : 'pt-32'} bg-gradient-to-br from-green-50 to-yellow-50`}>
      <div className="container mx-auto px-4">
        {isHomePage ? (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our comprehensive range of physiotherapy treatments
            </p>
          </div>
        ) : (
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-green-800 mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive physiotherapy solutions tailored to your unique needs
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {isHomePage && (
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors"
            >
              Explore All Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;