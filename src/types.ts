export interface GoldRate {
  rate24k: number; // per gram in INR
  rate22k: number; // per gram in INR
  rate18k: number; // per gram in INR
  silverRate: number; // per gram in INR
  lastUpdated: string; // ISO date string
  trend: 'up' | 'down' | 'stable';
  changeAmount24k: number;
  history: Array<{
    date: string;
    rate24k: number;
    rate22k: number;
  }>;
}

export type PurposeType = 
  | 'Gold Purchase'
  | 'Wedding Jewellery'
  | 'Diamond Jewellery'
  | 'Exchange'
  | 'Repair'
  | 'Consultation'
  | 'Others';

export interface Appointment {
  id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  preferredDate: string;
  preferredTimeSlot: string;
  purpose: PurposeType;
  message?: string;
  termsAccepted: boolean;
  createdAt: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  aiConfirmationMessage?: string;
}

export interface AppointmentFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  preferredDate: string;
  preferredTimeSlot: string;
  purpose: PurposeType;
  message?: string;
  termsAccepted: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  occasion: string;
  date: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  purity: string;
  tag?: string;
}
