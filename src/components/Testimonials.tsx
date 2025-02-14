import { Star, Quote, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    text: "The treatment I received was exceptional. The therapists are highly skilled and caring. My recovery has been remarkable!",
    author: "Sujoy Das",
    role: "Sports Enthusiast",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
  {
    text: "Best physiotherapy experience! The personalized attention and modern treatment techniques made a huge difference.",
    author: "Neha Jaiswal",
    role: "Corporate Professional",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    text: "Professional, knowledgeable, and effective. I'm back to my active lifestyle thanks to Applied Physio!",
    author: "Mainak Majumder",
    role: "Athlete",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  }
];

const Testimonials = () => {
  const handleShare = async (testimonial: typeof testimonials[0]) => {
    const shareData = {
      title: 'Patient Testimonial - The Applied Physio',
      text: `"${testimonial.text}" - ${testimonial.author}, ${testimonial.role}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
        alert('Testimonial copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">What Our Patients Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real patients who have experienced the difference of expert care
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>

              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-green-600">{testimonial.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleShare(testimonial)}
                  className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                  aria-label="Share testimonial"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-green-100 rounded-full opacity-20 z-0"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;