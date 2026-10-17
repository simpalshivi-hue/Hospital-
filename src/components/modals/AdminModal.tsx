import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  DollarSign, 
  Users, 
  Plus, 
  Minus, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  Trash2, 
  Search, 
  LogOut
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { HospitalRates } from '../../types/hospital';
import { DEFAULT_HOSPITAL_RATES } from '../../data/defaultHospitalData';

export const AdminModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    rates, 
    updateRates, 
    resetRates, 
    bookings, 
    updateBookingStatus, 
    deleteBooking 
  } = useHospital();

  const [mobileInput, setMobileInput] = useState('9555254042');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminTab, setAdminTab] = useState<'rates' | 'bookings'>('rates');

  // Live editable rates
  const [tempRates, setTempRates] = useState<HospitalRates>(rates);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [bookingSearch, setBookingSearch] = useState('');

  if (activeModal !== 'admin' && activeModal !== 'adminLogin') return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileInput.trim() || mobileInput.replace(/\D/g, '').length < 10) {
      setLoginError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (loginAdmin(passwordInput)) {
      setLoginError('');
      setPasswordInput('');
      setTempRates(rates);
      setActiveModal('admin');
    } else {
      setLoginError('Authentication failed! Password must be 1234.');
    }
  };

  const handleRateStep = (key: keyof HospitalRates, step: number) => {
    setTempRates(prev => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + step)
    }));
  };

  const handleRateDirect = (key: keyof HospitalRates, val: string) => {
    const num = parseInt(val, 10);
    setTempRates(prev => ({
      ...prev,
      [key]: isNaN(num) ? 0 : Math.max(0, num)
    }));
  };

  const handleSaveRates = () => {
    updateRates(tempRates);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetRates = () => {
    if (window.confirm('Reset all hospital charges to hospital defaults?')) {
      resetRates();
      setTempRates(DEFAULT_HOSPITAL_RATES);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.patientName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.phone.includes(bookingSearch) ||
    b.diseaseProblem.toLowerCase().includes(bookingSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">
                  {isAdminLoggedIn ? 'Hospital Admin Control Panel' : 'Admin Panel Login'}
                </h3>
                <span className="text-[10px] bg-teal-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                  SECURE
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                Shubhdeep Hospital, Bilhaur • Live Tariff & Patient Log Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  logoutAdmin();
                  setActiveModal(null);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 text-xs font-semibold hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        {!isAdminLoggedIn ? (
          /* Login Dialog with Mobile Number + Password = 1234 */
          <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 mx-auto flex items-center justify-center mb-3 border border-teal-100">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900">Hospital Admin Login</h4>
              <p className="text-xs text-slate-500 mt-1">
                Enter your mobile number and password to manage hospital rates & bookings.
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (मोबाइल नंबर) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobileInput}
                    onChange={(e) => setMobileInput(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password (पासवर्ड) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password (hint: 1234)"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                <span>Authentication Requirement:</span>
                <span className="font-mono font-bold bg-amber-200 px-2 py-0.5 rounded">Password: 1234</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-98"
              >
                Authenticate & Open Control Panel
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0">
              <div className="flex gap-2 py-2">
                <button
                  onClick={() => setAdminTab('rates')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    adminTab === 'rates' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Dynamic Charges Editor</span>
                </button>

                <button
                  onClick={() => setAdminTab('bookings')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    adminTab === 'bookings' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Incoming Bookings Log ({bookings.length})</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold">Live Charges Updated!</span>
                </div>
              )}
            </div>

            {/* Rates Editor */}
            {adminTab === 'rates' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-teal-50 border border-teal-100 rounded-xl">
                  <div>
                    <h5 className="font-extrabold text-xs text-teal-950">Live Tariff Management</h5>
                    <p className="text-[11px] text-teal-800">
                      Modifying prices here instantly updates PIN 5 (Charges & Departments) and all booking estimates!
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetRates}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                    <button
                      onClick={handleSaveRates}
                      className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold flex items-center gap-1 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Live Changes</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { key: 'consultation', label: 'Doctor OPD Consultation Fee', step: 50 },
                    { key: 'normalDelivery', label: 'Normal Delivery (NVD) Package', step: 500 },
                    { key: 'cSection', label: 'C-Section (LSCS) Delivery Package', step: 1000 },
                    { key: 'laparoscopy', label: 'Laparoscopic Surgery Package', step: 1000 },
                    { key: 'ancCheckup', label: 'Antenatal Checkup (ANC) Card', step: 50 },
                    { key: 'generalWardPerDay', label: 'General Ward Bed / Day', step: 100 },
                    { key: 'deluxeRoomPerDay', label: 'Deluxe AC Room / Day', step: 200 },
                    { key: 'icuPerDay', label: 'Critical Care ICU Bed / Day', step: 500 },
                    { key: 'ultrasound', label: 'Ultrasound (USG) Scan Rate', step: 50 },
                    { key: 'xray', label: 'Digital X-Ray Rate', step: 50 },
                    { key: 'cbc', label: 'Complete Blood Count (CBC) Rate', step: 50 },
                    { key: 'bloodSugar', label: 'Blood Sugar (FBS / PP) Rate', step: 10 },
                    { key: 'lipidProfile', label: 'Lipid Profile Rate', step: 50 },
                    { key: 'thyroid', label: 'Thyroid Profile (T3/T4/TSH) Rate', step: 50 },
                    { key: 'urineRoutine', label: 'Urine Routine & Micro Rate', step: 20 },
                  ].map((field) => (
                    <div key={field.key} className="p-3 rounded-xl border border-slate-200 bg-white shadow-xs">
                      <span className="block font-bold text-slate-700 mb-1.5">{field.label}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRateStep(field.key as any, -field.step)}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 font-bold flex items-center justify-center border"
                          title={`- ₹${field.step}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="relative flex-1">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                          <input
                            type="number"
                            value={tempRates[field.key as keyof HospitalRates]}
                            onChange={(e) => handleRateDirect(field.key as any, e.target.value)}
                            className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 font-black text-slate-900 text-sm focus:outline-hidden"
                          />
                        </div>
                        <button
                          onClick={() => handleRateStep(field.key as any, field.step)}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 font-bold flex items-center justify-center border"
                          title={`+ ₹${field.step}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSaveRates}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Changes to Live Website</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bookings Log */}
            {adminTab === 'bookings' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search patient name, phone, or illness..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden"
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {filteredBookings.length} Bookings
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 bg-white">
                  {filteredBookings.map((b) => (
                    <div key={b.id} className="p-3.5 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200 text-[10px]">
                            {b.id}
                          </span>
                          <span className="font-extrabold text-slate-900">{b.patientName}</span>
                          <span className="text-slate-500 font-semibold">• {b.phone}</span>
                        </div>
                        <p className="text-slate-600">
                          <strong>Problem:</strong> {b.diseaseProblem}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Logged: {b.createdAt} • Doctor: {b.doctor || 'Dr. Sumedha'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <a
                          href={`https://wa.me/91${b.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hello ${b.patientName}, Shubhdeep Hospital Bilhaur confirming your consultation.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200"
                          title="WhatsApp Patient"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`tel:${b.phone}`}
                          className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200"
                          title="Call Patient"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
