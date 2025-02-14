import { ArrowRight, Activity, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-green-50 via-yellow-50 to-green-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 md:pr-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Experience <span className="text-green-600 relative">
                Expert Physiotherapy
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none">
                  <path d="M3 9C148.667 4.33333 294.333 4.33333 355 9" stroke="#FCD34D" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </span> in Durgapur
            </h1>
            <p className="text-lg text-gray-700 md:max-w-md">
              Regain strength, mobility, and confidence with personalized care from experienced physiotherapists.
              Your journey to pain-free living starts here.
            </p>
            
            {/* Feature Points */}
            <div className="grid grid-cols-2 gap-4 py-6">
              {[
                { icon: Activity, text: "Expert Care" },
                { icon: Heart, text: "Personalized Treatment" },
                { icon: Users, text: "Dedicated Team" },
                { icon: ArrowRight, text: "Quick Recovery" }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <feature.icon className="w-5 h-5 text-green-600" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                to="/contact"
                className="px-8 py-4 text-white bg-green-600 hover:bg-green-700 rounded-full shadow-lg transition flex items-center space-x-2"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 text-green-600 border-2 border-green-600 hover:bg-green-50 rounded-full transition"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-green-200 rounded-full filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"
              alt="Physiotherapy session"
              className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-500"
            />
            
            {/* Floating Stats */}
            <div
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl"
            >
              <p className="text-2xl font-bold text-green-600">15+ Years</p>
              <p className="text-gray-600">of Excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
    </section>
  );
};

export default Hero;