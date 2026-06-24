import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0b3c25] to-[#062416] text-white pt-20 pb-10 border-t border-green-800">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">

          {/* Column 1: Logo & About (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <Link to="/" className="inline-block group hover:opacity-90 transition-opacity">
              <img
                src="/images/layout/logo_logo.png"
                alt="Applied Physio & Wellness Logo"
                className="h-24 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-sm text-gray-300 font-medium leading-relaxed max-w-sm">
              Leading physiotherapy clinic in Durgapur providing expert care, advanced treatment, and personalized rehabilitation to help you move better and live better.
            </p>

            <div className="flex space-x-3 pt-2">
              <a href="https://facebook.com/theappliedphysio" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-500 flex items-center justify-center text-gray-300 hover:text-white hover:scale-105 transition-all duration-300">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="https://instagram.com/theappliedphysio" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-500 flex items-center justify-center text-gray-300 hover:text-white hover:scale-105 transition-all duration-300">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="https://www.youtube.com/@TheAppliedPhysio" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-500 flex items-center justify-center text-gray-300 hover:text-white hover:scale-105 transition-all duration-300">
                <Youtube className="w-4.5 h-4.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-500 flex items-center justify-center text-gray-300 hover:text-white hover:scale-105 transition-all duration-300">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-md font-extrabold uppercase text-white tracking-widest border-b border-white/10 pb-2">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-gray-300 font-medium">
              <li><Link to="/" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Home</Link></li>
              <li><Link to="/about" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">About Us</Link></li>
              <li><Link to="/services" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Conditions</Link></li>
              <li><Link to="/services" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Services</Link></li>
              <li><Link to="/about" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Our Experts</Link></li>
              <li><Link to="/blog" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-md font-extrabold uppercase text-white tracking-widest border-b border-white/10 pb-2">Our Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-300 font-medium">
              <li><Link to="/services" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Manual Therapy</Link></li>
              <li><Link to="/services" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Sports Rehabilitation</Link></li>
              <li><Link to="/services" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Neurological Physiotherapy</Link></li>
              <li><Link to="/services" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Post Surgical Rehab</Link></li>
              <li><Link to="/services" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Home Physiotherapy</Link></li>
              <li><Link to="/services" className="hover:text-green-300 hover:translate-x-1 transition-all duration-300 inline-block">Corporate Physiotherapy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-md font-extrabold uppercase text-white tracking-widest border-b border-white/10 pb-2">Contact Us</h4>
            <ul className="space-y-3.5 text-sm text-gray-300 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-green-300 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-300">5D/22, ENP, Benachity, Near 54ft Road, Durgapur - 713213, West Bengal</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-green-300 flex-shrink-0" />
                <a href="tel:+919808163749" className="hover:text-green-300 transition-colors">+91 98081 63749</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-green-300 flex-shrink-0" />
                <a href="mailto:contact@appliedphysio.in" className="hover:text-green-300 transition-colors">contact@appliedphysio.in</a>
              </li>

            </ul>
          </div>

          {/* Column 5: Find Us (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-md font-extrabold uppercase text-white tracking-widest border-b border-white/10 pb-2">Find Our Location</h4>
            {/* Embedded Google Map */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg h-48 w-full">
              <iframe
                title="The Applied Physio Location Map"
                src="https://maps.google.com/maps?q=The%20Applied%20Physio%20Benachity%20Durgapur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-green-300 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-300">Mon - Sat: 9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-green-300 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-300">Sunday: By Appointment</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400 font-semibold uppercase tracking-wider">
          <div className="flex flex-wrap gap-4 justify-center text-center">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/medical-disclaimer" className="hover:text-white transition-colors">Medical Disclaimer</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/website-disclaimer" className="hover:text-white transition-colors">Website Disclaimer</Link>
          </div>

          <div className="text-xs text-gray-400 font-semibold">
            © {new Date().getFullYear()} Applied Physio & Wellness. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;