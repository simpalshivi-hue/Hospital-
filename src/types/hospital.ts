export interface HospitalRates {
  consultation: number;
  normalDelivery: number;
  cSection: number;
  laparoscopy: number;
  ancCheckup: number;
  generalWardPerDay: number;
  deluxeRoomPerDay: number;
  semiPrivatePerDay: number;
  icuPerDay: number;
  ultrasound: number;
  xray: number;
  cbc: number;
  bloodSugar: number;
  lipidProfile: number;
  thyroid: number;
  lft: number;
  kft: number;
  urineRoutine: number;
}

export interface PatientBooking {
  id: string;
  createdAt: string;
  patientName: string;
  phone: string;
  diseaseProblem: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  doctor?: string;
  date?: string;
}

export interface HospitalReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  location: string;
  service: string;
}

export type HotspotId = 'reception' | 'reviews' | 'location' | 'doctor' | 'rates' | 'emergency';

export interface HotspotPin {
  id: HotspotId;
  pinNumber: number;
  title: string;
  hindiTitle: string;
  subtitle: string;
  x: number; // percentage from left
  y: number; // percentage from top
  badgeColor: string;
  iconName: string;
  actionText: string;
}
