import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Ambulance, 
  HeartPulse, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Phone,
  Clock
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { HOSPITAL_CONTACT } from '../../data/defaultHospitalData';

export const EmergencyModal: React.FC = () => {
  const { activeModal, setActiveModal } = useHospital();

  const [pickupLocation, setPickupLocation] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [patientCondition, setPatientCondition] = useState('Critical Labor / Delivery Emergency');
  const [ambulanceRequested, setAmbulanceRequested] = useState(false);

  if (activeModal !== 'emergency') return null;

  const handleAmbulanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupLocation.trim() || !callerPhone.trim()) return;

    setAmbulanceRequested(true);

    const waText = 
`🚨 *URGENT: AMBULANCE DISPATCH REQUEST*
🏥 *SHUBHDEEP HOSPITAL - BILHAUR, KANPUR*
---------------------------------------
📍 *Pickup Location / Landmark:* ${pickupLocation.trim()}
📞 *Emergency Contact:* ${callerPhone.trim()}
⚠️ *Condition / Emergency:* ${patientCondition}
⏰ *Time:* Immediate Dispatch Needed
---------------------------------------
_Please send ambulance immediately!_`;

    const encoded = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${HOSPITAL_CONTACT.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-red-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 via-rose-800 to-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 flex items-center justify-center animate-pulse">
              <HeartPulse className="w-5 h-5 text-red-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">24x7 Emergency & Trauma</h3>
                <span className="text-[10px] bg-red-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                  PIN 6
                </span>
              </div>
              <p className="text-red-200 text-xs">
                Emergency Hotline: {HOSPITAL_CONTACT.phone} • Bilhaur
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
        <div className="p-5 sm:p-6 space-y-4">
          {/* Direct Emergency Call Button */}
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center space-y-3">
            <span className="text-xs font-bold text-red-900 uppercase tracking-wider block">
              Direct Emergency Medical Hotline
            </span>

            <a
              href={`tel:${HOSPITAL_CONTACT.phoneRaw}`}
              className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-lg shadow-red-600/30 active:scale-98 transition-all"
            >
              <PhoneCall className="w-6 h-6 animate-bounce" />
              <span>Call: {HOSPITAL_CONTACT.phone}</span>
            </a>
            <p className="text-[11px] text-red-700">
              Immediate connection to duty doctor & trauma triage nurse.
            </p>
          </div>

          {/* Ambulance Dispatch Request Form */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Ambulance className="w-4 h-4 text-red-600" />
                <span>Request Ambulance Dispatch</span>
              </h4>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
                24x7 Ready
              </span>
            </div>

            {ambulanceRequested ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ambulance Request Dispatched via WhatsApp!</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Our emergency driver is coordinating with location: <strong>{pickupLocation}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setAmbulanceRequested(false)}
                  className="text-xs font-bold text-emerald-900 underline mt-1"
                >
                  Request another ambulance
                </button>
              </div>
            ) : (
              <form onSubmit={handleAmbulanceSubmit} className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Pickup Location / Landmark (कहाँ भेजें?) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Village, GT Road near petrol pump, Makanpur"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-red-500 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Contact Mobile (फ़ोन नंबर) *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit phone number"
                      value={callerPhone}
                      onChange={(e) => setCallerPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-red-500 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Emergency Condition (मरीज़ की स्थिति)
                  </label>
                  <select
                    value={patientCondition}
                    onChange={(e) => setPatientCondition(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-red-500 outline-hidden"
                  >
                    <option value="Critical Labor / Delivery Emergency">Critical Labor / Delivery Emergency</option>
                    <option value="Severe Accident / Trauma Injury">Severe Accident / Trauma Injury</option>
                    <option value="Chest Pain / Heart Complication">Chest Pain / Breathing Difficulty</option>
                    <option value="High Unconscious Fever">High Unconscious Fever</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Ambulance via WhatsApp (095552 54042)</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick facilities notice */}
          <div className="text-[11px] text-slate-500 flex items-center justify-between border-t pt-2">
            <span>• Continuous Oxygen & Suction</span>
            <span>• Multi-para Monitors</span>
            <span>• Emergency OT Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
