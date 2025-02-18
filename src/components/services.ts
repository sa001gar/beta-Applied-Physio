import { Activity, Dumbbell, Brain, Users, Heart, Stethoscope } from 'lucide-react';

export const services = [
  {
    id: 'physiotherapy',
    title: 'Physiotherapy',
    description: 'Comprehensive physical therapy for various conditions and injuries',
    icon: Activity
  },
  {
    id: 'sports-rehab',
    title: 'Sports Rehabilitation',
    description: 'Specialized rehabilitation for athletes and sports-related injuries',
    icon: Dumbbell
  },
  {
    id: 'neuro-rehab',
    title: 'Neurological Rehabilitation',
    description: 'Treatment for neurological conditions and recovery',
    icon: Brain
  },
  {
    id: 'geriatric-care',
    title: 'Geriatric Care',
    description: 'Specialized care for elderly patients',
    icon: Users
  },
  {
    id: 'cardiac-rehab',
    title: 'Cardiac Rehabilitation',
    description: 'Recovery and rehabilitation for heart patients',
    icon: Heart
  },
  {
    id: 'orthopedic-care',
    title: 'Orthopedic Care',
    description: 'Treatment for musculoskeletal conditions and injuries',
    icon: Stethoscope
  }
];

export const locations = [
  {
    id: 'main-clinic',
    name: 'Main Clinic - Benachity',
    address: '5D/23, SNP, Benachity, Near 54ft Road, Durgapur',
    phone: '+91 98001 63749'
  },
  {
    id: 'branch-office',
    name: 'Branch Office - Near NIT',
    address: 'Bala Medicine Center, 54ft Road, Near NIT Durgapur',
    phone: '+91 95635 91505'
  }
];

export const workingHours = {
  weekdays: '9:00 AM - 6:00 PM',
  saturday: '10:00 AM - 4:00 PM',
  sunday: 'Closed'
};