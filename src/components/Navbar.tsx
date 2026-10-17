import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  MoreVertical, 
  Lock, 
  LogOut, 
  ShieldCheck, 
  CalendarCheck, 
  Star, 
  MapPin, 
  Stethoscope, 
  Receipt, 
  PhoneCall,
  HeartPulse
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { HOSPITAL_CONTACT } from '../data/defaultHospitalData';

export const Navbar: React.FC = () => {
  const { isAdminLoggedIn, logoutAdmin, setActiveModal } = useHospital();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAdmin = () => {
    setIsDropdownOpen(false);
    if (isAdminLoggedIn) {
      setActiveModal('admin');
    } else {
      setActiveModal('adminLogin');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* 1. TOP EMERGENCY STRIP (Smooth gradient, vibrant medical green dot, high-contrast text) */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white text-xs px-3 sm:px-6 py-2 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* Vibrant Medical Green Active Dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-md shadow-emerald-400"></span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wide text-white text-[11px] sm:text-xs">
                24x7 Emergency & Trauma Center Active
              </span>
              <span className="hidden md:inline text-teal-400/80">•</span>
              <span className="hidden md:inline text-teal-200/90 text-[11px]">
                Immediate Admission & Critical Care in Bilhaur
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a 
              href={`tel:${HOSPITAL_CONTACT.phoneRaw}`} 
              className="flex items-center gap-1.5 font-black text-amber-300 hover:text-white transition-colors text-xs tracking-wide bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-red-400 animate-bounce" />
              <span>Hotline: {HOSPITAL_CONTACT.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR (Clean, spacious, 100% readable, zero overlapping) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Hospital Branding & Neatly Aligned Glass Card for Address + Phone */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Medical Emblem */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-teal-700/20 ring-2 ring-teal-500/20 shrink-0">
            <HeartPulse className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>

          <div className="min-w-0">
            {/* Hospital Name in Bold Full Typography */}
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                SHUBHDEEP HOSPITAL
              </h1>
              <span className="text-[11px] sm:text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 shrink-0">
                शुभदीप हॉस्पिटल
              </span>
            </div>

            {/* Address & Phone Neatly Aligned in a Clean Glassmorphism Card */}
            <div className="mt-1 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 px-2.5 py-1 rounded-xl bg-slate-100/90 border border-slate-200/90 text-[11px] sm:text-xs text-slate-700 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-semibold text-slate-800">Mod, GT Rd, Makanpur, Bilhaur, UP 209202</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="flex items-center gap-1 font-bold text-teal-800">
                <Phone className="w-3 h-3 text-teal-600 shrink-0" />
                <span>095552 54042</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3. RIGHT ALIGNED ACTION BUTTONS & 3-DOT ADMIN MENU */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto sm:ml-0">
          {/* Quick Appointment "Book" Button */}
          <button
            onClick={() => setActiveModal('reception')}
            className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <CalendarCheck className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline">Book Appointment</span>
            <span className="xs:hidden">Book</span>
          </button>

          {/* Direct Call Button */}
          <a
            href={`tel:${HOSPITAL_CONTACT.phoneRaw}`}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-700 font-bold text-xs sm:text-sm border border-red-200 hover:border-red-300 transition-colors shadow-xs"
          >
            <Phone className="w-4 h-4 text-red-600 shrink-0 animate-pulse" />
            <span className="hidden sm:inline">Call Hotline</span>
            <span className="sm:hidden">Call</span>
          </a>

          {/* 3-Dot (⋮) Menu Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center text-slate-800 transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              aria-label="3-Dot Menu"
              title="Hospital Navigation & Admin Login"
            >
              <MoreVertical className="w-5 h-5 text-slate-800" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hospital Navigation</p>
                  <p className="text-xs font-bold text-slate-900">Shubhdeep Hospital Services</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { setIsDropdownOpen(false); setActiveModal('reception'); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 text-left font-semibold transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>PIN 1: Reception / Appointment Booking</span>
                  </button>

                  <button
                    onClick={() => { setIsDropdownOpen(false); setActiveModal('reviews'); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 text-left font-semibold transition-colors"
                  >
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                    <span>PIN 2: Ratings & Reviews (4.4★)</span>
                  </button>

                  <button
                    onClick={() => { setIsDropdownOpen(false); setActiveModal('location'); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-900 text-left font-semibold transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>PIN 3: Location & Map (GT Rd, Makanpur)</span>
                  </button>

                  <button
                    onClick={() => { setIsDropdownOpen(false); setActiveModal('doctor'); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 text-left font-semibold transition-colors"
                  >
                    <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>PIN 4: Doctor Desk (Dr. Sumedha Sachan)</span>
                  </button>

                  <button
                    onClick={() => { setIsDropdownOpen(false); setActiveModal('rates'); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 text-left font-semibold transition-colors"
                  >
                    <Receipt className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>PIN 5: Charges & Departments (Live Rates)</span>
                  </button>

                  <button
                    onClick={() => { setIsDropdownOpen(false); setActiveModal('emergency'); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-red-50 hover:text-red-900 text-left font-semibold transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
                    <span>PIN 6: 24x7 Emergency & Ambulance</span>
                  </button>
                </div>

                {/* 3-Dot Admin Login Section */}
                <div className="pt-2 mt-1 border-t border-slate-100 px-2">
                  <div className="px-2 py-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hospital Administration</span>
                    {isAdminLoggedIn && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.2 rounded-full">
                        Admin Active
                      </span>
                    )}
                  </div>

                  <button
                    onClick={openAdmin}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-slate-800 hover:bg-slate-100 text-left font-bold transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg ${isAdminLoggedIn ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'} flex items-center justify-center shrink-0 shadow-xs`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black">{isAdminLoggedIn ? 'Open Admin Control Panel' : 'Admin Panel Login'}</span>
                        {!isAdminLoggedIn && <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />}
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {isAdminLoggedIn ? 'Live edit fees & view patient logs' : 'Mobile Number + Password: 1234'}
                      </div>
                    </div>
                  </button>

                  {isAdminLoggedIn && (
                    <button
                      onClick={() => { setIsDropdownOpen(false); logoutAdmin(); }}
                      className="w-full flex items-center gap-2 p-2 text-xs text-red-600 hover:bg-red-50 rounded-lg text-left transition-colors font-bold mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Logout Admin Session</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
