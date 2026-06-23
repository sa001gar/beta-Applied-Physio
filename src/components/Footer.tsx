import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-900 to-green-800 text-white pt-16 pb-8 border-t border-green-700">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Logo & About (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                  <path d="M6 12h12" />
                  <path d="M12 8v14" />
                  <path d="m19 15-7-7-7 7" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white leading-none tracking-tight">
                  Applied Physio & Wellness
                </span>
                <span className="text-xs uppercase font-bold text-yellow-300 tracking-wider mt-0.5">
                  Move Better. Live Better.
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-gray-300 font-bold leading-relaxed max-w-sm">
              Leading physiotherapy clinic in Durgapur providing expert care, advanced treatment, and personalized rehabilitation to help you move better and live better.
            </p>
            
            <div className="flex space-x-3 pt-2">
              <a href="https://facebook.com/theappliedphysio" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/theappliedphysio" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@TheAppliedPhysio" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase text-yellow-300 tracking-widest">Quick Links</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-bold">
              <li><Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-300 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-yellow-300 transition-colors">Conditions</Link></li>
              <li><Link to="/services" className="hover:text-yellow-300 transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-yellow-300 transition-colors">Our Experts</Link></li>
              <li><Link to="/blog" className="hover:text-yellow-300 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-300 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase text-yellow-300 tracking-widest">Our Services</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-bold">
              <li><Link to="/services" className="hover:text-yellow-300 transition-colors">Manual Therapy</Link></li>
              <li><Link to="/services" className="hover:text-yellow-300 transition-colors">Sports Rehabilitation</Link></li>
              <li><Link to="/services" className="hover:text-yellow-300 transition-colors">Neurological Physiotherapy</Link></li>
              <li><Link to="/services" className="hover:text-yellow-300 transition-colors">Post Surgical Rehab</Link></li>
              <li><Link to="/services" className="hover:text-yellow-300 transition-colors">Home Physiotherapy</Link></li>
              <li><Link to="/services" className="hover:text-yellow-300 transition-colors">Corporate Physiotherapy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us (2.5 cols) */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-xs font-black uppercase text-yellow-300 tracking-widest">Contact Us</h4>
            <ul className="space-y-3.5 text-xs text-gray-300 font-bold">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">5D/22, ENP, Benachity, Near 54ft Road, Durgapur - 713213, West Bengal</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                <a href="tel:+919808163749" className="hover:text-yellow-300 transition-colors">+91 98081 63749</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                <a href="mailto:contact@appliedphysio.in" className="hover:text-yellow-300 transition-colors">contact@appliedphysio.in</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Mon - Sat: 9:00 AM - 8:00 PM<br />Sunday: By Appointment</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Find Us (2.5 cols) */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-xs font-black uppercase text-yellow-300 tracking-widest">Find Us</h4>
            {/* Google Map Mock Card */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-md group h-40">
              <img 
                src="/images/durgapur_map.png"
                alt="Clinic Map Location" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-white text-gray-900 p-2.5 rounded-lg shadow-lg max-w-[170px] z-10 leading-none">
                <h5 className="text-xs font-black leading-tight text-gray-900 truncate">Applied Physio & Wellness</h5>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-extrabold text-gray-800">4.9</span>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-1.5 h-1.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-400">(210)</span>
                </div>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-extrabold text-blue-600 hover:underline block mt-1.5 uppercase"
                >
                  View larger map
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-white transition-colors">Medical Disclaimer</Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-white transition-colors">Website Disclaimer</Link>
          </div>
          
          <div>
            © {new Date().getFullYear()} Applied Physio & Wellness. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;