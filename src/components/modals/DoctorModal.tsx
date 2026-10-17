import React from 'react';
import { 
  X, 
  Stethoscope, 
  Award, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  GraduationCap, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { DOCTOR_PROFILE, HOSPITAL_CONTACT } from '../../data/defaultHospitalData';

export const DoctorModal: React.FC = () => {
  const { activeModal, setActiveModal, rates } = useHospital();

  if (activeModal !== 'doctor') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">Doctor Desk • Dr. Sumedha Sachan</h3>
                <span className="text-[10px] bg-emerald-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                  PIN 4
                </span>
              </div>
              <p className="text-emerald-200 text-xs">
                Senior Gynecologist & Obstetrics Specialist • Shubhdeep Hospital
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
          {/* Doctor Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-700/20">
              <Stethoscope className="w-10 h-10 text-emerald-100" />
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <Award className="w-3 h-3 text-emerald-600" />
                <span>14+ Years Clinical Excellence</span>
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 mt-1 font-sans">
                {DOCTOR_PROFILE.name}
              </h4>
              <p className="text-xs font-bold text-emerald-800 font-sans">
                {DOCTOR_PROFILE.hindiName}
              </p>
              <p className="text-xs text-slate-600 font-medium mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                <span>{DOCTOR_PROFILE.qualifications}</span>
              </p>
              <div className="mt-2 inline-flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-xs font-semibold">
                <span className="text-slate-500">OPD Consultation Fee:</span>
                <span className="font-extrabold text-emerald-800">₹{rates.consultation}</span>
              </div>
            </div>
          </div>

          {/* OPD Timings Table */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Official OPD Consultation Schedule</span>
            </h5>
            <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
              {DOCTOR_PROFILE.opdTimings.map((slot, idx) => (
                <div key={idx} className="p-3 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="font-bold text-slate-800">{slot.day}</span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                      {slot.slot1}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-semibold">
                      {slot.slot2}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specializations list */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Specializations & Procedures</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {DOCTOR_PROFILE.services.map((svc, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-100 flex items-start gap-2 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{svc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => setActiveModal('reception')}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with Dr. Sumedha</span>
            </button>

            <a
              href={`https://wa.me/${HOSPITAL_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                'Hello Dr. Sumedha Sachan, Shubhdeep Hospital Bilhaur. I want to book an OPD consultation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Doctor Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
