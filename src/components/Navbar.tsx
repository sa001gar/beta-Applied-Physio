import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import BookNow from './BookNow';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'conditions' | 'services' | null>(null);
  const location = useLocation();

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
  }, [location]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const servicesList = [
    { name: 'Manual Therapy', id: 'manual' },
    { name: 'Orthopedic Physiotherapy', id: 'orthopaedic' },
    { name: 'Sports Rehabilitation', id: 'sports' },
    { name: 'Neurological Physiotherapy', id: 'neurological' },
    { name: 'Pediatric Physiotherapy', id: 'pediatric' },
    { name: 'Geriatric Physiotherapy', id: 'geriatric' },
    { name: 'Post Surgical Rehab', id: 'post-surgical' },
    { name: 'Dry Needling', id: 'dry-needling' },
    { name: 'Electrotherapy', id: 'electrotherapy' },
    { name: 'Posture Correction', id: 'posture' },
    { name: 'Home Physiotherapy', id: 'home-physio' },
    { name: 'Corporate Physiotherapy', id: 'corporate' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
      ? 'bg-gradient-to-r from-[#f0fdf4]/95 via-[#fefce8]/95 to-[#f0fdf4]/95 backdrop-blur-md shadow-sm py-4'
      : 'bg-transparent py-4'
      }`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group hover:opacity-95 transition-opacity">
            <img src="/images/layout/logo-rect.png" alt="logo" width={240} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-base font-bold transition-all pt-1 ${location.pathname === '/'
                ? 'text-green-600 border-b-[2.5px] border-green-600 pb-1'
                : 'text-gray-700 border-b-[2.5px] border-transparent pb-1 hover:text-green-600'
                }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-base font-bold transition-all pt-1 ${location.pathname === '/about'
                ? 'text-green-600 border-b-[2.5px] border-green-600 pb-1'
                : 'text-gray-700 border-b-[2.5px] border-transparent pb-1 hover:text-green-600'
                }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative pt-1 pb-1 group"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center text-base font-bold text-gray-700 hover:text-green-600 transition-colors gap-1">
                <span>Services</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute left-0 mt-3 w-72 bg-white border border-gray-100 rounded-xl shadow-xl py-3 z-50 grid grid-cols-1 gap-1 transform transition-all duration-200 origin-top-left">
                  {servicesList.map((serv) => (
                    <Link
                      key={serv.id}
                      to={`/services`}
                      className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {serv.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className={`text-base font-bold transition-all pt-1 ${location.pathname.startsWith('/blog')
                ? 'text-green-600 border-b-[2.5px] border-green-600 pb-1'
                : 'text-gray-700 border-b-[2.5px] border-transparent pb-1 hover:text-green-600'
                }`}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className={`text-base font-bold transition-all pt-1 ${location.pathname === '/contact'
                ? 'text-green-600 border-b-[2.5px] border-green-600 pb-1'
                : 'text-gray-700 border-b-[2.5px] border-transparent pb-1 hover:text-green-600'
                }`}
            >
              Contact
            </Link>
          </div>

          {/* Book Now & Call action */}
          <div className="hidden lg:flex flex-row gap-3 items-center">
            <a
              href="tel:+919808163749"
              className="px-5 py-2.5 text-green-700 border border-green-600/40 hover:border-green-600 hover:bg-green-50/20 rounded-lg transition-all duration-300 font-bold flex items-center space-x-2 transform hover:-translate-y-0.5 text-base"
            >
              <Phone className="w-3.5 h-3.5 text-green-600" />
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
            className="lg:hidden text-gray-700 hover:text-green-700 transition-colors p-2 rounded-lg hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 space-y-4 shadow-lg absolute top-full left-0 w-full z-45">
          <Link
            to="/"
            className="block font-semibold text-gray-700 hover:text-green-600 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block font-semibold text-gray-700 hover:text-green-600 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="block font-semibold text-gray-700 hover:text-green-600 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/blog"
            className="block font-semibold text-gray-700 hover:text-green-600 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="block font-semibold text-gray-700 hover:text-green-600 py-2"
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