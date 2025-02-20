import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, ChevronRight, LogOut, MapPin, Clock, Activity, Dumbbell, Brain, Users, Heart, Stethoscope  } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';



export const services = [
  {
    id: 'physiotherapy',
    title: 'Physiotherapy',
    description: 'Comprehensive physical therapy for various conditions and injuries',
    icon: Activity
  },
  {
    id: 'sports-rehab',
    title: 'Sports Rehabilitation',
    description: 'Specialized rehabilitation for athletes and sports-related injuries',
    icon: Dumbbell
  },
  {
    id: 'neuro-rehab',
    title: 'Neurological Rehabilitation',
    description: 'Treatment for neurological conditions and recovery',
    icon: Brain
  },
  {
    id: 'geriatric-care',
    title: 'Geriatric Care',
    description: 'Specialized care for elderly patients',
    icon: Users
  },
  {
    id: 'cardiac-rehab',
    title: 'Cardiac Rehabilitation',
    description: 'Recovery and rehabilitation for heart patients',
    icon: Heart
  },
  {
    id: 'orthopedic-care',
    title: 'Orthopedic Care',
    description: 'Treatment for musculoskeletal conditions and injuries',
    icon: Stethoscope
  }
];

export const locations = [
  {
    id: 'main-clinic',
    name: 'Main Clinic - Benachity',
    address: '5D/23, SNP, Benachity, Near 54ft Road, Durgapur',
    phone: '+91 98001 63749'
  },
  {
    id: 'branch-office',
    name: 'Branch Office - Near NIT',
    address: 'Bala Medicine Center, 54ft Road, Near NIT Durgapur',
    phone: '+91 95635 91505'
  }
];

export const workingHours = {
  weekdays: '9:00 AM - 6:00 PM',
  saturday: '10:00 AM - 4:00 PM',
  sunday: 'Closed'
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  message: string;
}

