import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, X, Calendar, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-[#042014]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-[2rem] p-8 md:p-10 max-w-md w-full relative shadow-2xl border border-[#042014]/10"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-6 border border-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#042014] mb-3">Appointment Requested!</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Thank you for choosing Applied Physio. Our clinical coordinator will contact you shortly to confirm your scheduled slot.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#042014] hover:bg-emerald-950 text-white font-bold py-3.5 rounded-xl shadow-md transition-all"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

const CustomSelect = ({ label, value, onChange, options, placeholder }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-200 hover:border-[#042014]/30 focus:border-[#042014] focus:ring-4 focus:ring-[#042014]/5 rounded-xl font-medium transition-all text-sm text-left flex justify-between items-center"
      >
        <span className={value ? 'text-[#042014]' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 max-h-60 overflow-y-auto custom-scrollbar"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-green-50 hover:text-green-700 ${opt.value === value ? 'bg-green-50 text-green-700' : 'text-gray-700'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);



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
          from_name: 'Applied Physio Website Contact Form'
        })
      });

      const data = await response.json();
      if (data.success) {
        setShowSuccessModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          location: '',
          message: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
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

  const serviceOptions = [
    { value: 'Manual Therapy', label: 'Manual Therapy' },
    { value: 'Sports Rehabilitation', label: 'Sports Rehabilitation' },
    { value: 'Physical Therapy', label: 'Physical Therapy' },
    { value: 'Post Surgical Rehab', label: 'Post Surgical Rehab' },
    { value: 'Home Physiotherapy', label: 'Home Physiotherapy' }
  ];

  const locationOptions = [
    { value: 'Main Clinic - Benachity', label: 'Benachity Clinic (H.O.)' },
    { value: 'City Centre Clinic', label: 'City Centre Clinic' },
    { value: '54ft Clinic - Near NIT', label: '54ft Clinic (Near NIT)' },
    { value: 'Home Care Visit', label: 'Home Care Visit (Direct to Home)' }
  ];

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#042014] to-[#0b3c25] text-white pt-32 pb-36 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-[-10%] w-96 h-96 bg-emerald-500/[0.05] rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-green-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-[1300px] text-center relative z-10">
          <div className="flex justify-center w-full">
            <Breadcrumb theme="dark" pageName="Contact Us" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact Applied Physio</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-wide instrument-font italic">
              Let's Start Your Recovery
            </h1>

            <p className="text-md md:text-lg text-emerald-100/70 max-w-2xl mx-auto leading-relaxed">
              Have questions about physical therapy or ready to book your first clinical session? Fill out the form or reach out to our team directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="container mx-auto px-4 max-w-[1300px] pb-28 relative z-20 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Form & Map Cards */}
          <div className="lg:col-span-7 space-y-8">
            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-[#042014]/10 rounded-[2rem] p-8 md:p-10 shadow-[0_15px_50px_rgba(4,32,20,0.015)]"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#042014] tracking-tight flex items-center gap-2">
                  <Activity className="w-6 h-6 text-emerald-700" />
                  Book an Appointment
                </h2>
                <p className="text-xs text-gray-400 font-semibold mt-1">
                  Fill out the secure clinic intake form below to request your slot.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 hover:border-[#042014]/30 focus:border-[#042014] focus:ring-4 focus:ring-[#042014]/5 rounded-xl font-medium transition-all text-sm text-[#042014] placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-white border border-gray-200 hover:border-[#042014]/30 focus:border-[#042014] focus:ring-4 focus:ring-[#042014]/5 rounded-xl font-medium transition-all text-sm text-[#042014] placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 bg-white border border-gray-200 hover:border-[#042014]/30 focus:border-[#042014] focus:ring-4 focus:ring-[#042014]/5 rounded-xl font-medium transition-all text-sm text-[#042014] placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <CustomSelect
                      label="Service Needed"
                      value={formData.service}
                      onChange={(val) => setFormData(prev => ({ ...prev, service: val }))}
                      options={serviceOptions}
                      placeholder="Select a service"
                    />
                  </div>
                </div>

                <div>
                  <CustomSelect
                    label="Preferred Clinic / Care Type"
                    value={formData.location}
                    onChange={(val) => setFormData(prev => ({ ...prev, location: val }))}
                    options={locationOptions}
                    placeholder="Select clinic location or home care"
                  />
                  <p className="text-[11px] text-emerald-700/80 font-semibold mt-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Location auto-detection is active to connect you to the nearest branch.</span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Describe your condition, pain locations, or recovery history..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 hover:border-[#042014]/30 focus:border-[#042014] focus:ring-4 focus:ring-[#042014]/5 rounded-xl font-medium transition-all text-sm text-[#042014] placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#042014] hover:bg-emerald-950 text-white py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-bold text-md flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                >
                  {isSubmitting ? 'Sending Request...' : 'Book Appointment Slot'}
                </button>
              </form>
            </motion.div>

            {/* Map Card - Fills the blank space below the form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white border border-[#042014]/10 rounded-[2rem] p-6 shadow-[0_15px_50px_rgba(4,32,20,0.01)] overflow-hidden h-[340px] relative"
            >
              <iframe
                src="https://maps.google.com/maps?q=The%20Applied%20Physio%2C%20Benachity%2C%20Durgapur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 rounded-2xl"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Applied Physio Google Map"
              ></iframe>
            </motion.div>
          </div>

          {/* Right Column: Cards info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Location Cards */}
            <div className="bg-[#faf8f4] border border-[#042014]/5 rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(4,32,20,0.01)]">
              <h3 className="text-xl font-semibold text-[#042014] mb-2">Our Locations</h3>
              <p className="text-xs text-gray-400 font-semibold mb-6">Four convenient locations for your recovery in Durgapur</p>

              <div className="space-y-5">

                <div className="flex items-start space-x-3.5 border-b border-gray-200/50 pb-4">
                  <div className="w-8 h-8 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#042014] leading-tight">Head Office (Benachity)</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-normal">
                      5D/23, SNP, Benachity, Near 54ft Road, Durgapur
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 border-b border-gray-200/50 pb-4">
                  <div className="w-8 h-8 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#042014] leading-tight">City Centre Clinic</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-normal">
                      OM Diagnostic, Bengal Ambuja, City Centre, Durgapur
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 border-b border-gray-200/50 pb-4">
                  <div className="w-8 h-8 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#042014] leading-tight">54ft Clinic</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-normal">
                      Bala Medicine Center, 54ft Road, Near NIT Durgapur
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 pb-2">
                  <div className="w-8 h-8 rounded-full bg-[#042014]/5 text-[#042014] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#042014] leading-tight">Benachity Clinic</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-normal">
                      New City Pharmacy, Nachan Road, Benachity, Durgapur
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Contact Methods */}
            <div className="bg-[#f4fbf7] border border-emerald-900/5 rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(4,32,20,0.01)]">
              <h3 className="text-xl font-semibold text-[#042014] mb-5">Quick Contact</h3>

              <div className="space-y-4">

                <a
                  href="tel:+919808163749"
                  className="flex items-center space-x-4 bg-white hover:bg-emerald-50/50 border border-[#042014]/5 rounded-2xl p-4 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Call Phone Support</p>
                    <p className="text-base font-semibold text-[#042014] mt-0.5">+91 98081 63749</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@appliedphysio.in"
                  className="flex items-center space-x-4 bg-white hover:bg-emerald-50/50 border border-[#042014]/5 rounded-2xl p-4 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Email Inquiry</p>
                    <p className="text-base font-semibold text-[#042014] mt-0.5">contact@appliedphysio.in</p>
                  </div>
                </a>

              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white border border-[#042014]/10 rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(4,32,20,0.01)]">
              <h3 className="text-xl font-semibold text-[#042014] mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-700" />
                Working Hours
              </h3>
              <p className="text-xs text-gray-400 font-semibold mb-6">Our clinics schedules and operational times</p>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-100 pb-3 text-sm">
                  <span className="font-semibold text-gray-500">Monday - Saturday</span>
                  <span className="font-semibold text-[#042014]">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3 text-sm">
                  <span className="font-semibold text-gray-500">Sunday</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">Appointments Only</span>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/30 border border-emerald-100/50 rounded-xl">
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    <span className="font-semibold text-[#042014]">Home Visits & Care Support:</span> Our home care teams operate 7 days a week from 7:00 AM to 9:00 PM across Durgapur.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </main>
  );
};

export default Contact;