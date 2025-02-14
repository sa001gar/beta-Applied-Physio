import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { services } from '../data/services';
import Breadcrumb from '../components/Breadcrumb';

const ServiceDetails = () => {
  const { id } = useParams();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services" className="text-green-600 hover:text-green-700">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32">
      <Breadcrumb pageName={service.title} />
      
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/services" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="relative">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              <div className={`absolute top-4 left-4 ${service.color} bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}>
                <service.icon size={24} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{service.title}</h1>
            <p className="text-xl text-gray-600">{service.description}</p>
            
            <div className="border-t border-b border-gray-200 py-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">About This Service</h2>
              <p className="text-gray-600">{service.fullDescription}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Benefits</h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`${service.color} p-1 rounded-full mr-3 mt-1`}>
                      <Check className="w-4 h-4" />
                    </span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/contact"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors mt-6"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetails;