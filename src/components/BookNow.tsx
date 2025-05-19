import { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookNowProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const BookNow = ({ isOpen, onClose, defaultService }: BookNowProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || '',
    location: '',
    userLocation: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            userLocation: `${latitude},${longitude}`
          }));
        },
        (error) => {
          console.log('Location access denied or error:', error);
        }
      );
    }

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
          userLocation: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-bl-full opacity-30" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-tr-full opacity-30" />
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-yellow-100 rounded-full opacity-30" />
          
          {showSuccess ? (
            <div className="p-8 text-center relative z-10">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for choosing Applied Physio. We'll get back to you shortly to confirm your appointment.
              </p>
              
              {/* Success illustration */}
              <div className="max-w-xs mx-auto mb-6">
                <svg viewBox="0 0 200 150" className="w-full">
                  <rect x="40" y="50" width="120" height="80" rx="10" fill="#E6F7ED" />
                  <circle cx="100" cy="90" r="25" fill="#84D6AC" />
                  <path d="M90 90 L100 100 L115 80" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <path d="M20 120 C40 130, 160 130, 180 120" stroke="#84D6AC" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center p-6 border-b relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Calendar className="mr-2 text-green-600 h-6 w-6" />
                  Book an Appointment
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto px-6 pb-6 custom-scrollbar">
                {/* Form illustration */}
                <div className="my-6 text-center">
                  <svg className="w-32 h-32 mx-auto" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="#E6F7ED" />
                    <rect x="70" y="60" width="60" height="80" rx="4" fill="#FFFFFF" stroke="#84D6AC" strokeWidth="2" />
                    <line x1="80" y1="80" x2="120" y2="80" stroke="#84D6AC" strokeWidth="2" />
                    <line x1="80" y1="90" x2="120" y2="90" stroke="#84D6AC" strokeWidth="2" />
                    <line x1="80" y1="100" x2="110" y2="100" stroke="#84D6AC" strokeWidth="2" />
                    <circle cx="130" cy="110" r="25" fill="#84D6AC" opacity="0.6" />
                    <path d="M50 130 C70 150, 130 150, 150 130" stroke="#84D6AC" strokeWidth="2" fill="none" />
                  </svg>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500">
                          <Mail className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500">
                          <Mail className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500">
                          <Phone className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all duration-200"
                      >
                        <option value="">Select a service</option>
                        <option value="Manual Therapy">Manual Therapy</option>
                        <option value="Sports Rehabilitation">Sports Rehabilitation</option>
                        <option value="Physical Therapy">Physical Therapy</option>
                        <option value="Ergonomic Care">Ergonomic Care</option>
                        <option value="Neurological Rehabilitation">Neurological Rehabilitation</option>
                        <option value="Pediatric Physiotherapy">Pediatric Physiotherapy</option>
                        <option value="Geriatric Care">Geriatric Care</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
                    <div className="relative">
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all duration-200"
                      >
                        <option value="">Select a location</option>
                        <option value="Main Clinic">Main Clinic - Benachity</option>
                        <option value="Branch Office">Branch Office - Near NIT</option>
                      </select>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500">
                        <MapPin className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        placeholder="Please describe your condition or any specific requirements..."
                      ></textarea>
                      <div className="absolute left-3 top-6 text-gray-400 group-focus-within:text-green-500">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-medium flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Booking...
                        </>
                      ) : (
                        'Book Appointment'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </div>
      
      {/* Add a global style for the scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5e2d5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #84D6AC;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default BookNow;