const initialBookingForm: BookingForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  location: '',
  message: ''
};

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hello! I'm your Applied Physio assistant. How can I help you today? You can ask me about our services, book appointments, or get information about physiotherapy. Type 'quit' at any time to end our conversation."
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingForm, setBookingForm] = useState<BookingForm>(initialBookingForm);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const validateEmail = (email: string): boolean => {
    // More strict email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }

    // Additional validation checks
    const [localPart, domain] = email.split('@');
    
    // Check local part length (max 64 characters)
    if (localPart.length > 64) {
      return false;
    }

    // Check domain length (max 255 characters)
    if (domain.length > 255) {
      return false;
    }

    // Check if domain has at least one dot and valid TLD
    const domainParts = domain.split('.');
    if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleFocus = () => setIsKeyboardVisible(true);
      const handleBlur = () => setIsKeyboardVisible(false);
      
      inputRef.current?.addEventListener('focus', handleFocus);
      inputRef.current?.addEventListener('blur', handleBlur);
      
      return () => {
        inputRef.current?.removeEventListener('focus', handleFocus);
        inputRef.current?.removeEventListener('blur', handleBlur);
      };
    }
  }, [isMobile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, bookingStep]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isMobile && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen]);

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "👋 Hello! I'm your Applied Physio assistant. How can I help you today? You can ask me about our services, book appointments, or get information about physiotherapy. Type 'quit' at any time to end our conversation."
      }
    ]);
    setIsBooking(false);
    setBookingStep(0);
    setBookingForm(initialBookingForm);
    setInputMessage('');
  };

  const handleQuickReply = async (question: string) => {
    if (question.toLowerCase().includes('book')) {
      startBooking();
    } else {
      setInputMessage(question);
      await handleSend(question);
    }
  };

  const startBooking = () => {
    setIsBooking(true);
    setBookingStep(0);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "Let's help you book an appointment. Please enter your name:"
    }]);
  };

  const handleBookingInput = (value: string) => {
    if (value.toLowerCase() === 'quit') {
      handleQuit();
      return;
    }

    switch (bookingStep) {
      case 0:
        setBookingForm(prev => ({ ...prev, name: value }));
        setMessages(prev => [...prev, 
          { role: 'user', content: value },
          { role: 'assistant', content: "Please enter your email address:" }
        ]);
        setBookingStep(1);
        break;
      case 1:
        if (!validateEmail(value)) {
          setMessages(prev => [...prev,
            { role: 'assistant', content: "Please enter a valid email address (e.g., name@example.com). The email should have a proper domain name with at least two characters after the dot." }
          ]);
          return;
        }
        setBookingForm(prev => ({ ...prev, email: value }));
        setMessages(prev => [...prev, 
          { role: 'user', content: value },
          { role: 'assistant', content: "Please enter your phone number:" }
        ]);
        setBookingStep(2);
        break;
      case 2:
        if (!/^\d{10}$/.test(value)) {
          setMessages(prev => [...prev,
            { role: 'assistant', content: "Please enter a valid 10-digit phone number." }
          ]);
          return;
        }
        setBookingForm(prev => ({ ...prev, phone: value }));
        setMessages(prev => [...prev, 
          { role: 'user', content: value },
          { role: 'assistant', content: "Please select a service:" }
        ]);
        setBookingStep(3);
        break;
      case 3:
        setBookingForm(prev => ({ ...prev, service: value }));
        setMessages(prev => [...prev, 
          { role: 'user', content: value },
          { role: 'assistant', content: "Please select your preferred location:" }
        ]);
        setBookingStep(4);
        break;
      case 4:
        setBookingForm(prev => ({ ...prev, location: value }));
        setMessages(prev => [...prev, 
          { role: 'user', content: value },
          { role: 'assistant', content: "Please enter any additional message or specific requirements:" }
        ]);
        setBookingStep(5);
        break;
      case 5:
        setBookingForm(prev => ({ ...prev, message: value }));
        handleFinalBooking({ ...bookingForm, message: value });
        break;
    }
    setInputMessage('');
  };

  const handleQuit = () => {
    setMessages(prev => [...prev,
      { role: 'user', content: 'quit' },
      { role: 'assistant', content: "Thank you for chatting with me. If you need assistance later, feel free to return. Have a great day! 👋" }
    ]);
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(resetChat, 500);
    }, 2000);
  };

  const handleFinalBooking = async (form: BookingForm) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: '662ca92f-e70b-4dac-9fae-03fd5ea922f4',
          ...form,
          subject: 'New Appointment Request',
          from_name: 'Applied Physio Website Chatbot'
        })
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Thank you for booking, ${form.name}! We'll confirm your appointment shortly via email and phone. Is there anything else I can help you with?`
        }]);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but there was an error booking your appointment. Please try again or contact us directly at +91 98001 63749."
      }]);
    } finally {
      setIsLoading(false);
      setIsBooking(false);
      setBookingStep(0);
      setBookingForm(initialBookingForm);
    }
  };

  const handleSend = async (message?: string) => {
    const userMessage = message || inputMessage.trim();
    if (!userMessage) return;

    if (userMessage.toLowerCase() === 'quit') {
      handleQuit();
      return;
    }

    if (isBooking) {
      handleBookingInput(userMessage);
      return;
    }

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const prompt = `You are a physiotherapy assistant chatbot for Applied Physio clinic. 
      Only answer questions related to physiotherapy, treatments, and our services. 
      If the question is not related to physiotherapy, politely decline to answer and redirect the conversation back to physiotherapy topics.
      Keep responses concise and professional.
      
      Available services:
      ${services.map(s => `- ${s.title}: ${s.description}`).join('\n')}
      
      Locations:
      ${locations.map(l => `- ${l.name}: ${l.address}`).join('\n')}
      
      Working Hours:
      - Monday to Friday: ${workingHours.weekdays}
      - Saturday: ${workingHours.saturday}
      - Sunday: ${workingHours.sunday}
      
      Contact:
      ${locations.map(l => `- ${l.name}: ${l.phone}`).join('\n')}
      
      Current conversation context: ${JSON.stringify(messages.slice(-5))}
      User message: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (text.toLowerCase().includes('book') || userMessage.toLowerCase().includes('book')) {
        startBooking();
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: text }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I am having trouble processing your request. Please try again or contact our clinic directly."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookingOptions = () => {
    switch (bookingStep) {
      case 3:
        return (
          <div className="grid grid-cols-1 gap-2 px-4 mb-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => handleBookingInput(service.title)}
                  className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm hover:bg-green-100 transition-colors flex items-center space-x-3 group"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{service.title}</div>
                    <div className="text-xs text-green-600">{service.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 gap-2 px-4 mb-4">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleBookingInput(location.name)}
                className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm hover:bg-green-100 transition-colors flex items-center space-x-3 group"
              >
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="font-medium">{location.name}</div>
                  <div className="text-xs text-green-600">{location.address}</div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const getInputPlaceholder = () => {
    if (isBooking) {
      switch (bookingStep) {
        case 0: return "Enter your name...";
        case 1: return "Enter your email...";
        case 2: return "Enter your phone number...";
        case 5: return "Enter any additional requirements...";
        default: return "Type your response...";
      }
    }
    return "Type your message... (or 'quit' to end conversation)";
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-white px-3 py-2 rounded-lg shadow-md text-gray-700 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with us
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={isMobile ? { y: '100%' } : { opacity: 0, y: 20 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 bg-white shadow-2xl flex flex-col
              ${isMobile 
                ? 'inset-0' 
                : 'bottom-24 right-6 w-[400px] h-[600px] max-h-[calc(100vh-8rem)] rounded-2xl overflow-hidden'}`}
          >
            <div className="flex-shrink-0 p-4 bg-green-600 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-base">Applied Physio Assistant</h3>
                  <p className="text-xs text-green-100">Online | Ready to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleQuit}
                  className="p-2 hover:bg-green-500 rounded-full transition-colors"
                  aria-label="End conversation"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-green-500 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      message.role === 'user'
                        ? 'bg-green-600 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 shadow-md rounded-tl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 p-3 rounded-2xl shadow-md rounded-tl-none flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {isBooking && (
              <div className="flex-shrink-0 max-h-[40vh] overflow-y-auto custom-scrollbar">
                {renderBookingOptions()}
              </div>
            )}

            {!isBooking && (
              <div className="flex-shrink-0 p-3 bg-white border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleQuickReply("I'd like to book an appointment")}
                    className="inline-flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                  <button
                    onClick={() => handleQuickReply("What services do you offer?")}
                    className="inline-flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Our Services</span>
                  </button>
                  <button
                    onClick={() => handleQuickReply("What are your working hours?")}
                    className="inline-flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Working Hours</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex-shrink-0 p-3 bg-white border-t border-gray-200">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={getInputPlaceholder()}
                  className="w-full px-4 py-2 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200"
                  style={{
                    height: '64px',
                    maxHeight: '120px',
                    minHeight: '64px'
                  }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !inputMessage.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-green-600 hover:text-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-green-50"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;