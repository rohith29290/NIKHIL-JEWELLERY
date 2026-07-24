export interface GoldRateHistoryItem {
  date: string;
  rate24k: number;
  rate22k: number;
  rate18k?: number;
  silverRate?: number;
  rate24k_10g?: number;
  rate22k_10g?: number;
  rate18k_10g?: number;
  silverRate_10g?: number;
}

export interface GoldRate {
  rate24k: number; // per gram in INR
  rate22k: number; // per gram in INR
  rate18k: number; // per gram in INR
  silverRate: number; // per gram in INR
  rate24k_10g?: number; // per 10 grams in INR
  rate22k_10g?: number; // per 10 grams in INR
  rate18k_10g?: number; // per 10 grams in INR
  silverRate_10g?: number; // per 10 grams in INR
  silverRate_1kg?: number; // per 1 kg in INR
  lastUpdated: string; // ISO date string
  trend: 'up' | 'down' | 'stable';
  changeAmount24k: number;
  city?: string;
  source?: string;
  history: GoldRateHistoryItem[];
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
