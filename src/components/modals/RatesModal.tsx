import React, { useState } from 'react';
import { 
  X, 
  Receipt, 
  Search, 
  Calendar, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const RatesModal: React.FC = () => {
  const { activeModal, setActiveModal, rates } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');

  if (activeModal !== 'rates') return null;

  const rateItems = [
    {
      category: 'Doctor Consultation',
      name: 'Doctor OPD Consultation Fee',
      hindi: 'डॉक्टर परामर्श शुल्क',
      price: rates.consultation,
      unit: 'Per Consultation (Valid 7 Days Followup)',
      badge: 'OPD'
    },
    {
      category: 'Maternity Packages',
      name: 'Normal Vaginal Delivery (NVD) Package',
      hindi: 'नॉर्मल प्रसव (डिलीवरी) पैकेज',
      price: rates.normalDelivery,
      unit: 'Complete Package (Doctor + Labor + 3 Days Ward)',
      badge: 'Normal Delivery'
    },
    {
      category: 'Maternity Packages',
      name: 'Caesarean Section (C-Section / LSCS)',
      hindi: 'सिजेरियन ऑपरेशन डिलीवरी',
      price: rates.cSection,
      unit: 'Surgeon + OT + Anesthesia + 5 Days Stay',
      badge: 'C-Section'
    },
    {
      category: 'Advanced Surgery',
      name: 'Laparoscopic Surgery (दूरबीन विधि ऑपरेशन)',
      hindi: 'दूरबीन द्वारा गर्भाशय / रसौली / ओवेरियन सिस्ट ऑपरेशन',
      price: rates.laparoscopy,
      unit: 'Advanced Minimally Invasive Laparoscopy Package',
      badge: 'Laparoscopy'
    },
    {
      category: 'Maternity Packages',
      name: 'Antenatal Checkup (ANC) Card',
      hindi: 'गर्भावस्था नियमित जांच',
      price: rates.ancCheckup,
      unit: 'Per Visit (Vitals + Fetal Heart Rate)',
      badge: 'Maternity'
    },
    {
      category: 'Hospital Rooms & ICU',
      name: 'Critical Care ICU Bed',
      hindi: 'आईसीयू क्रिटिकल केयर बेड',
      price: rates.icuPerDay,
      unit: 'Per Day (24 Hours Monitor + Dedicated Nursing)',
      badge: 'Critical Care'
    },
    {
      category: 'Hospital Rooms & ICU',
      name: 'Deluxe AC Private Suite',
      hindi: 'डीलक्स एसी प्राइवेट रूम',
      price: rates.deluxeRoomPerDay,
      unit: 'Per Day (Attached Bath + LED TV + Attendant Bed)',
      badge: 'Private AC'
    },
    {
      category: 'Hospital Rooms & ICU',
      name: 'Semi-Private Twin Sharing Room',
      hindi: 'सेमी-प्राइवेट रूम',
      price: rates.semiPrivatePerDay,
      unit: 'Per Day (Partition Curtain + Attendant Chair)',
      badge: 'Twin Sharing'
    },
    {
      category: 'Hospital Rooms & ICU',
      name: 'General Inpatient Ward Bed',
      hindi: 'जनरल वार्ड बेड',
      price: rates.generalWardPerDay,
      unit: 'Per Day (24x7 Nursing + Central Oxygen)',
      badge: 'General Ward'
    },
    {
      category: 'Pathology & Diagnostic Labs',
      name: 'Obstetric / Pelvic Ultrasound (USG)',
      hindi: 'अल्ट्रासाउंड जांच',
      price: rates.ultrasound,
      unit: 'High Resolution Digital Sonography Scan',
      badge: 'Ultrasound'
    },
    {
      category: 'Pathology & Diagnostic Labs',
      name: 'Digital X-Ray (Chest / Bone)',
      hindi: 'डिजिटल एक्स-रे',
      price: rates.xray,
      unit: 'Per View Film with Digital Print',
      badge: 'X-Ray'
    },
    {
      category: 'Pathology & Diagnostic Labs',
      name: 'Complete Blood Count (CBC - 18 Parameters)',
      hindi: 'सीबीसी खून जांच',
      price: rates.cbc,
      unit: 'Hb, Platelets, TLC, DLC Automated Counter',
      badge: 'Blood Test'
    },
    {
      category: 'Pathology & Diagnostic Labs',
      name: 'Blood Sugar (Fasting / PP / Random)',
      hindi: 'ब्लड शुगर टेस्ट',
      price: rates.bloodSugar,
      unit: 'Glucose Test',
      badge: 'Routine Lab'
    },
    {
      category: 'Pathology & Diagnostic Labs',
      name: 'Lipid Profile (Cholesterol & Triglycerides)',
      hindi: 'लिपिड प्रोफाइल',
      price: rates.lipidProfile,
      unit: 'Complete Cardiac Profile',
      badge: 'Lipid Profile'
    },
    {
      category: 'Pathology & Diagnostic Labs',
      name: 'Thyroid Profile (T3, T4, TSH)',
      hindi: 'थायरॉइड टेस्ट',
      price: rates.thyroid,
      unit: 'Hormone Profile',
      badge: 'Thyroid'
    },
    {
      category: 'Pathology & Diagnostic Labs',
      name: 'Liver Function Test (LFT) & KFT',
      hindi: 'लिवर व किडनी जांच',
      price: rates.lft,
      unit: 'Complete Biochemical Panel',
      badge: 'Bio-Chem'
    },
    {
      category: 'Pathology & Diagnostic Labs',
      name: 'Urine Routine & Microscopic',
      hindi: 'पेशाब सामान्य जांच',
      price: rates.urineRoutine,
      unit: 'Immediate Laboratory Report',
      badge: 'Urine Lab'
    }
  ];

  const filteredRates = rateItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.hindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.badge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">Charges & Departments</h3>
                <span className="text-[10px] bg-blue-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                  HOTSPOT 5
                </span>
              </div>
              <p className="text-blue-200 text-xs">
                OPD, Delivery, C-Section, Laparoscopy & Lab Tests • Shubhdeep Hospital
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

        {/* Search & Notice Bar */}
        <div className="p-3.5 sm:px-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search OPD, Delivery, Laparoscopy, USG..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✓ Live Synchronized Rates
          </span>
        </div>

        {/* Tariffs List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-2.5">
          {filteredRates.map((item, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.2 rounded border border-blue-100">
                    {item.badge}
                  </span>
                  <h5 className="font-extrabold text-xs sm:text-sm text-slate-900">{item.name}</h5>
                </div>
                <p className="text-[11px] text-slate-500 font-sans">{item.hindi} • {item.unit}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-base sm:text-lg font-black text-slate-900">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => setActiveModal('reception')}
                  className="block text-[11px] font-bold text-blue-600 hover:underline mt-0.5"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}

          {filteredRates.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs">
              No procedure or rate found matching "{searchTerm}".
            </div>
          )}

          {/* Transparent billing promise */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 flex items-center gap-2.5 mt-2">
            <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
            <p className="text-[11px]">
              <strong>100% Transparent Billing Guarantee:</strong> Clear estimate without hidden OT or surgeon surcharges. Ayushman Bharat & TPA cashless insurance desk available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
