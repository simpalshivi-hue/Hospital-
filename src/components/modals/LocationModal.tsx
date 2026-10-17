import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Phone, 
  Copy, 
  Check, 
  Car, 
  Bus, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { HOSPITAL_CONTACT } from '../../data/defaultHospitalData';

export const LocationModal: React.FC = () => {
  const { activeModal, setActiveModal } = useHospital();
  const [copied, setCopied] = useState(false);

  if (activeModal !== 'location') return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(HOSPITAL_CONTACT.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-700 via-sky-800 to-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">Hospital Map & Location</h3>
                <span className="text-[10px] bg-sky-300 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                  PIN 3
                </span>
              </div>
              <p className="text-sky-200 text-xs">
                Shubhdeep Hospital • Makanpur, Bilhaur, Kanpur
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Address Card */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-bold text-sky-950 uppercase tracking-wider">Official Hospital Address</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-900 bg-white px-2 py-1 rounded-md border border-sky-200"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-base font-extrabold text-slate-900 leading-snug">
              {HOSPITAL_CONTACT.address}
            </p>
            <p className="text-xs text-slate-600">
              मोड़, जी.टी. रोड, मकनपुर, बिल्हौर, कानपुर नगर, उत्तर प्रदेश - 209202
            </p>
          </div>

          {/* Direct Google Maps Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={HOSPITAL_CONTACT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={`tel:${HOSPITAL_CONTACT.phoneRaw}`}
              className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Call Reception Desk</span>
            </a>
          </div>

          {/* Embedded Google Map Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-100 shadow-inner">
            <iframe
              title="Shubhdeep Hospital Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14256.46327389278!2d80.0381669!3d26.8524451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399de8f71092e0df%3A0x8673a96cb10069a!2sBilhaur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0 filter contrast-[1.02]"
              loading="lazy"
            />
            <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1.5 shadow-md">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Mod, GT Road, Makanpur, Bilhaur</span>
            </div>
          </div>

          {/* Route & Landmark Assistance */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-sky-600" />
              <span>How to Reach Shubhdeep Hospital:</span>
            </h5>
            <div className="space-y-1 text-[11px] text-slate-600">
              <p>• <strong>By GT Road:</strong> Located directly on the Grand Trunk (GT) Road near Makanpur Mod, Bilhaur.</p>
              <p>• <strong>From Bilhaur Bus Station:</strong> ~2-3 minutes by auto-rickshaw or car.</p>
              <p>• <strong>From Kannauj:</strong> ~25 minutes drive along GT Road.</p>
              <p>• <strong>From Kanpur City:</strong> Direct bus / road connectivity via Kanpur-Kannauj GT Road corridor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
