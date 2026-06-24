import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
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
  },
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
    <div className="py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 sm:py-5 flex items-center justify-between text-left transition-colors group"
      >
        <span className={`text-sm sm:text-base font-semibold text-[#042014] leading-snug group-hover:text-green-700 transition-colors ${isOpen ? 'text-green-700' : ''}`}>
          {item.q}
        </span>
        <div className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 flex-shrink-0 ml-4 ${isOpen ? 'bg-green-50 text-green-700 rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-[#042014]/5 group-hover:text-[#042014]'}`}>
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        </div>
      </button>
      
      <div
        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-sm text-gray-500 font-medium leading-relaxed pr-8">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#fbfaf7] relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-[-10%] w-96 h-96 bg-green-500/[0.01] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-96 h-96 bg-emerald-500/[0.01] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1500px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase mb-5 border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
            <span>Common Queries</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-[#042014] mb-4 leading-none tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base font-semibold text-gray-500 max-w-xl mx-auto leading-relaxed mt-2">
            Providing clear answers about clinical processes, home care details, and booking procedures.
          </p>
        </div>

        {/* Minimal Accordion List */}
        <div className="max-w-3xl mx-auto divide-y divide-[#042014]/10 border-y border-[#042014]/10">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} item={faq} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
