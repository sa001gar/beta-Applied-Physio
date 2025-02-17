import { Heart, Award, Users, Linkedin, Instagram, Facebook, Youtube, Star, CheckCircle } from 'lucide-react';
import { teamMembers } from '../data';

const stats = [
  { value: "7000+", label: "Patients Treated", icon: Users },
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "98%", label: "Success Rate", icon: Star },
  { value: "24/7", label: "Support", icon: Heart }
];

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "We prioritize your unique needs and goals, creating personalized treatment plans that work for you."
  },
  {
    icon: Award,
    title: "Excellence in Service",
    description: "Our commitment to providing the highest quality physiotherapy care sets us apart."
  },
  {
    icon: CheckCircle,
    title: "Proven Results",
    description: "We measure our success by your progress and satisfaction with our services."
  }
];

const About = () => {
  return (
    <main className="pt-32">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-green-800 mb-6">
              Transforming Lives Through Expert Care
            </h1>
            <p className="text-xl text-gray-600">
              At Applied Physio, we're dedicated to helping you achieve optimal physical health through
              expert care and personalized treatment plans.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <p className="text-4xl font-bold text-green-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              These principles guide everything we do at Applied Physio
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-6">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-6">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">
              Our experienced professionals are dedicated to your recovery and well-being
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-center space-x-4">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="text-white hover:text-yellow-300">
                            <Linkedin className="w-6 h-6" />
                          </a>
                        )}
                        {member.social.instagram && (
                          <a href={member.social.instagram} className="text-white hover:text-yellow-300">
                            <Instagram className="w-6 h-6" />
                          </a>
                        )}
                        {member.social.facebook && (
                          <a href={member.social.facebook} className="text-white hover:text-yellow-300">
                            <Facebook className="w-6 h-6" />
                          </a>
                        )}
                        {member.social.youtube && (
                          <a href={member.social.youtube} className="text-white hover:text-yellow-300">
                            <Youtube className="w-6 h-6" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;