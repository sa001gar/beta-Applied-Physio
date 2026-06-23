import { Activity, Brain, Dumbbell, Heart, UserCog, Baby, UserPlus, Home, Users, Sparkles } from 'lucide-react';

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

export const services: Service[] = [
  {
    id: 'manual',
    icon: Heart,
    title: 'Manual Therapy',
    description: 'Hands-on techniques for pain relief.',
    color: 'text-red-600',
    featured: true,
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
    id: 'orthopaedic',
    icon: Activity,
    title: 'Orthopedic Physiotherapy',
    description: 'Joints, bones & muscle rehabilitation.',
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
    id: 'sports',
    icon: Dumbbell,
    title: 'Sports Rehabilitation',
    description: 'Injury recovery & performance enhancement.',
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
    id: 'neurological',
    icon: Brain,
    title: 'Neurological Physiotherapy',
    description: 'Stroke, Parkinson\'s & nerve conditions.',
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
    id: 'pediatric',
    icon: Baby,
    title: 'Pediatric Physiotherapy',
    description: 'Special care for children.',
    color: 'text-pink-600',
    featured: true,
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
    description: 'Elderly care for better mobility.',
    color: 'text-orange-600',
    featured: true,
    fullDescription: 'Gentle and effective physiotherapy treatments designed specifically for elderly patients.',
    benefits: [
      'Improved balance',
      'Fall prevention',
      'Enhanced mobility',
      'Better quality of life'
    ],
    image: 'https://img.freepik.com/premium-photo/adult-hipster-son-senior-father-spend-time-together-home-talking-take-care-father_35752-3072.jpg?semt=ais_hybrid'
  },
  {
    id: 'post-surgical',
    icon: UserCog,
    title: 'Post Surgical Rehabilitation',
    description: 'Faster recovery after surgery.',
    color: 'text-teal-600',
    featured: true,
    fullDescription: 'Tailored rehabilitation plans to help you regain range of motion, strength, and function after orthopedic or general surgeries.',
    benefits: [
      'Reduced post-surgical swelling',
      'Restored joint movement',
      'Prevention of scar tissue stiffness',
      'Rebuilt muscle strength'
    ],
    image: 'https://img.freepik.com/free-photo/doctor-helping-patient-rehabilitation_23-2150321561.jpg?semt=ais_hybrid'
  },
  {
    id: 'dry-needling',
    icon: Activity,
    title: 'Dry Needling',
    description: 'Trigger point release technique.',
    color: 'text-blue-500',
    featured: true,
    fullDescription: 'A modern, science-guided treatment using fine needles to release muscular trigger points and relieve deep-seated pain.',
    benefits: [
      'Fast relief for chronic muscle tightness',
      'Improved local blood flow',
      'Released trigger points',
      'Enhanced recovery for athletes'
    ],
    image: 'https://img.freepik.com/free-photo/physical-therapist-assisting-young-caucasian-woman-with-exercise_1139-1244.jpg?t=st=1739558769~exp=1739562369~hmac=9712553c35d2c653526643220f61d83bc4a86e7caf81eeafb93863b6bebf65d5&w=826'
  },
  {
    id: 'electrotherapy',
    icon: Sparkles,
    title: 'Electrotherapy',
    description: 'Ultrasound, TENS & advanced modalities.',
    color: 'text-yellow-600',
    featured: true,
    fullDescription: 'Advanced electrotherapy solutions including TENS, ultrasound, and electrical muscle stimulation to manage pain and accelerate tissue healing.',
    benefits: [
      'Non-invasive pain block',
      'Accelerated tissue regeneration',
      'Reduced inflammatory response',
      'Muscle spasm relief'
    ],
    image: 'https://img.freepik.com/free-photo/young-annoyed-caucasian-sporty-woman-wearing-headband-wristbands-holds-hand-orange-with-copy-space_141793-62592.jpg?t=st=1739558820~exp=1739562420~hmac=216b69916c9352e41a75c589738493434d8f10ee954d019c7cb46b3b5674b422&w=740'
  },
  {
    id: 'posture',
    icon: UserCog,
    title: 'Posture Correction',
    description: 'Improve posture & prevent pain.',
    color: 'text-emerald-600',
    featured: true,
    fullDescription: 'Biomechanical evaluations and custom corrective exercises designed to resolve postural imbalances caused by modern sedentary desk work.',
    benefits: [
      'Relief for desk-job back and neck strain',
      'Rebalanced spinal alignment',
      'Increased thoracic mobility',
      'Improved ergonomics awareness'
    ],
    image: 'https://img.freepik.com/free-photo/middle-aged-hispanic-business-people_23-2151099221.jpg?uid=R124957424&ga=GA1.1.689373160.1737052406&semt=ais_incoming'
  },
  {
    id: 'home-physio',
    icon: Home,
    title: 'Home Physiotherapy',
    description: 'Care in the comfort of your home.',
    color: 'text-indigo-600',
    featured: true,
    fullDescription: 'Professional clinical physiotherapy brought directly to your home, perfect for post-stroke, geriatric, or post-surgical recovery.',
    benefits: [
      'Convenient healing at home',
      'Eliminated travel discomfort',
      'One-on-one focused attention',
      'Customized home safety advice'
    ],
    image: 'https://img.freepik.com/premium-photo/adult-hipster-son-senior-father-spend-time-together-home-talking-take-care-father_35752-3072.jpg?semt=ais_hybrid'
  },
  {
    id: 'corporate',
    icon: Users,
    title: 'Corporate Physiotherapy',
    description: 'Workplace wellness & injury prevention.',
    color: 'text-slate-600',
    featured: true,
    fullDescription: 'On-site corporate wellness evaluations, ergonomic setups, and stress management seminars to reduce workplace strain.',
    benefits: [
      'Reduced repetitive strain injuries',
      'Decreased work-absentee rates',
      'Enhanced physical energy at work',
      'Improved posture habits'
    ],
    image: 'https://img.freepik.com/free-photo/middle-aged-hispanic-business-people_23-2151099221.jpg?uid=R124957424&ga=GA1.1.689373160.1737052406&semt=ais_incoming'
  }
];