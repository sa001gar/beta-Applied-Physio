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

  const conditionsList = [
    'Back Pain', 'Lower Back Pain', 'Sciatica', 'Cervical Pain',
    'Frozen Shoulder', 'Knee Pain', 'Arthritis', 'Sports Injuries',
    'Tennis Elbow', 'Stroke Rehabilitation', 'Parkinson\'s Rehab', 'Post Surgical Recovery'
  ];

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
        ? 'bg-gradient-to-r from-[#f0fdf4]/95 via-[#fefce8]/95 to-[#f0fdf4]/95 backdrop-blur-md shadow-sm py-2' 
        : 'bg-transparent py-3'
      }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group hover:opacity-95 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white border-[2px] border-green-500 flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                <path d="M6 12h12" />
                <path d="M12 8v14" />
                <path d="m19 15-7-7-7 7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[19px] font-bold text-green-800 leading-tight tracking-tight">
                Applied Physio & Wellness
              </span>
              <span className="text-[11px] font-medium text-gray-500 tracking-wide">
                Move Better. Live Better.
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-[15px] font-bold transition-all pt-1 ${location.pathname === '/'
                ? 'text-green-600 border-b-[2.5px] border-green-600 pb-1'
                : 'text-gray-700 border-b-[2.5px] border-transparent pb-1 hover:text-green-600'
                }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-[15px] font-bold transition-all pt-1 ${location.pathname === '/about'
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
              <button className="flex items-center text-[15px] font-bold text-gray-700 hover:text-green-600 transition-colors gap-1">
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
              className={`text-[15px] font-bold transition-all pt-1 ${location.pathname.startsWith('/blog')
                ? 'text-green-600 border-b-[2.5px] border-green-600 pb-1'
                : 'text-gray-700 border-b-[2.5px] border-transparent pb-1 hover:text-green-600'
                }`}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className={`text-[15px] font-bold transition-all pt-1 ${location.pathname === '/contact'
                ? 'text-green-600 border-b-[2.5px] border-green-600 pb-1'
                : 'text-gray-700 border-b-[2.5px] border-transparent pb-1 hover:text-green-600'
                }`}
            >
              Contact
            </Link>
          </div>

          {/* Book Now & Call action */}
          <div className="hidden lg:flex flex-row gap-4 items-center">
            <a
              href="tel:+919808163749"
              className="flex items-center justify-center bg-white border border-gray-200 px-4 py-2 rounded-xl text-[13px] font-bold text-gray-800 hover:bg-green-50 hover:border-green-200 transition-all gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4 text-green-600 fill-current" />
              <span>+91 98081 63749</span>
            </a>
            <button
              onClick={() => setShowBooking(true)}
              className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold text-[14px] rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
              className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl text-center shadow-md transition-colors text-[15px]"
            >
              Book Appointment
            </button>
            <a
              href="tel:+919808163749"
              className="flex items-center justify-center bg-gray-50 border border-gray-200 py-3 rounded-xl text-[15px] font-bold text-gray-800 gap-2 hover:bg-green-50 hover:border-green-200 transition-colors shadow-sm"
            >
              <Phone className="w-5 h-5 text-green-600 fill-current" />
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