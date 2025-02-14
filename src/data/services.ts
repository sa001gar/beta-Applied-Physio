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
    image: 'https://img.freepik.com/premium-photo/chiropractor-assisting-senior-patient_482257-77377.jpg?w=826'
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
    image: 'https://img.freepik.com/premium-photo/orthopedist-showing-spine-model-patient-hospital_179755-8378.jpg?uid=R124957424&ga=GA1.1.689373160.1737052406&semt=ais_incoming'
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
    image: 'https://img.freepik.com/free-photo/doctor-helping-patient-rehabilitation_23-2150321598.jpg?semt=ais_hybrid'
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
    image: 'https://img.freepik.com/free-photo/middle-aged-hispanic-business-people_23-2151099221.jpg?uid=R124957424&ga=GA1.1.689373160.1737052406&semt=ais_incoming'
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
    image: 'https://img.freepik.com/free-photo/doctor-helping-patient-rehabilitation_23-2150321561.jpg?semt=ais_hybrid'
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
    image: 'https://img.freepik.com/free-photo/medium-shot-doctor-weighing-baby_23-2148231346.jpg?semt=ais_hybrid'
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
    image: 'https://img.freepik.com/premium-photo/adult-hipster-son-senior-father-spend-time-together-home-talking-take-care-father_35752-3072.jpg?semt=ais_hybrid'
  },
  // {
  //   id: 'cardio',
  //   icon: Stethoscope,
  //   title: 'Cardiopulmonary Rehabilitation',
  //   description: 'Specialized programs for heart and lung conditions.',
  //   color: 'text-teal-600',
  //   featured: false,
  //   fullDescription: 'Comprehensive rehabilitation for patients with heart and lung conditions.',
  //   benefits: [
  //     'Improved cardiovascular fitness',
  //     'Better breathing capacity',
  //     'Enhanced energy levels',
  //     'Lifestyle modification support'
  //   ],
  //   image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80'
  // }
];