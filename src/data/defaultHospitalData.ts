import { HospitalRates, PatientBooking, HospitalReview, HotspotPin } from '../types/hospital';

export const HOSPITAL_CONTACT = {
  name: "SHUBHDEEP HOSPITAL",
  hindiName: "शुभदीप हॉस्पिटल",
  phone: "095552 54042",
  phoneRaw: "9555254042",
  whatsappNumber: "919555254042",
  address: "Mod, GT Rd, Makanpur, Bilhaur, UP 209202",
  city: "Bilhaur, Kanpur",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Shubhdeep+Hospital+Mod+GT+Rd+Makanpur+Bilhaur+Uttar+Pradesh+209202",
  googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Shubhdeep+Hospital+Mod+GT+Rd+Makanpur+Bilhaur+Uttar+Pradesh+209202",
  emergencyStatus: "24x7 Emergency & Trauma Center Active"
};

export const DEFAULT_HOSPITAL_RATES: HospitalRates = {
  consultation: 300,
  normalDelivery: 12000,
  cSection: 25000,
  laparoscopy: 28000,
  ancCheckup: 400,
  generalWardPerDay: 800,
  deluxeRoomPerDay: 2200,
  semiPrivatePerDay: 1500,
  icuPerDay: 4500,
  ultrasound: 700,
  xray: 350,
  cbc: 250,
  bloodSugar: 80,
  lipidProfile: 600,
  thyroid: 500,
  lft: 650,
  kft: 650,
  urineRoutine: 120,
};

export const DOCTOR_PROFILE = {
  name: "Dr. Sumedha Sachan",
  hindiName: "डॉ. सुमेधा सचान",
  designation: "Senior Gynecologist & Obstetrics Specialist",
  qualifications: "MBBS, MS / DGO (Obstetrics & Gynecology)",
  experience: "14+ Years of Dedicated Clinical Excellence",
  regNo: "UPMC-68421",
  bio: "Renowned Senior Gynecologist & Obstetrician specializing in painless normal delivery, Caesarean (C-Section) procedures with cosmetic closing, advanced laparoscopic surgery, high-risk pregnancy care, and infertility evaluation in Bilhaur, Kanpur.",
  opdTimings: [
    { day: "Monday to Saturday", slot1: "09:30 AM - 01:30 PM (Morning OPD)", slot2: "04:30 PM - 07:30 PM (Evening OPD)" },
    { day: "Sunday", slot1: "10:00 AM - 01:30 PM (Specialist Clinic)", slot2: "Emergency On-Call" },
    { day: "Emergency Labor & Delivery", slot1: "24 Hours Available", slot2: "24x7 Ready" }
  ],
  services: [
    "Painless Normal Delivery & Antenatal Checkups (ANC)",
    "Caesarean Delivery (C-Section / LSCS) with Cosmetic Closure",
    "Advanced Gynecological Laparoscopic Surgery & Hysterectomy",
    "High-Risk Pregnancy, Gestational Hypertension & Diabetes",
    "Infertility Counseling, Ovulation Study & Follicular Monitoring",
    "PCOS / PCOD, Fibroids, Ovarian Cyst & Menstrual Care"
  ]
};

export const DEFAULT_REVIEWS: HospitalReview[] = [
  {
    id: "REV-1",
    author: "Pooja Verma",
    rating: 5,
    date: "2 days ago",
    comment: "Dr. Sumedha Sachan madam is wonderful. My normal delivery was completely smooth without severe complications. Very hygienic patient rooms and attentive nurses.",
    location: "Bilhaur",
    service: "Normal Delivery"
  },
  {
    id: "REV-2",
    author: "Rakesh Chandra",
    rating: 5,
    date: "1 week ago",
    comment: "Admitted my mother in emergency due to chest congestion. The doctors started oxygen within 2 minutes. Transparent rates and no extra hidden charges.",
    location: "Makanpur, Bilhaur",
    service: "Emergency Care"
  },
  {
    id: "REV-3",
    author: "Neetu Singh",
    rating: 4,
    date: "2 weeks ago",
    comment: "Got ultrasound and blood tests done. Ultrasound report was handed over within 30 minutes. Dr. Sumedha gave great guidance.",
    location: "Kanpur Dehat",
    service: "Ultrasound & Labs"
  },
  {
    id: "REV-4",
    author: "Dharmendra Yadav",
    rating: 5,
    date: "3 weeks ago",
    comment: "Best hospital on GT Road Makanpur Bilhaur. Clean waiting hall, polite reception desk, and quick WhatsApp appointment booking.",
    location: "Bilhaur",
    service: "OPD Consultation"
  },
  {
    id: "REV-5",
    author: "Sunita Devi",
    rating: 5,
    date: "1 month ago",
    comment: "C-Section delivery performed by Dr. Sumedha Sachan. Healing was very fast with minimal pain. Very thankful to the whole hospital team.",
    location: "Kannauj",
    service: "C-Section Delivery"
  },
  {
    id: "REV-6",
    author: "Mohd. Shakeel",
    rating: 4,
    date: "1 month ago",
    comment: "Prompt 24x7 emergency service at night. Clean deluxe rooms with good AC and hot water for attendant.",
    location: "Makanpur",
    service: "Inpatient Ward"
  }
];

