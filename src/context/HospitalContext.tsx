import React, { createContext, useContext, useState, useEffect } from 'react';
import { HospitalRates, PatientBooking, HospitalReview, HotspotId } from '../types/hospital';
import { DEFAULT_HOSPITAL_RATES, DEFAULT_REVIEWS } from '../data/defaultHospitalData';

interface HospitalContextType {
  rates: HospitalRates;
  updateRates: (newRates: Partial<HospitalRates>) => void;
  resetRates: () => void;
  reviews: HospitalReview[];
  addReview: (review: { author: string; rating: number; comment: string; location?: string; service?: string }) => void;
  bookings: PatientBooking[];
  addBooking: (bookingData: { patientName: string; phone: string; diseaseProblem: string }) => PatientBooking;
  updateBookingStatus: (id: string, status: PatientBooking['status']) => void;
  deleteBooking: (id: string) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  activeModal: HotspotId | 'admin' | 'adminLogin' | null;
  setActiveModal: (modal: HotspotId | 'admin' | 'adminLogin' | null) => void;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

const STORAGE_KEYS = {
  RATES: 'shubhdeep_rates_v2',
  REVIEWS: 'shubhdeep_reviews_v2',
  BOOKINGS: 'shubhdeep_bookings_v2',
  ADMIN_AUTH: 'shubhdeep_admin_auth_v2',
};

const DEFAULT_BOOKINGS: PatientBooking[] = [
  {
    id: "BK-1082",
    createdAt: "2026-10-16 19:40",
    patientName: "Sunita Verma",
    phone: "9839124455",
    diseaseProblem: "Pregnancy Checkup / Antenatal (ANC)",
    status: "Confirmed",
    doctor: "Dr. Sumedha Sachan"
  },
  {
    id: "BK-1081",
    createdAt: "2026-10-16 16:15",
    patientName: "Kamlesh Kumar",
    phone: "9450321980",
    diseaseProblem: "High Fever / Dengue / Typhoid Symptoms",
    status: "Pending",
    doctor: "General Physician"
  }
];

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Rates
  const [rates, setRates] = useState<HospitalRates>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RATES);
      return saved ? { ...DEFAULT_HOSPITAL_RATES, ...JSON.parse(saved) } : DEFAULT_HOSPITAL_RATES;
    } catch {
      return DEFAULT_HOSPITAL_RATES;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<HospitalReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  });

  // Bookings
  const [bookings, setBookings] = useState<PatientBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
    } catch {
      return DEFAULT_BOOKINGS;
    }
  });

  // Admin auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Modal
  const [activeModal, setActiveModal] = useState<HotspotId | 'admin' | 'adminLogin' | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(rates));
    } catch (e) {
      console.error(e);
    }
  }, [rates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  const updateRates = (newRates: Partial<HospitalRates>) => {
    setRates(prev => ({ ...prev, ...newRates }));
  };

  const resetRates = () => {
    setRates(DEFAULT_HOSPITAL_RATES);
  };

  const addReview = (newReview: { author: string; rating: number; comment: string; location?: string; service?: string }) => {
    const created: HospitalReview = {
      id: `REV-${Date.now()}`,
      author: newReview.author.trim() || 'Verified Patient',
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment.trim(),
      location: newReview.location || 'Bilhaur, Kanpur',
      service: newReview.service || 'Hospital Care'
    };
    setReviews(prev => [created, ...prev]);
  };

  const addBooking = (bookingData: { patientName: string; phone: string; diseaseProblem: string }): PatientBooking => {
    const newBooking: PatientBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      patientName: bookingData.patientName.trim(),
      phone: bookingData.phone.trim(),
      diseaseProblem: bookingData.diseaseProblem,
      status: 'Pending',
      doctor: 'Dr. Sumedha Sachan / Duty Specialist'
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: PatientBooking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const loginAdmin = (password: string): boolean => {
    if (password === '1234') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <HospitalContext.Provider
      value={{
        rates,
        updateRates,
        resetRates,
        reviews,
        addReview,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        activeModal,
        setActiveModal,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within HospitalProvider');
  }
  return context;
};
