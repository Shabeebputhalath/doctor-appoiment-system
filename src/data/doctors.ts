export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  availableToday: boolean;
  image: string;
  location: string;
  about: string;
  patients: string;
  operations?: string;
  price: string;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    experience: '12 years',
    rating: 4.9,
    reviews: 120,
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    location: 'New York, NY',
    about: 'Dr. Michael Chen is a board-certified cardiologist with over 12 years of experience in the field of cardiovascular medicine. He specializes in interventional cardiology and has performed thousands of successful procedures. His patient-centric approach and commitment to using the latest technological advancements in heart care have earned him a reputation as one of the top specialists in the region.',
    patients: '3,700+',
    operations: '1,200+',
    price: '$120'
  },
  {
    id: '2',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Dermatologist',
    experience: '8 years',
    rating: 4.8,
    reviews: 85,
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop',
    location: 'Brooklyn, NY',
    about: 'Dr. Sarah Jenkins is a passionate dermatologist focused on medical and cosmetic skin care. She graduated from Stanford University and completed her residency at the Mayo Clinic. She believes in a holistic approach to skin health, combining medical treatments with lifestyle recommendations.',
    patients: '2,500+',
    price: '$90'
  },
  {
    id: '3',
    name: 'Dr. Robert Miller',
    specialty: 'Pediatrician',
    experience: '15 years',
    rating: 4.7,
    reviews: 210,
    availableToday: false,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2000&auto=format&fit=crop',
    location: 'Manhattan, NY',
    about: 'Dr. Robert Miller is an expert in pediatric medicine and children’s development. With over 15 years of clinical practice experience, he is known for his gentle touch and meticulous attention to detail. He specializes in newborn wellness, pediatric immunotherapy, and child psychology support.',
    patients: '4,100+',
    operations: '850+',
    price: '$75'
  },
  {
    id: '4',
    name: 'Dr. Amanda Wright',
    specialty: 'General Medicine',
    experience: '10 years',
    rating: 4.9,
    reviews: 145,
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2000&auto=format&fit=crop',
    location: 'Queens, NY',
    about: 'Dr. Amanda Wright is a family medicine specialist who provides comprehensive care for patients of all ages. She is dedicated to preventive medicine and empowers her patients to take an active role in their health management. Her clinical interests include nutrition, mental health, and chronic disease management.',
    patients: '5,000+',
    price: '$65'
  }
];
