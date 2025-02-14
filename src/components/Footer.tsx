import { Facebook, Youtube, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { socialLinks } from '../data';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
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
          email,
          subject: 'New Newsletter Subscription',
          from_name: 'Applied Physio Website Newsletter'
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubscriptionStatus('success');
        setEmail('');
      } else {
        setSubscriptionStatus('error');
      }
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-green-900 to-green-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-white">
              Applied Physio
            </Link>
            <p className="text-gray-300">
              Professional physiotherapy services for better health and wellness.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300 transition-colors"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'About', 'Contact', 'Blog'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-yellow-300 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Our Services</h4>
            <ul className="space-y-2">
              {[
                'Manual Therapy',
                'Sports Rehabilitation',
                'Physical Therapy',
                'Ergonomic Care',
                'Pain Management'
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-yellow-300 transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-300 mt-1" />
                <span className="text-gray-300">
                  5D/23, SNP, Benachity, Near 54ft Road, Durgapur
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-300" />
                <span className="text-gray-300">+91 98001 63749</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-300" />
                <span className="text-gray-300">contact@appliedphysio.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-green-700 pt-8 pb-4">
          <div className="max-w-2xl mx-auto text-center">
            <h5 className="text-2xl font-semibold mb-4">Stay Updated with Health Tips</h5>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for expert advice, health tips, and exclusive updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-green-800 border border-green-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
                {subscriptionStatus === 'success' && (
                  <p className="text-green-300 text-sm mt-2">Successfully subscribed!</p>
                )}
                {subscriptionStatus === 'error' && (
                  <p className="text-red-300 text-sm mt-2">Something went wrong. Please try again.</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-yellow-500 text-green-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-green-700 mt-8">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Applied Physio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;