import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Star, 
  MapPin, 
  Stethoscope, 
  Receipt, 
  PhoneCall, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { HOTSPOT_PINS, HOSPITAL_CONTACT } from '../data/defaultHospitalData';
import { HotspotId } from '../types/hospital';

export const HeroHotspotTour: React.FC = () => {
  const { setActiveModal, rates } = useHospital();
  const [showHotspots, setShowHotspots] = useState(true);
  const [hoveredPin, setHoveredPin] = useState<HotspotId | null>(null);

  const heroImageSrc = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80";

  const getPinIcon = (id: HotspotId) => {
    switch (id) {
      case 'reception': return <CalendarCheck className="w-4 h-4" />;
      case 'reviews': return <Star className="w-4 h-4 fill-amber-300 text-amber-300" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      case 'doctor': return <Stethoscope className="w-4 h-4" />;
      case 'rates': return <Receipt className="w-4 h-4" />;
      case 'emergency': return <PhoneCall className="w-4 h-4" />;
    }
  };

  const getPinPreview = (id: HotspotId) => {
    switch (id) {
      case 'reception':
        return {
          title: 'RECEPTION / APPOINTMENT',
          desc: 'Patient appointment form with instant WhatsApp dispatch to 09555254042',
          badge: 'Online Booking'
        };
      case 'reviews':
        return {
          title: 'RATINGS & REVIEWS (4.4★)',
          desc: '4.4★ Rating • 24 Verified Reviews • Official Google Review Button',
          badge: '4.4★ Google Rating'
        };
      case 'location':
        return {
          title: 'LOCATION & MAP',
          desc: 'Mod, GT Rd, Makanpur, Bilhaur, UP 209202 • Google Maps Directions',
          badge: 'Bilhaur Landmark'
        };
      case 'doctor':
        return {
          title: 'DOCTOR DESK',
          desc: 'Dr. Sumedha Sachan (Senior Gynecologist & Obstetrics Specialist) • OPD Schedule',
          badge: 'Consultant OPD'
        };
      case 'rates':
        return {
          title: 'CHARGES & RATES',
          desc: `OPD ₹${rates.consultation} • Delivery ₹${rates.normalDelivery.toLocaleString('en-IN')} • C-Section ₹${rates.cSection.toLocaleString('en-IN')} • Laparoscopy ₹${rates.laparoscopy.toLocaleString('en-IN')}`,
          badge: 'Live Tariffs'
        };
      case 'emergency':
        return {
          title: '24x7 EMERGENCY',
          desc: `Emergency Hotline: ${HOSPITAL_CONTACT.phone} • Instant Ambulance Dispatch`,
          badge: '24x7 Active'
        };
    }
  };

  return (
    <div className="relative w-full bg-slate-950 flex flex-col select-none">
      {/* 1. TOP HOSPITAL RECEPTION PHOTO CANVAS (100% CLEAR, FULL VISIBILITY, ZERO OBSTRUCTION) */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] md:h-[68vh] min-h-[420px] max-h-[760px] overflow-hidden bg-slate-950">
        <img
          src={heroImageSrc}
          alt="Shubhdeep Hospital Bilhaur Main Reception"
          className="w-full h-full object-cover object-center filter brightness-105 contrast-[1.02]"
          loading="eager"
        />

        {/* Minimal clean top corner status chip with zero central obstruction */}
        <div className="absolute top-3.5 left-4 z-20 flex items-center gap-2 pointer-events-none">
          <div className="bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Shubhdeep Main Reception</span>
          </div>
        </div>

        {/* Hotspots Toggle in top right */}
        <div className="absolute top-3.5 right-4 z-20 pointer-events-auto">
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-md transition-all ${
              showHotspots 
                ? 'bg-teal-600/90 text-white border-teal-300 hover:bg-teal-600' 
                : 'bg-slate-950/80 text-slate-300 border-white/20 hover:text-white'
            }`}
          >
            {showHotspots ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showHotspots ? 'Pins Visible' : 'Pins Hidden'}</span>
          </button>
        </div>

        {/* 6 Animated Pulsing Touch/Click Hotspots on the Photo */}
        {showHotspots && HOTSPOT_PINS.map((pin) => {
          const preview = getPinPreview(pin.id);
          const isHovered = hoveredPin === pin.id;

          return (
            <div
              key={pin.id}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              onMouseEnter={() => setHoveredPin(pin.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Radar pulse ripples */}
              <div className="relative flex items-center justify-center">
                <span className="absolute w-14 h-14 rounded-full bg-teal-400/50 animate-ping opacity-75 pointer-events-none"></span>
                <span className="absolute w-9 h-9 rounded-full bg-cyan-400/60 animate-pulse pointer-events-none"></span>

                {/* Hotspot Pin Button */}
                <button
                  onClick={() => setActiveModal(pin.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full shadow-2xl text-white font-black text-[10px] sm:text-xs tracking-wide transition-all transform duration-200 hover:scale-110 active:scale-95 border-2 border-white/95 ${
                    pin.id === 'reception'
                      ? 'bg-teal-600 hover:bg-teal-500 ring-4 ring-teal-500/40'
                      : pin.id === 'reviews'
                      ? 'bg-amber-600 hover:bg-amber-500 ring-4 ring-amber-500/40'
                      : pin.id === 'location'
                      ? 'bg-sky-600 hover:bg-sky-500 ring-4 ring-sky-500/40'
                      : pin.id === 'doctor'
                      ? 'bg-emerald-600 hover:bg-emerald-500 ring-4 ring-emerald-500/40'
                      : pin.id === 'rates'
                      ? 'bg-blue-600 hover:bg-blue-500 ring-4 ring-blue-500/40'
                      : 'bg-red-600 hover:bg-red-500 ring-4 ring-red-500/40 animate-pulse'
                  }`}
                  aria-label={pin.title}
                >
                  <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center font-mono text-[9px] font-black">
                    {pin.pinNumber}
                  </span>
                  <span>{getPinIcon(pin.id)}</span>
                  <span className="drop-shadow-sm uppercase font-extrabold text-[9px] sm:text-[10px] whitespace-nowrap hidden xs:inline">
                    {pin.title}
                  </span>
                </button>
              </div>

              {/* Floating Tooltip on Hover */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 sm:w-72 bg-slate-950/95 backdrop-blur-xl border border-white/20 text-white p-3.5 rounded-2xl shadow-2xl transition-all duration-200 pointer-events-auto ${
                  isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/90 px-2 py-0.5 rounded-md border border-teal-800">
                    {preview.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans">PIN {pin.pinNumber}</span>
                </div>
                <h4 className="font-extrabold text-sm text-white">{preview.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {preview.desc}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal(pin.id);
                  }}
                  className="mt-2.5 w-full py-1.5 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <span>Open {pin.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. LOWER BLACK FLOATING MENU PANEL (POSITIONED FURTHER DOWN, LEAVING UPPER RECEPTION COMPLETELY VISIBLE) */}
      <div className="relative z-30 w-full bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-3 sm:px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Label indicating interactive hotspot shortcuts */}
          <div className="flex items-center gap-2 text-white text-xs font-bold shrink-0 self-start md:self-center">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-slate-100 font-black">Interactive Hotspot Menu:</span>
            <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">(Click any button to open popup)</span>
          </div>

          {/* Numbered Hotspot Buttons (Pins 1 - 6) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center w-full md:w-auto">
            {HOTSPOT_PINS.map(pin => (
              <button
                key={pin.id}
                onClick={() => setActiveModal(pin.id)}
                className={`group flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-md active:scale-95 border ${
                  pin.id === 'reception'
                    ? 'bg-slate-900 hover:bg-teal-700 text-slate-200 hover:text-white border-teal-500/30 hover:border-teal-400'
                    : pin.id === 'reviews'
                    ? 'bg-slate-900 hover:bg-amber-700 text-slate-200 hover:text-white border-amber-500/30 hover:border-amber-400'
                    : pin.id === 'location'
                    ? 'bg-slate-900 hover:bg-sky-700 text-slate-200 hover:text-white border-sky-500/30 hover:border-sky-400'
                    : pin.id === 'doctor'
                    ? 'bg-slate-900 hover:bg-emerald-700 text-slate-200 hover:text-white border-emerald-500/30 hover:border-emerald-400'
                    : pin.id === 'rates'
                    ? 'bg-slate-900 hover:bg-blue-700 text-slate-200 hover:text-white border-blue-500/30 hover:border-blue-400'
                    : 'bg-slate-900 hover:bg-red-700 text-slate-200 hover:text-white border-red-500/30 hover:border-red-400'
                }`}
              >
                <span className={`w-5 h-5 rounded-lg flex items-center justify-center font-mono text-[10px] font-black transition-colors ${
                  pin.id === 'reception'
                    ? 'bg-teal-500/20 text-teal-300 group-hover:bg-white group-hover:text-teal-900'
                    : pin.id === 'reviews'
                    ? 'bg-amber-500/20 text-amber-300 group-hover:bg-white group-hover:text-amber-900'
                    : pin.id === 'location'
                    ? 'bg-sky-500/20 text-sky-300 group-hover:bg-white group-hover:text-sky-900'
                    : pin.id === 'doctor'
                    ? 'bg-emerald-500/20 text-emerald-300 group-hover:bg-white group-hover:text-emerald-900'
                    : pin.id === 'rates'
                    ? 'bg-blue-500/20 text-blue-300 group-hover:bg-white group-hover:text-blue-900'
                    : 'bg-red-500/20 text-red-300 group-hover:bg-white group-hover:text-red-900'
                }`}>
                  {pin.pinNumber}
                </span>

                <span>{getPinIcon(pin.id)}</span>
                <span className="whitespace-nowrap tracking-tight">{pin.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
