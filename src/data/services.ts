import { Activity, Brain, Dumbbell, Heart, UserCog, Stethoscope, Baby, UserPlus } from 'lucide-react';

export interface Service {
  id: string;
  icon: any;
  title: string;
  description: string;
  color: string;
  featured: boolean;
  fullDescription: string;
  benefits: string[];
  image: string;
}

export const services = [
  {
    id: 'orthopaedic',
    icon: Activity,
    title: 'Orthopaedic Physiotherapy',
    description: 'Specialized care for musculoskeletal conditions and injuries.',
    color: 'text-blue-600',
    featured: true,
    fullDescription: 'Our orthopaedic physiotherapy service provides expert care for all musculoskeletal conditions, including joint pain, sports injuries, and post-surgical rehabilitation.',
    benefits: [
      'Pain reduction and management',
      'Improved joint mobility',
      'Enhanced physical function',
      'Faster recovery from injuries'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80'
  },
  {
    id: 'neurological',
    icon: Brain,
    title: 'Neurological Physiotherapy',
    description: 'Focused care for neurological disorders and recovery.',
    color: 'text-purple-600',
    featured: true,
    fullDescription: 'Specialized physiotherapy for neurological conditions including stroke, multiple sclerosis, and Parkinson\'s disease.',
    benefits: [
      'Improved balance and coordination',
      'Enhanced mobility',
      'Better daily function',
      'Increased independence'
    ],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80'
  },
  {
    id: 'sports',
    icon: Dumbbell,
    title: 'Sports Rehabilitation',
    description: 'Customized recovery plans for athletes.',
    color: 'text-green-600',
    featured: true,
    fullDescription: 'Comprehensive sports rehabilitation programs designed to help athletes recover from injuries and return to peak performance.',
    benefits: [
      'Faster return to sport',
      'Injury prevention',
      'Performance enhancement',
      'Sport-specific training'
    ],
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80'
  },
  {
    id: 'ergonomic',
    icon: UserCog,
    title: 'Ergonomic Care',
    description: 'Ensuring safe and efficient work environments.',
    color: 'text-yellow-600',
    featured: false,
    fullDescription: 'Professional workplace assessments and ergonomic solutions to prevent injuries and improve productivity.',
    benefits: [
      'Workplace injury prevention',
      'Improved posture',
      'Enhanced productivity',
      'Reduced workplace strain'
    ],
    image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80'
  },
  {
    id: 'manual',
    icon: Heart,
    title: 'Manual Therapy',
    description: 'Hands-on treatment to relieve pain and restore function.',
    color: 'text-red-600',
    featured: false,
    fullDescription: 'Expert hands-on techniques to treat musculoskeletal pain and improve mobility.',
    benefits: [
      'Pain relief',
      'Improved joint mobility',
      'Better muscle function',
      'Enhanced recovery'
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80'
  },
  {
    id: 'pediatric',
    icon: Baby,
    title: 'Pediatric Physiotherapy',
    description: 'Caring support for children\'s physical development.',
    color: 'text-pink-600',
    featured: false,
    fullDescription: 'Specialized physiotherapy services for children, focusing on development and rehabilitation.',
    benefits: [
      'Motor development support',
      'Developmental milestone achievement',
      'Play-based therapy',
      'Parent education'
    ],
    image: 'https://images.unsplash.com/photo-1577744168855-0391d2ed2b3a?auto=format&fit=crop&q=80'
  },
  {
    id: 'geriatric',
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
    id: 'cardio',
    icon: Stethoscope,
    title: 'Cardiopulmonary Rehabilitation',
    description: 'Specialized programs for heart and lung conditions.',
    color: 'text-teal-600',
    featured: false,
    fullDescription: 'Comprehensive rehabilitation for patients with heart and lung conditions.',
    benefits: [
      'Improved cardiovascular fitness',
      'Better breathing capacity',
      'Enhanced energy levels',
      'Lifestyle modification support'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80'
  }
];