import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  ThumbsUp, 
  Sparkles,
  ExternalLink,
  MessageSquareHeart
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { HOSPITAL_CONTACT } from '../../data/defaultHospitalData';

export const ReviewsModal: React.FC = () => {
  const { activeModal, setActiveModal, reviews, addReview } = useHospital();

  const [showAddForm, setShowAddForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [locationText, setLocationText] = useState('Bilhaur');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (activeModal !== 'reviews') return null;

  const totalReviewsCount = 24 + (reviews.length - 6);
  const averageRating = "4.4";

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addReview({
      author: authorName.trim() || 'Verified Patient',
      rating: userRating,
      comment: commentText.trim(),
      location: locationText.trim() || 'Bilhaur, Kanpur',
      service: 'Patient Care'
    });

    setAuthorName('');
    setCommentText('');
    setShowAddForm(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">RATINGS & REVIEWS (4.4★)</h3>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                  HOTSPOT 2
                </span>
              </div>
              <p className="text-amber-200 text-xs">
                Shubhdeep Hospital, Bilhaur • 4.4★ Rating (24 Reviews)
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

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {/* 1. TOP SECTION: OVERALL RATING (4.4★) & RATING BREAKDOWN */}
          <div className="p-5 bg-gradient-to-b from-amber-50/70 to-white space-y-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              {/* Overall Score Badge */}
              <div className="text-center sm:text-left flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl border border-amber-200 shadow-sm text-center min-w-[85px]">
                  <span className="text-4xl font-black text-slate-900 block leading-none">{averageRating}</span>
                  <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/40 text-amber-400'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">out of 5.0</span>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>24 Verified Patient Reviews</span>
                  </div>
                  <h4 className="text-base font-black text-slate-900">
                    Trusted Healthcare in Bilhaur & Kanpur
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    92% patients recommend Dr. Sumedha Sachan for maternity & surgery.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Close Form' : 'Write Feedback'}</span>
              </button>
            </div>

            {/* Rating Breakdown Bar Chart */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-600 font-bold text-[11px]">5 Star</span>
                <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="w-16 text-right text-slate-500 font-medium text-[11px]">18 reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-600 font-bold text-[11px]">4 Star</span>
                <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400/80 h-full rounded-full" style={{ width: '21%' }}></div>
                </div>
                <span className="w-16 text-right text-slate-500 font-medium text-[11px]">5 reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-600 font-bold text-[11px]">3 Star</span>
                <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400/50 h-full rounded-full" style={{ width: '4%' }}></div>
                </div>
                <span className="w-16 text-right text-slate-500 font-medium text-[11px]">1 review</span>
              </div>
            </div>
          </div>

          {/* 2. CENTER/MIDDLE SECTION: HIGHLY PROMINENT, LARGE GLOWING GOOGLE REVIEW BUTTON */}
          <div className="p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-orange-500/10 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-lg">
              <a
                href={HOSPITAL_CONTACT.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-98 transition-all border-2 border-amber-300 ring-4 ring-amber-400/30 animate-pulse hover:animate-none"
              >
                <span className="text-xl sm:text-2xl animate-spin duration-1000">⭐</span>
                <span className="tracking-tight drop-shadow-md">
                  Google पर Asli Review Likhne Ke Liye Yahan Click Karein
                </span>
                <ExternalLink className="w-4 h-4 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-[11px] text-amber-900/80 font-bold mt-2">
                ✓ Redirects directly to Shubhdeep Hospital's Official Google Review & Maps Profile
              </p>
            </div>
          </div>

          {/* Add Review Inline Form (if toggled) */}
          {showAddForm && (
            <form onSubmit={handleAddReviewSubmit} className="p-5 bg-slate-50 space-y-3 animate-in fade-in">
              <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquareHeart className="w-4 h-4 text-amber-600" />
                <span>Write Hospital Experience</span>
              </h5>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-0.5 focus:outline-hidden"
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          (hoverRating || userRating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-700 ml-1">{userRating} / 5 Stars</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Patient / Attendant Name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden bg-white"
                />
                <input
                  type="text"
                  placeholder="Area (e.g. Bilhaur, Makanpur, Kannauj)"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden bg-white"
                />
              </div>

              <textarea
                required
                rows={2}
                placeholder="Describe doctor care, delivery experience, staff cleanliness, or billing..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden resize-none bg-white"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Submit Feedback
              </button>
            </form>
          )}

          {submittedSuccess && (
            <div className="m-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your patient review has been published.</span>
            </div>
          )}

          {/* 3. BELOW SECTION: RECENT PATIENT FEEDBACK AND REVIEWS */}
          <div className="p-5 space-y-3.5">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
              Recent Verified Patient Testimonials
            </h5>

            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xs transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <h6 className="font-bold text-xs text-slate-900">{rev.author}</h6>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {rev.location} • {rev.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-slate-700 ml-1">{rev.rating}.0</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px] text-slate-500">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
                      {rev.service}
                    </span>
                    <span className="flex items-center gap-1 text-teal-700 font-semibold">
                      <ThumbsUp className="w-3 h-3" />
                      Verified Patient
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
