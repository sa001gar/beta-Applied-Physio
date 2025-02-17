import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'assistant';
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

const services = [
  'Manual Therapy',
  'Sports Rehabilitation',
  'Physical Therapy',
  'Ergonomic Care'
];

const locations = [
  'Main Clinic - Benachity',
  'Branch Office - Near NIT'
];

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am your Applied Physio assistant. How can I help you with your physiotherapy needs today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingForm, setBookingForm] = useState<BookingForm>(initialBookingForm);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, bookingStep]);

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
      content: "Great! Let's help you book an appointment. Please enter your name:"
    }]);
  };

  const handleBookingInput = (value: string) => {
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
        setBookingForm(prev => ({ ...prev, email: value }));
        setMessages(prev => [...prev, 
          { role: 'user', content: value },
          { role: 'assistant', content: "Please enter your phone number:" }
        ]);
        setBookingStep(2);
        break;
      case 2:
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
          content: "Thank you for booking! We'll confirm your appointment shortly via email and phone."
        }]);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but there was an error booking your appointment. Please try again or contact us directly."
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

    if (isBooking) {
      handleBookingInput(userMessage);
      return;
    }

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `You are a physiotherapy assistant chatbot for Applied Physio clinic. 
      Only answer questions related to physiotherapy, treatments, and our services. 
      If the question is not related to physiotherapy, politely decline to answer and redirect the conversation back to physiotherapy topics.
      Current conversation context: ${JSON.stringify(messages)}
      User message: ${userMessage}
      
      Keep responses concise, professional, and focused on physiotherapy.`;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => handleBookingInput(service)}
                className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 transition-colors flex items-center justify-between"
              >
                <span className="line-clamp-2">{service}</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 gap-2 mb-4">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => handleBookingInput(location)}
                className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 transition-colors flex items-center justify-between"
              >
                <span className="line-clamp-2">{location}</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute right-full mr-3 bg-white px-2 py-1 rounded-lg shadow-md text-gray-700 text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with us
        </span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed my-2 bottom-20 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-[400px] h-[550px] max-h-[calc(100vh-10rem)] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 sm:p-4 bg-green-600 text-white rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Applied Physio Assistant</h3>
                  <p className="text-xs text-green-100">Online | Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-green-100 transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 sm:p-3 rounded-2xl text-sm sm:text-base ${
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
                  <div className="bg-white text-gray-800 p-2.5 sm:p-3 rounded-2xl shadow-md rounded-tl-none flex items-center space-x-2 text-sm sm:text-base">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Booking Options */}
            {isBooking && (
              <div className="px-3 sm:px-4">
                {renderBookingOptions()}
              </div>
            )}

            {/* Quick Replies (only show if not booking) */}
            {!isBooking && (
              <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleQuickReply("I'd like to book an appointment")}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 text-green-700 rounded-full text-xs sm:text-sm hover:bg-green-100 transition-colors"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => handleQuickReply("What services do you offer?")}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 text-green-700 rounded-full text-xs sm:text-sm hover:bg-green-100 transition-colors"
                  >
                    Our Services
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={isBooking ? "Type your response..." : "Type your message..."}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none h-[50px] sm:h-[60px] transition-all duration-200"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={isLoading || !inputMessage.trim()}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-1"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;