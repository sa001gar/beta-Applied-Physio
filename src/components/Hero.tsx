import { useState } from 'react';
import { Check, Users, Shield, Heart, Calendar, PhoneCall, Radiation } from 'lucide-react';
import BookNow from './BookNow';

const Hero = () => {
  const [showBooking, setShowBooking] = useState(false);

  const bulletPoints = [
    'Back Pain',
    'Sports Injuries',
    'Neck & Shoulder Pain',
    'Post Surgery Recovery',
    'Stroke Rehabilitation',
    'Home Physiotherapy'
  ];

  return (
    <section className="relative pt-32 pb-12 bg-gradient-to-r from-[#f0fdf4] via-[#fefce8]/60 to-[#f0fdf4] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">

            {/* Best Physiotherapy Clinic badge */}
            <div className="inline-flex items-center space-x-2 bg-yellow-50 border border-yellow-200 px-3.5 py-1.5 rounded-full shadow-xs text-yellow-800 text-xs font-bold tracking-wide">
              <Radiation className='w-4 h-4' strokeWidth={2.5} /><span> Best Physiotherapy Clinic in Durgapur</span>
            </div>

            {/* Custom font and typography */}
            <h1 className="text-5xl md:text-6xl font-medium text-gray-900 leading-relaxed instrument-font italic">
              Expert Physiotherapy <br className="hidden md:inline" />
              <span className="text-green-600">Care in Durgapur</span>
            </h1>

            {/* Subtitle list */}
            <p className="text-xs md:text-sm uppercase font-bold text-green-800 tracking-wide bg-green-100 rounded-full py-2 px-4 w-fit">
              Pain Relief • Rehabilitation • Sports Injury Recovery • Neurological Physiotherapy
            </p>

            <p className="text-base md:text-lg text-gray-600 max-w-xl font-normal leading-relaxed">
              We help people of Durgapur and surrounding areas live a pain-free, active, and healthier life through advanced physiotherapy and personalized care.
            </p>

            {/* Three feature icons */}
            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="flex items-center space-x-2 text-xs md:text-sm font-semibold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Users className="w-4 h-4" />
                </div>
                <span>Experienced Therapists</span>
              </div>
              <div className="flex items-center space-x-2 text-xs md:text-sm font-semibold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Shield className="w-4 h-4" />
                </div>
                <span>Advanced Equipment</span>
              </div>
              <div className="flex items-center space-x-2 text-xs md:text-sm font-semibold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Heart className="w-4 h-4" />
                </div>
                <span>Personalized Care</span>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setShowBooking(true)}
                className="group px-7 py-3.5 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md hover:shadow-green-600/10 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5 font-bold"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
              <a
                href="tel:+919808163749"
                className="px-7 py-3.5 text-green-700 border border-green-600/40 hover:border-green-600 hover:bg-green-50/20 rounded-lg transition-all duration-300 font-bold flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4 text-green-600" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Google Reviews */}
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-100 max-w-sm">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-gray-800">4.9</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-md text-gray-600 font-medium">(210+ Google Reviews)</span>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <img
                src="/images/hero_physiotherapy_session.png"
                alt="Physiotherapy treatment session"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/hero_physio_illustration.png";
                }}
              />

              {/* Floating Stats Panel */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-gray-100 p-4 rounded-xl shadow-lg w-56 z-20 hover:scale-102 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-green-700 leading-none">15+</h3>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1 leading-tight">Years of Excellence in Physiotherapy</p>
                <div className="mt-3 border-t border-gray-100 pt-3 space-y-2">
                  {bulletPoints.map((item) => (
                    <div key={item} className="flex items-center text-xs text-gray-700 font-semibold gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      <BookNow
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </section>
  );
};

export default Hero;