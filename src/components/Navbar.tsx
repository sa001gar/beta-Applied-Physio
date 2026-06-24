import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import BookNow from './BookNow';
import { services } from '../data/services';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isDarkHeaderPage = location.pathname === '/contact' || location.pathname === '/about' || location.pathname === '/services' || location.pathname === '/blog';
  const useLightText = isDarkHeaderPage && !isScrolled;

  const getLinkClass = (path: string, exact = true) => {
    const isActive = exact ? location.pathname === path : location.pathname.startsWith(path);
    if (isActive) {
      return useLightText
        ? 'text-emerald-300 border-b-[2.5px] border-emerald-300 pb-1'
        : 'text-green-600 border-b-[2.5px] border-green-600 pb-1';
    } else {
      return useLightText
        ? 'text-white/95 border-b-[2.5px] border-transparent pb-1 hover:text-emerald-300'
        : 'text-gray-700 border-b-[2.5px] border-transparent pb-1 hover:text-green-600';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown('services');
  };

  const handleMouseLeave = () => {
    // Delay close so user can move to dropdown without it closing
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };


  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
      ? 'bg-gradient-to-r from-[#f0fdf4]/95 via-[#fefce8]/95 to-[#f0fdf4]/95 backdrop-blur-md shadow-sm py-3'
      : 'bg-transparent py-3'
      }`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group hover:opacity-95 transition-opacity -my-1">
            <img
              src="/images/layout/logo_final.png"
              alt="logo"
              width={260}
              height={50}
              className={`transition-all duration-300 ${useLightText ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-base font-semibold transition-all pt-1 ${getLinkClass('/')}`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-base font-semibold transition-all pt-1 ${getLinkClass('/about')}`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative pt-1 pb-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/services"
                className={`flex items-center text-base font-semibold transition-colors gap-1 ${location.pathname.startsWith('/services')
                  ? (useLightText ? 'text-emerald-300' : 'text-green-600')
                  : (useLightText ? 'text-white/95 hover:text-emerald-300' : 'text-gray-700 hover:text-green-600')
                  }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''
                  } ${useLightText ? 'text-white/60' : 'text-gray-400'}`} />
              </Link>

              {/* Mega Dropdown */}
              {activeDropdown === 'services' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[620px] bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-l border-t border-gray-100" />

                  <div className="relative p-2">
                    <div className="grid grid-cols-2 gap-0.5">
                      {services.map((serv) => (
                        <Link
                          key={serv.id}
                          to={`/services/${serv.id}`}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-green-50 transition-colors group/item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100/60 flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-100 transition-colors">
                            <img
                              src={`/images/landing/services/${serv.id}.png`}
                              alt=""
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-gray-800 group-hover/item:text-green-700 transition-colors block truncate">{serv.title}</span>
                            <span className="text-xs text-gray-400 block truncate">{serv.description}</span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Footer link */}
                    <div className="mt-1 pt-2 border-t border-gray-100">
                      <Link
                        to="/services"
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-green-700 hover:text-green-800 hover:bg-green-50 rounded-xl transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        View All Services
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className={`text-base font-semibold transition-all pt-1 ${getLinkClass('/blog', false)}`}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className={`text-base font-semibold transition-all pt-1 ${getLinkClass('/contact')}`}
            >
              Contact
            </Link>
          </div>

          {/* Book Now & Call action */}
          <div className="hidden lg:flex flex-row gap-3 items-center">
            <a
              href="tel:+919808163749"
              className={`px-5 py-2.5 border rounded-lg transition-all duration-300 font-bold flex items-center space-x-2 transform hover:-translate-y-0.5 text-base ${useLightText
                ? 'text-white border-white/30 hover:border-emerald-300 hover:bg-white/10'
                : 'text-green-700 border-green-600/40 hover:border-green-600 hover:bg-green-50/20'
                }`}
            >
              <Phone className={`w-3.5 h-3.5 transition-colors ${useLightText ? 'text-emerald-300' : 'text-green-600'}`} />
              <span>+91 98081 63749</span>
            </a>
            <button
              onClick={() => setShowBooking(true)}
              className="px-6 py-2.5 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm hover:shadow-green-600/10 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5 font-bold text-base"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden transition-colors p-2 rounded-lg ${useLightText
              ? 'text-white hover:text-emerald-300 hover:bg-white/5'
              : 'text-gray-700 hover:text-green-700 hover:bg-gray-100'
              }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 space-y-1 shadow-lg absolute top-full left-0 w-full z-45 max-h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
          <Link
            to="/"
            className="block font-semibold text-gray-700 hover:text-green-600 py-2.5 px-2 rounded-lg hover:bg-green-50/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block font-semibold text-gray-700 hover:text-green-600 py-2.5 px-2 rounded-lg hover:bg-green-50/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>

          {/* Mobile Services Accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between font-semibold text-gray-700 py-2.5 px-2 rounded-lg hover:bg-green-50/50 transition-colors"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-2 mt-1 space-y-0.5 border-l-2 border-green-100 pl-3">
                {services.map((serv) => (
                  <Link
                    key={serv.id}
                    to={`/services/${serv.id}`}
                    className="block text-sm font-medium text-gray-600 hover:text-green-700 py-2 px-2 rounded-lg hover:bg-green-50/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {serv.title}
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="block text-sm font-semibold text-green-700 py-2 px-2 rounded-lg hover:bg-green-50/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View All Services →
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/blog"
            className="block font-semibold text-gray-700 hover:text-green-600 py-2.5 px-2 rounded-lg hover:bg-green-50/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="block font-semibold text-gray-700 hover:text-green-600 py-2.5 px-2 rounded-lg hover:bg-green-50/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowBooking(true);
              }}
              className="w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all duration-300 font-bold text-base"
            >
              Book Appointment
            </button>
            <a
              href="tel:+919808163749"
              className="flex items-center justify-center w-full py-3 text-green-700 border border-green-600/40 hover:border-green-600 hover:bg-green-50/20 rounded-lg transition-all duration-300 font-bold gap-2 text-base"
            >
              <Phone className="w-4 h-4 text-green-600" />
              <span>+91 98081 63749</span>
            </a>
          </div>
        </div>
      )}

      <BookNow
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </nav>
  );
};

export default Navbar;