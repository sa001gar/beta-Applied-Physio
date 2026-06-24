import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, Calendar, MapPin, Phone, Mail, MessageSquare, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface BookNowProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon 
}: { 
  options: string[]; 
  value: string; 
  onChange: (val: string) => void; 
  placeholder: string; 
  icon: any; 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 bg-white text-left ${
          isOpen ? 'border-green-500 ring-2 ring-green-500/20' : 'border-gray-300 hover:border-green-400'
        }`}
      >
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isOpen ? 'text-green-500' : 'text-gray-400'}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={value ? 'text-gray-900 font-medium' : 'text-gray-500'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden origin-top"
          >
            <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-green-50 ${
                    value === option ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 font-medium'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BookNow = ({ isOpen, onClose, defaultService }: BookNowProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || '',
    location: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Reset form when opened with a default service
    if (isOpen && defaultService) {
      setFormData(prev => ({ ...prev, service: defaultService }));
    }
    
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, defaultService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.service) {
      alert("Please select a service.");
      return;
    }
    if (!formData.location) {
      alert("Please select a preferred location.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: '662ca92f-e70b-4dac-9fae-03fd5ea922f4',
          ...formData,
          subject: 'New Appointment Request',
          from_name: 'Applied Physio Website Booking'
        })
      });

      const data = await response.json();
      if (data.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: defaultService || '',
          location: '',
          message: ''
        });
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // We use createPortal to render the modal at the document root,
  // preventing parent components (like Navbar with backdrop-filter) from clipping or breaking fixed positioning.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="book-now-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#042014]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl relative overflow-visible my-auto"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-bl-[4rem] rounded-tr-[2rem] opacity-50 overflow-hidden pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-50 rounded-tr-[4rem] rounded-bl-[2rem] opacity-50 overflow-hidden pointer-events-none" />
            
            {showSuccess ? (
              <div className="p-10 text-center relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-50 mb-6 border-4 border-green-100"
                >
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </motion.div>
                <h3 className="text-3xl font-bold text-[#042014] mb-4 font-serif">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                  Thank you for choosing Applied Physio. We'll get back to you shortly to confirm your appointment.
                </p>
                
                {/* Success illustration */}
                <div className="max-w-xs mx-auto mb-2 opacity-90">
                  <svg viewBox="0 0 200 150" className="w-full">
                    <rect x="40" y="50" width="120" height="80" rx="16" fill="#f0fdf4" />
                    <circle cx="100" cy="90" r="25" fill="#10b981" />
                    <path d="M90 90 L100 100 L115 80" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M20 120 C40 130, 160 130, 180 120" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center p-6 md:px-8 md:py-6 border-b border-gray-100 relative z-10 bg-white/50 backdrop-blur-sm rounded-t-[2rem]">
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#042014] flex items-center font-serif">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mr-3 border border-green-100">
                      <Calendar className="text-green-600 h-5 w-5" />
                    </div>
                    Book Appointment
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-[#042014] hover:bg-gray-100 transition-all p-2.5 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="max-h-[75vh] overflow-y-auto p-6 md:p-8 custom-scrollbar relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-all duration-200 outline-none font-medium"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                            <Mail className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-all duration-200 outline-none font-medium"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                            <Mail className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+91 98081 63749"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-all duration-200 outline-none font-medium"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                            <Phone className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Service</label>
                        <CustomDropdown
                          options={[
                            "Manual Therapy",
                            "Sports Rehabilitation",
                            "Physical Therapy",
                            "Ergonomic Care",
                            "Neurological Rehabilitation",
                            "Pediatric Physiotherapy",
                            "Geriatric Care"
                          ]}
                          value={formData.service}
                          onChange={(val) => handleDropdownChange('service', val)}
                          placeholder="Choose a service"
                          icon={CheckCircle}
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Location</label>
                      <CustomDropdown
                        options={[
                          "Main Clinic - Benachity",
                          "Branch Office - Near NIT"
                        ]}
                        value={formData.location}
                        onChange={(val) => handleDropdownChange('location', val)}
                        placeholder="Choose a location"
                        icon={MapPin}
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">How can we help you?</label>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-all duration-200 outline-none font-medium resize-none"
                          placeholder="Please describe your condition or any specific requirements..."
                        ></textarea>
                        <div className="absolute left-3 top-4 text-gray-400 group-focus-within:text-green-500 transition-colors">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 text-gray-700 transition-all font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 bg-green-600 text-white rounded-xl shadow-[0_8px_20px_rgba(22,163,74,0.2)] hover:bg-green-700 hover:shadow-[0_10px_25px_rgba(22,163,74,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed font-semibold flex items-center transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
      
      {/* Add a global style for the scrollbar */}
      {isOpen && (
        <style dangerouslySetInnerHTML={{ __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        ` }} />
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BookNow;