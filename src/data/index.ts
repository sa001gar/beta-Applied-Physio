import { Facebook, Youtube, Instagram, Linkedin, Space as Spa, Dumbbell, Heart, Activity, Brain, UserCog, Stethoscope, Baby, UserPlus } from 'lucide-react';

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
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    date: 'March 15, 2025',
    readTime: '5 min read',
    category: 'Education',
    tags: ['Physiotherapy', 'Healthcare', 'Wellness'],
    author: {
      name: 'Dr. John Doe',
      role: 'Senior Physiotherapist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
    }
  },
  {
    id: '2',
    title: 'Common Sports Injuries and Their Treatment',
    excerpt: 'Discover the most frequent sports injuries and learn about effective treatment methods.',
    content: 'Sports injuries can occur during athletic activities or exercise. They can result from accidents, poor training practices, improper equipment, or inadequate warm-up and stretching.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80',
    date: 'March 10, 2025',
    readTime: '7 min read',
    category: 'Sports',
    tags: ['Sports Injury', 'Recovery', 'Treatment'],
    author: {
      name: 'Dr. Sarah Smith',
      role: 'Sports Physiotherapist',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80'
    }
  }
];

export const socialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'Instagram',
    content: 'Transform your life with expert physiotherapy. Book your session today! 💪 #Physiotherapy #Wellness',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    likes: 245,
    comments: 18,
    date: '2h ago',
    link: '#'
  },
  {
    id: '2',
    platform: 'Facebook',
    content: 'Join our upcoming workshop on preventing sports injuries! Limited spots available.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80',
    likes: 189,
    comments: 24,
    date: '5h ago',
    link: '#'
  }
];

export const services = [
  {
    id: 'manual-therapy',
    icon: Activity,
    title: 'Manual Therapy',
    description: 'Expert hands-on treatment to relieve pain and improve mobility.',
    color: 'text-green-700',
    featured: true,
    fullDescription: 'Our manual therapy combines various hands-on techniques to treat musculoskeletal pain and disability. This includes joint mobilization, manipulation, and soft tissue techniques.',
    benefits: [
      'Pain relief and management',
      'Improved joint mobility',
      'Enhanced muscle function',
      'Better posture and alignment'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80'
  },
  {
    id: 'sports-rehab',
    icon: Dumbbell,
    title: 'Sports Rehabilitation',
    description: 'Specialized recovery programs for athletes and sports enthusiasts.',
    color: 'text-yellow-600',
    featured: true,
    fullDescription: 'Comprehensive rehabilitation programs designed specifically for athletes and sports-related injuries. We focus on getting you back to peak performance safely.',
    benefits: [
      'Injury prevention strategies',
      'Performance enhancement',
      'Sport-specific training',
      'Quick return to sport'
    ],
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80'
  },
  {
    id: 'neuro-physio',
    icon: Brain,
    title: 'Neurological Physiotherapy',
    description: 'Specialized care for neurological conditions and recovery.',
    color: 'text-purple-600',
    featured: true,
    fullDescription: 'Expert care for patients with neurological conditions, focusing on improving function, mobility, and quality of life.',
    benefits: [
      'Improved balance and coordination',
      'Enhanced mobility',
      'Better daily function',
      'Increased independence'
    ],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80'
  },
  {
    id: 'cardio-rehab',
    icon: Heart,
    title: 'Cardiopulmonary Rehabilitation',
    description: 'Specialized programs for heart and lung conditions.',
    color: 'text-red-600',
    featured: false,
    fullDescription: 'Comprehensive rehabilitation for patients with heart and lung conditions, focusing on improving endurance and quality of life.',
    benefits: [
      'Improved cardiovascular fitness',
      'Better breathing capacity',
      'Enhanced energy levels',
      'Lifestyle modification support'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80'
  },
  {
    id: 'ergonomic-care',
    icon: UserCog,
    title: 'Ergonomic Care',
    description: 'Workplace wellness and ergonomic assessments.',
    color: 'text-blue-600',
    featured: false,
    fullDescription: 'Professional workplace assessments and recommendations to prevent injuries and improve productivity.',
    benefits: [
      'Workplace injury prevention',
      'Improved posture',
      'Enhanced productivity',
      'Reduced workplace strain'
    ],
    image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80'
  },
  {
    id: 'geriatric-care',
    icon: UserPlus,
    title: 'Geriatric Physiotherapy',
    description: 'Specialized care for elderly patients.',
    color: 'text-orange-600',
    featured: false,
    fullDescription: 'Gentle and effective physiotherapy treatments designed specifically for elderly patients.',
    benefits: [
      'Improved balance',
      'Fall prevention',
      'Enhanced mobility',
      'Better quality of life'
    ],
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80'
  },
  {
    id: 'pediatric-physio',
    icon: Baby,
    title: 'Pediatric Physiotherapy',
    description: 'Specialized care for children and infants.',
    color: 'text-pink-600',
    featured: false,
    fullDescription: 'Child-friendly physiotherapy services focusing on development and rehabilitation.',
    benefits: [
      'Motor development support',
      'Developmental milestone achievement',
      'Play-based therapy',
      'Parent education'
    ],
    image: 'https://images.unsplash.com/photo-1577744168855-0391d2ed2b3a?auto=format&fit=crop&q=80'
  },
  {
    id: 'post-surgery',
    icon: Stethoscope,
    title: 'Post-Surgical Rehabilitation',
    description: 'Comprehensive recovery programs after surgery.',
    color: 'text-teal-600',
    featured: false,
    fullDescription: 'Specialized rehabilitation programs to ensure optimal recovery after surgical procedures.',
    benefits: [
      'Faster recovery',
      'Pain management',
      'Restored function',
      'Prevented complications'
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80'
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Chandra Sekhar Mukherjee",
    role: "Founder & Ergonomic Care Advisor",
    description: "Specializing in ergonomic care advisory with over 5+ years of experience.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80",
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