import { Facebook, Youtube, Instagram, Linkedin, Space as Spa, Dumbbell, Heart, Activity, Brain, UserCog, Stethoscope, Baby, UserPlus } from 'lucide-react';
import { services } from './services';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    image: string;
  };
}

export interface SocialPost {
  id: string;
  platform: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  date: string;
  link: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  social: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Physiotherapy: A Comprehensive Guide',
    excerpt: 'Learn about the fundamentals of physiotherapy and how it can help improve your quality of life.',
    content: 'Physiotherapy is a healthcare profession that focuses on helping people affected by injury, illness or disability through movement and exercise, manual therapy, education and advice.',
    image: 'https://img.freepik.com/premium-vector/character-flat-drawing-isometric-doctor-physiotherapist-helping-male-patient-using-leg-prosthesis-take-first-step-physical-therapy-people-with-disabilities-cartoon-design-vector-illustration_620206-4827.jpg?w=826',
    date: 'March 15, 2025',
    readTime: '5 min read',
    category: 'Education',
    tags: ['Physiotherapy', 'Healthcare', 'Wellness'],
    author: {
      name: 'Dr. Chandra Sekhar Mukherjee',
      role: 'Senior Physiotherapy Consultant',
      image: 'https://github.com/sa001gar/beta-Applied-Physio/blob/main/images/chandra_sekhar_mukherjee.png?raw=true'
    }
  },
  {
    id: '2',
    title: 'Common Sports Injuries and Their Treatment',
    excerpt: 'Discover the most frequent sports injuries and learn about effective treatment methods.',
    content: 'Sports injuries can occur during athletic activities or exercise. They can result from accidents, poor training practices, improper equipment, or inadequate warm-up and stretching.',
    image: 'https://img.freepik.com/free-vector/foot-pain-concept-illustration_114360-21592.jpg?t=st=1739558320~exp=1739561920~hmac=54b45379898f70500e090f61c0d72f2a7b0bee35967940b52441e4d966dade77&w=740',
    date: 'March 10, 2025',
    readTime: '7 min read',
    category: 'Sports',
    tags: ['Sports Injury', 'Recovery', 'Treatment'],
    author: {
      name: 'Dr. Chandra Sekhar Mukherjee',
      role: 'Sports Physiotherapist',
      image: 'https://github.com/sa001gar/beta-Applied-Physio/blob/main/images/chandra_sekhar_mukherjee.png?raw=true'
    }
  }
];

export const socialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'Instagram',
    content: 'Transform your life with expert physiotherapy. Book your session today! 💪 #Physiotherapy #Wellness',
    image: 'https://img.freepik.com/free-photo/physical-therapist-assisting-young-caucasian-woman-with-exercise_1139-1244.jpg?t=st=1739558769~exp=1739562369~hmac=9712553c35d2c653526643220f61d83bc4a86e7caf81eeafb93863b6bebf65d5&w=826',
    likes: 245,
    comments: 18,
    date: '2h ago',
    link: '#'
  },
  {
    id: '2',
    platform: 'Facebook',
    content: 'Join our upcoming workshop on preventing sports injuries! Limited spots available.',
    image: 'https://img.freepik.com/free-photo/young-annoyed-caucasian-sporty-woman-wearing-headband-wristbands-holds-hand-orange-with-copy-space_141793-62592.jpg?t=st=1739558820~exp=1739562420~hmac=216b69916c9352e41a75c589738493434d8f10ee954d019c7cb46b3b5674b422&w=740',
    likes: 189,
    comments: 24,
    date: '5h ago',
    link: '#'
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Chandra Sekhar Mukherjee",
    role: "Founder & Ergonomic Care Advisor",
    description: "Specializing in ergonomic care advisory with over 5+ years of experience.",
    image: "/images/chandra_sekhar_mukherjee.png",
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#"
    }
  },
  {
    name: "Dr. S.N. Modak",
    role: "Senior Physiotherapist",
    description: "BPT, MPT (Ortho), MIAP (Physio), P.W. Hemophelia from CMC (Vellor).",
    image: "/images/doctor.jpeg",
    social: {
      linkedin: "#",
      youtube: "#"
    }
  }
];

export const socialLinks = [
  {
    platform: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    link: 'https://facebook.com/theappliedphysio'
  },
  {
    platform: 'Instagram',
    icon: Instagram,
    color: 'bg-pink-600',
    link: 'https://instagram.com/theappliedphysio'
  },
  {
    platform: 'Youtube',
    icon: Youtube,
    color: 'bg-red-600',
    link: 'https://youtube.com/theappliedphysio'
  },
  {
    platform: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700',
    link: 'https://linkedin.com/company/theappliedphysio'
  }
];

export { services };