export const HOTSPOT_PINS: HotspotPin[] = [
  {
    id: 'reception',
    pinNumber: 1,
    title: 'RECEPTION / APPOINTMENT',
    hindiTitle: 'रिसेप्शन काउंटर / अपॉइंटमेंट',
    subtitle: 'Patient Appointment Form & Instant WhatsApp (09555254042)',
    x: 38,
    y: 56,
    badgeColor: 'bg-teal-600',
    iconName: 'CalendarCheck',
    actionText: 'Book Appointment'
  },
  {
    id: 'reviews',
    pinNumber: 2,
    title: 'RATINGS & REVIEWS (4.4★)',
    hindiTitle: '4.4★ रेटिंग व गूगल रिव्यू',
    subtitle: '4.4★ Rating • 24 Verified Reviews • Google Review Button',
    x: 15,
    y: 19,
    badgeColor: 'bg-amber-600',
    iconName: 'Star',
    actionText: '4.4★ Google Reviews'
  },
  {
    id: 'location',
    pinNumber: 3,
    title: 'LOCATION & MAP',
    hindiTitle: 'स्थान व गूगल मैप',
    subtitle: 'Mod, GT Rd, Makanpur, Bilhaur, UP 209202',
    x: 74,
    y: 22,
    badgeColor: 'bg-sky-600',
    iconName: 'MapPin',
    actionText: 'Get Directions'
  },
  {
    id: 'doctor',
    pinNumber: 4,
    title: 'DOCTOR DESK',
    hindiTitle: 'डॉक्टर कक्ष (डॉ. सुमेधा सचान)',
    subtitle: 'Dr. Sumedha Sachan (Senior Gynecologist & Obstetrics Specialist)',
    x: 55,
    y: 43,
    badgeColor: 'bg-emerald-600',
    iconName: 'Stethoscope',
    actionText: 'Doctor Timings'
  },
  {
    id: 'rates',
    pinNumber: 5,
    title: 'CHARGES & RATES',
    hindiTitle: 'उपचार व जांच शुल्क सूची',
    subtitle: 'Interactive Tariff Card (OPD, Delivery, C-Section, Laparoscopy, Labs)',
    x: 8.5,
    y: 47,
    badgeColor: 'bg-blue-600',
    iconName: 'Receipt',
    actionText: 'View Rate Card'
  },
  {
    id: 'emergency',
    pinNumber: 6,
    title: '24x7 EMERGENCY',
    hindiTitle: '24 घंटे आपातकालीन सेवा',
    subtitle: 'Hotline: 095552 54042 & Rapid Ambulance Dispatch',
    x: 87,
    y: 48,
    badgeColor: 'bg-red-600',
    iconName: 'PhoneCall',
    actionText: 'Emergency & Ambulance'
  }
];

export const DISEASE_PROBLEM_OPTIONS = [
  "Pregnancy Checkup / Antenatal (ANC)",
  "Normal Delivery / Labor Pain",
  "Caesarean Delivery (C-Section) Consultation",
  "Laparoscopic Surgery / Uterus / Ovarian Cyst",
  "High Fever / Dengue / Typhoid Symptoms",
  "Severe Abdominal / Pelvic Pain",
  "Ultrasound (USG) / Radiology Scan",
  "Blood Test / Complete Pathology Checkup",
  "Infertility / Gynecological Disorder (PCOS/PCOD)",
  "Emergency / Trauma / Accident Care",
  "General OPD Consultation / Other Illness"
];
