import React, { useState } from 'react';
import { 
  X, 
  Send, 
  User, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  CalendarCheck,
  Stethoscope
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { HOSPITAL_CONTACT, DISEASE_PROBLEM_OPTIONS } from '../../data/defaultHospitalData';

export const ReceptionModal: React.FC = () => {
  const { activeModal, setActiveModal, rates, addBooking } = useHospital();

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [diseaseProblem, setDiseaseProblem] = useState(DISEASE_PROBLEM_OPTIONS[0]);
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null);
  const [error, setError] = useState('');

  if (activeModal !== 'reception') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError('Please enter Patient Full Name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');

    // Save to context
    const saved = addBooking({
      patientName: patientName.trim(),
      phone: cleanPhone,
      diseaseProblem
    });

    setSubmittedBooking(saved);

    // Auto format WhatsApp message for 09555254042
    const waText = 
`🏥 *SHUBHDEEP HOSPITAL - BILHAUR, KANPUR*
📋 *NEW APPOINTMENT / PATIENT BOOKING*
---------------------------------------
🔖 *Booking ID:* ${saved.id}
👤 *Patient Name:* ${patientName.trim()}
📞 *Mobile Number:* ${cleanPhone}
🩺 *Disease / Problem:* ${diseaseProblem}
💰 *OPD Consultation Fee:* ₹${rates.consultation}
📍 *Hospital Address:* Mod, GT Rd, Makanpur, Bilhaur, UP 209202
---------------------------------------
_Please confirm my consultation slot. Thank you!_`;

    const encoded = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${HOSPITAL_CONTACT.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">Reception / Appointment</h3>
                <span className="text-[10px] bg-teal-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                  PIN 1
                </span>
              </div>
              <p className="text-teal-200 text-xs">
                Shubhdeep Hospital • WhatsApp Booking: {HOSPITAL_CONTACT.phone}
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

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {submittedBooking ? (
            <div className="space-y-4 text-center py-2 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">
                  Appointment Request Sent!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  WhatsApp has opened with your pre-formatted booking details. Our reception desk will confirm your appointment shortly.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 font-sans">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking ID:</span>
                  <span className="font-bold text-teal-700">{submittedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient Name:</span>
                  <span className="font-bold text-slate-800">{submittedBooking.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mobile:</span>
                  <span className="font-bold text-slate-800">{submittedBooking.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Problem / Dept:</span>
                  <span className="font-bold text-slate-800">{submittedBooking.diseaseProblem}</span>
                </div>
                <div className="flex justify-between border-t pt-1.5 mt-1.5">
                  <span className="text-slate-500">OPD Consultation Fee:</span>
                  <span className="font-extrabold text-teal-800">₹{rates.consultation}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSubmittedBooking(null);
                    setPatientName('');
                    setPhone('');
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Book Another
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name (मरीज़ का नाम) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient full name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm outline-hidden"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (मोबाइल नंबर) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm outline-hidden"
                  />
                </div>
              </div>

              {/* Disease / Problem dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Disease / Problem (बीमारी या समस्या चुनें) *
                </label>
                <div className="relative">
                  <Stethoscope className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={diseaseProblem}
                    onChange={(e) => setDiseaseProblem(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-xs sm:text-sm outline-hidden bg-white"
                  >
                    {DISEASE_PROBLEM_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live Fee preview */}
              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100 flex items-center justify-between text-xs">
                <span className="text-teal-900 font-semibold">Current OPD Consultation Fee:</span>
                <span className="text-base font-extrabold text-teal-800">₹{rates.consultation}</span>
              </div>

              {/* Submit to WhatsApp */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 active:scale-98 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Open WhatsApp (09555254042)</span>
              </button>
              <p className="text-center text-[11px] text-slate-400">
                Direct WhatsApp routing to Shubhdeep Hospital reception desk.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
