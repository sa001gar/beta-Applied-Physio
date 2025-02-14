import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { services } from '../data';

interface ServiceData {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
}

const ServiceModal = ({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: ServiceData | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!service || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/5 lg:w-1/2 relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 text-xl hover:text-red-700 transition-colors"
        >
          ✖
        </button>
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-60 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h3 className="text-3xl font-bold text-green-900 mb-4">{service.title}</h3>
          <p className="text-gray-700 mb-6">{service.content}</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ 
  service,
  onLearnMore 
}: { 
  service: ServiceData;
  onLearnMore: (service: ServiceData) => void;
}) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 z-10"></div>
    <img 
      src={service.image} 
      alt={service.title} 
      className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
      <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">{service.title}</h3>
      <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        {service.description}
      </p>
      <button 
        onClick={() => onLearnMore(service)}
        className="inline-flex items-center text-yellow-300 font-semibold hover:text-yellow-400 transition-colors"
      >
        Learn More
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
);

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const location = useLocation();

  const servicesData: ServiceData[] = [
    {
      id: 'orthopaedic',
      title: 'Orthopaedic Physiotherapy',
      description: 'Specialized care for musculoskeletal conditions and injuries.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
      content: 'Specialized care for muscles, bones, and joints. Our orthopaedic physiotherapy services help patients recover from injuries, surgeries, and chronic conditions affecting the musculoskeletal system.'
    },
    {
      id: 'neurological',
      title: 'Neurological Physiotherapy',
      description: 'Focused care for neurological disorders and recovery.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80',
      content: 'Treatment for disorders like stroke and Parkinson\'s. Our neurological physiotherapy program is designed to help patients regain function and improve their quality of life.'
    },
    {
      id: 'sports',
      title: 'Sports Rehabilitation',
      description: 'Customized recovery plans for athletes.',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80',
      content: 'Helping athletes recover and enhance performance. Our sports rehabilitation programs are tailored to get you back to your peak performance safely and effectively.'
    }
  ];

  return (
    <section className={`pt-20 ${location.pathname === '/' ? 'py-12' : 'pt-32'} bg-gradient-to-br from-green-50 to-yellow-50`}>
      {location.pathname !== '/' && (
        <div className="container mx-auto px-4 mb-12 text-center">
          <h1 className="text-5xl font-bold text-green-800 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of physiotherapy services designed to help you achieve optimal health and wellness.
          </p>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onLearnMore={setSelectedService}
            />
          ))}
        </div>

        {location.pathname !== '/' && (
          <div className="mt-16 text-center">
            <a
              href="/contact"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors"
            >
              Book a Consultation
            </a>
          </div>
        )}
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};

export default Services;