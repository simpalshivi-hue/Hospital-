import React from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Navbar } from './components/Navbar';
import { HeroHotspotTour } from './components/HeroHotspotTour';
import { ReceptionModal } from './components/modals/ReceptionModal';
import { ReviewsModal } from './components/modals/ReviewsModal';
import { LocationModal } from './components/modals/LocationModal';
import { DoctorModal } from './components/modals/DoctorModal';
import { RatesModal } from './components/modals/RatesModal';
import { EmergencyModal } from './components/modals/EmergencyModal';
import { AdminModal } from './components/modals/AdminModal';
import { HOSPITAL_CONTACT, DOCTOR_PROFILE } from './data/defaultHospitalData';
import { 
  Phone, 
  CalendarCheck, 
  Star, 
  MapPin, 
  Stethoscope, 
  Receipt, 
  PhoneCall, 
  ChevronRight, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

const HospitalMain: React.FC = () => {
  const { setActiveModal, rates } = useHospital();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white pb-16 sm:pb-0">
      {/* 1. TOP BAR WITH 3-DOT MENU & ADMIN LOGIN */}
      <Navbar />

      {/* 2. FULL-SCREEN INTERACTIVE IMAGE MAP WITH 6 PULSING HOTSPOTS */}
      <HeroHotspotTour />

      {/* 3. QUICK 6-HOTSPOT INTERACTIVE GRID */}
      <section className="bg-white border-b border-slate-200/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>Full-Screen Visual Hospital Portal</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Explore Shubhdeep Hospital Hotspots
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">24x7 Hotline:</span>
              <a 
                href={`tel:${HOSPITAL_CONTACT.phoneRaw}`}
                className="px-3 py-1.5 rounded-xl bg-red-50 text-red-700 font-extrabold text-xs border border-red-200 hover:bg-red-100 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>{HOSPITAL_CONTACT.phone}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* HOTSPOT 1 */}
            <div
              onClick={() => setActiveModal('reception')}
              className="cursor-pointer p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    Online Booking
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                  RECEPTION COUNTER
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Patient appointment registration form. Submitting automatically formats and opens WhatsApp (09555254042).
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-teal-700">
                <span>Book via WhatsApp</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* HOTSPOT 2 */}
            <div
              onClick={() => setActiveModal('reviews')}
              className="cursor-pointer p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <div className="flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>4.4★ (24 Reviews)</span>
                  </div>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                  RATINGS & REVIEWS (4.4★)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Read 24 verified reviews and click the direct Google button to write your review on Google.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-amber-700">
                <span>⭐ Google Review Button</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* HOTSPOT 3 */}
            <div
              onClick={() => setActiveModal('location')}
              className="cursor-pointer p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    Makanpur, Bilhaur
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
                  LOCATION & MAP
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Mod, GT Rd, Makanpur, Bilhaur, Uttar Pradesh 209202 with direct Google Maps directions button.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-sky-700">
                <span>Google Maps Directions</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* HOTSPOT 4 */}
            <div
              onClick={() => setActiveModal('doctor')}
              className="cursor-pointer p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    4
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    Dr. Sumedha Sachan
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                  DOCTOR DESK (Dr. Sumedha Sachan)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Senior Gynecologist & Obstetrics Specialist (MBBS, MS/DGO). Check morning & evening OPD consultation hours.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>View OPD Schedule</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* HOTSPOT 5 */}
            <div
              onClick={() => setActiveModal('rates')}
              className="cursor-pointer p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    5
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Live Tariffs
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  CHARGES & DEPARTMENTS
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  OPD (₹{rates.consultation}), Normal Delivery (₹{rates.normalDelivery.toLocaleString('en-IN')}), C-Section (₹{rates.cSection.toLocaleString('en-IN')}), Laparoscopy (₹{rates.laparoscopy.toLocaleString('en-IN')}), USG, and Labs.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-blue-700">
                <span>View Rate Cards</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* HOTSPOT 6 */}
            <div
              onClick={() => setActiveModal('emergency')}
              className="cursor-pointer p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-red-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center animate-pulse">
                    6
                  </span>
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                    24x7 Ambulance
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-red-700 transition-colors">
                  24x7 EMERGENCY & AMBULANCE
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Instant call dialer to emergency desk (095552 54042) and rapid ambulance dispatch request.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-red-700">
                <span>Call Emergency & Ambulance</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DR. SUMEDHA SACHAN SPECIALIST SPOTLIGHT */}
      <section className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-emerald-300 text-xs font-bold bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              Senior Consultant Gynecologist & Obstetrics Specialist
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {DOCTOR_PROFILE.name}
            </h2>
            <p className="text-emerald-200 font-sans text-xs sm:text-sm font-semibold">
              {DOCTOR_PROFILE.hindiName} • {DOCTOR_PROFILE.qualifications} (14+ Years Experience)
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Specialized in painless normal delivery, Caesarean (C-Section) procedures with cosmetic closing, advanced laparoscopic surgery, high-risk pregnancy care, and infertility evaluation in Bilhaur, Kanpur.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={() => setActiveModal('reception')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-md"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Appointment (Fee: ₹{rates.consultation})</span>
              </button>
              <button
                onClick={() => setActiveModal('doctor')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                <span>View OPD Schedule</span>
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/15 text-xs space-y-2.5 w-full md:w-80 shrink-0">
            <span className="font-bold text-sm text-emerald-300 block border-b border-white/10 pb-2">
              OPD Timings at Bilhaur
            </span>
            <div className="flex justify-between text-slate-200">
              <span>Morning OPD:</span>
              <span className="font-bold text-white">09:30 AM - 01:30 PM</span>
            </div>
            <div className="flex justify-between text-slate-200">
              <span>Evening OPD:</span>
              <span className="font-bold text-white">04:30 PM - 07:30 PM</span>
            </div>
            <div className="flex justify-between text-slate-200">
              <span>Sunday Clinic:</span>
              <span className="font-bold text-white">10:00 AM - 01:30 PM</span>
            </div>
            <div className="flex justify-between text-emerald-300 font-bold border-t border-white/10 pt-2">
              <span>Emergency / Delivery:</span>
              <span>24x7 Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCATION & GOOGLE MAPS SECTION */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Hospital Location & Landmarks
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Shubhdeep Hospital, Makanpur, Bilhaur
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Address: <strong>{HOSPITAL_CONTACT.address}</strong> (मोड़, जी.टी. रोड, मकनपुर, बिल्हौर, कानपुर नगर).
              Easy road transit for families in Bilhaur, Kannauj, and Kanpur Dehat.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href={HOSPITAL_CONTACT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${HOSPITAL_CONTACT.phoneRaw}`}
              className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Call: {HOSPITAL_CONTACT.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-slate-900 text-white mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="font-extrabold text-sm text-white block">SHUBHDEEP HOSPITAL • शुभदीप हॉस्पिटल</span>
            <span>{HOSPITAL_CONTACT.address}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveModal('adminLogin')}
              className="text-teal-400 hover:underline font-bold"
            >
              Admin Panel Login (Mobile + 1234)
            </button>
            <span>•</span>
            <a href={`tel:${HOSPITAL_CONTACT.phoneRaw}`} className="text-white hover:text-teal-300">
              Hotline: {HOSPITAL_CONTACT.phone}
            </a>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 z-40 sm:hidden flex items-center gap-2 shadow-lg">
        <a
          href={`tel:${HOSPITAL_CONTACT.phoneRaw}`}
          className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Hotline</span>
        </a>
        <button
          onClick={() => setActiveModal('reception')}
          className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-1"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Reception</span>
        </button>
        <button
          onClick={() => setActiveModal('rates')}
          className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1"
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Charges</span>
        </button>
      </div>

      {/* ALL 6 HOTSPOT MODALS + ADMIN MODAL */}
      <ReceptionModal />
      <ReviewsModal />
      <LocationModal />
      <DoctorModal />
      <RatesModal />
      <EmergencyModal />
      <AdminModal />
    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <HospitalMain />
    </HospitalProvider>
  );
}
