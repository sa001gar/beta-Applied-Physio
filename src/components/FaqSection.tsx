import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const leftFaqs: FaqItem[] = [
  {
    id: 'cost',
    q: 'How much does physiotherapy cost in Durgapur?',
    a: "The cost of physiotherapy sessions in Durgapur typically ranges between ₹300 and ₹700 per session depending on the therapist's expertise, type of treatment, and clinic location. Home care visits may carry additional travel fees."
  },
  {
    id: 'sessions',
    q: 'How many physiotherapy sessions do I need?',
    a: "The number of sessions depends entirely on your specific condition, severity, and personal recovery rate. Minor issues might require only 3–5 sessions, while chronic or neurological conditions can need weeks of consistent therapy."
  },
  {
    id: 'home-visit',
    q: 'Do you provide home physiotherapy services?',
    a: "Yes, we provide specialized home visit physiotherapy sessions across Durgapur for patients who are unable to travel due to mobility issues, severe pain, or post-surgical recovery."
  }
];

const rightFaqs: FaqItem[] = [
  {
    id: 'surgery',
    q: 'Can physiotherapy help avoid surgery?',
    a: "In many cases, yes. Effective physiotherapy can strengthen muscles, improve joint stability, and restore mobility, which can resolve issues like early-stage arthritis, disc herniations, or ligament strains without surgical intervention."
  },
  {
    id: 'recovery-time',
    q: 'How long does recovery take?',
    a: "Recovery timelines vary. Soft tissue strains typically heal in 4–6 weeks, whereas complex orthopedic rehabilitations or neurological recovery can take several months of structured exercises and clinical support."
  },
  {
    id: 'referral',
    q: 'Do I need a doctor\'s referral for physiotherapy?',
    a: "No, a doctor's referral is not mandatory to receive treatment. You can schedule a direct assessment with our physiotherapists. However, if you are planning to claim medical insurance, check if your provider requires a referral."
  }
];

const AccordionItem = ({ item }: { item: FaqItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100/85 rounded-xl shadow-2xs overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-green-50/10 transition-colors"
      >
        <span className="text-xs md:text-sm font-extrabold text-gray-800 leading-snug">
          {item.q}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? 'rotate-180 text-green-600' : ''
          }`}
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-4 text-xs md:text-xs text-gray-500 font-bold leading-relaxed border-t border-gray-50 pt-2 bg-[#F9FAF9]">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = () => {
  return (
    <section className="py-16 bg-[#F9FAF9]">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px]">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-green-800 mb-3">Frequently Asked Questions</h2>
          <p className="text-sm font-bold text-gray-500 max-w-xl mx-auto">
            Providing effective physiotherapy for a wide range of conditions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            {leftFaqs.map((faq) => (
              <AccordionItem key={faq.id} item={faq} />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightFaqs.map((faq) => (
              <AccordionItem key={faq.id} item={faq} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
