import React, { useState } from 'react';
import { Star, MessageSquare, ShieldCheck, Check, Trash2, EyeOff, Sparkles, User, ThumbsUp } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'status'>) => void;
  onToggleModerationStatus?: (reviewId: string) => void;
  onDeleteReview?: (reviewId: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
  onToggleModerationStatus,
  onDeleteReview,
}) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [name, setName] = useState('');
  const [foodRating, setFoodRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [atmosphereRating, setAtmosphereRating] = useState(5);
  const [overallRating, setOverallRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favoriteDish, setFavoriteDish] = useState('Cuban Arepa');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Star Rating Interactive Selector component
  const renderStarInput = (label: string, rating: number, setRating: (r: number) => void) => (
    <div className="flex items-center justify-between py-1.5 border-b border-[#F0E6DA] text-xs">
      <span className="font-semibold text-[#4A3E37]">{label}:</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="p-1 text-base focus:outline-hidden hover:scale-115 transition-transform cursor-pointer"
            aria-label={`Rate ${star} stars for ${label}`}
          >
            <span className={star <= rating ? 'text-[#E59838]' : 'text-[#D9CABE]'}>★</span>
          </button>
        ))}
        <span className="w-5 text-right font-bold text-[#2C2420] text-xs ml-1">{rating}.0</span>
      </div>
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddReview({
      name: name.trim(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      foodRating,
      serviceRating,
      atmosphereRating,
      overallRating,
      comment: comment.trim(),
      favoriteDish,
    });

    setName('');
    setComment('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 3500);
  };

  // Average Calculations
  const visibleReviews = isAdminMode ? reviews : reviews.filter(r => r.status === 'published');
  const avgOverall = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.overallRating, 0) / reviews.length).toFixed(1)
    : '5.0';
  const avgFood = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.foodRating, 0) / reviews.length).toFixed(1)
    : '5.0';
  const avgService = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.serviceRating, 0) / reviews.length).toFixed(1)
    : '4.9';
  const avgAtmosphere = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.atmosphereRating, 0) / reviews.length).toFixed(1)
    : '4.9';

  return (
    <section id="reviews" className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E8DCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#68B8B5] block mb-2">
              Guest Experiences in Ibagué
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2C2420] tracking-tight">
              Customer Reviews & Ratings
            </h2>
            <p className="text-sm text-[#6B5D55] mt-1">
              Read authentic feedback from diners and share your own dining memory with our community.
            </p>
          </div>

          {/* Admin Moderation Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                isAdminMode
                  ? 'bg-[#2C2420] text-white border-[#2C2420]'
                  : 'bg-white text-[#6B5D55] border-[#D9CABE] hover:border-[#C46D4E]'
              }`}
              title="Toggle Restaurant Administrator Review Moderation Mode"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#68B8B5]" />
              <span>Admin Moderation: {isAdminMode ? 'ACTIVE' : 'Off'}</span>
            </button>
          </div>
        </div>

        {/* Aggregate Ratings Overview Banner */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF] shadow-xs mb-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-[#F0E6DA]">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#C46D4E]">{avgOverall}</span>
            <div className="text-xs text-[#E59838] flex justify-center mt-0.5">★★★★★</div>
            <span className="text-xs font-semibold text-[#8C7A70] uppercase mt-1 block">Overall Score</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#2C2420]">{avgFood}</span>
            <span className="text-xs font-semibold text-[#8C7A70] uppercase mt-1 block">Food Quality</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#2C2420]">{avgService}</span>
            <span className="text-xs font-semibold text-[#8C7A70] uppercase mt-1 block">Hospitality</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#2C2420]">{avgAtmosphere}</span>
            <span className="text-xs font-semibold text-[#8C7A70] uppercase mt-1 block">Atmosphere</span>
          </div>
        </div>

        {/* Content Layout: Left Review Form, Right Reviews List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Review Submission Form (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DCCF] shadow-xs">
            <h3 className="font-serif-display font-bold text-lg text-[#2C2420] mb-1">
              Write Your Review
            </h3>
            <p className="text-xs text-[#7A6B62] mb-4">
              Rate your meal, our hospitality, and your overall experience.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-[#3D332D] mb-1">
                  Your Full Name:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Camila Rodríguez"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                />
              </div>

              {/* 4 Ratings Subsections */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EDE2D5] space-y-1">
                <span className="block text-[11px] font-bold text-[#8C7A70] uppercase tracking-wider mb-1">
                  Rate Categories (1–5 Stars)
                </span>
                {renderStarInput('Food', foodRating, setFoodRating)}
                {renderStarInput('Service', serviceRating, setServiceRating)}
                {renderStarInput('Restaurant Atmosphere', atmosphereRating, setAtmosphereRating)}
                {renderStarInput('Overall Experience', overallRating, setOverallRating)}
              </div>

              {/* Favorite Dish Optional Tag */}
              <div>
                <label className="block text-xs font-bold text-[#3D332D] mb-1">
                  Favorite Dish Ordered:
                </label>
                <select
                  value={favoriteDish}
                  onChange={(e) => setFavoriteDish(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                >
                  <option value="Cuban Arepa">Cuban Arepa ($23,000 COP)</option>
                  <option value="Colombian Lechón">Colombian Lechón ($34,000 COP)</option>
                  <option value="Caribbean Rice">Caribbean Rice ($32,000 COP)</option>
                  <option value="Cuban Ropa Vieja">Cuban Ropa Vieja ($32,000 COP)</option>
                  <option value="Passion Fruit Mojito">Passion Fruit Mojito ($7,000 COP)</option>
                  <option value="Traditional 3 Leches Sponge">Traditional 3 Leches Sponge ($11,000 COP)</option>
                  <option value="Cuban Flan">Cuban Flan ($12,000 COP)</option>
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-[#3D332D] mb-1">
                  Write Your Review:
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details of your experience, the flavors, aromas, and staff service..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#C46D4E] hover:bg-[#A8573A] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Submit Review
              </button>

              {submittedMessage && (
                <div className="p-3 bg-[#EBF7F2] text-[#1E5C3D] border border-[#BDE5D3] rounded-xl text-xs font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2E9B66]" />
                  <span>Thank you! Your review has been successfully published to our website.</span>
                </div>
              )}
            </form>
          </div>

          {/* Public Reviews Stream (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCF]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A70]">
                Public Reviews ({visibleReviews.length})
              </span>
              {isAdminMode && (
                <span className="text-xs bg-[#FFF5F2] text-[#B83E2C] px-2 py-0.5 rounded-md font-semibold">
                  Admin Panel Active: You can unpublish or remove flagged reviews
                </span>
              )}
            </div>

            {visibleReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-[#E8DCCF] shadow-xs space-y-3 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#FAF4ED] text-[#C46D4E] flex items-center justify-center font-bold text-xs border border-[#E8DCCF]">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#2C2420]">{rev.name}</h4>
                      <span className="text-[11px] text-[#8C7A70]">{rev.date}</span>
                    </div>
                  </div>

                  {/* Overall Star Badge */}
                  <div className="flex items-center gap-1 bg-[#FFF9E6] px-2.5 py-1 rounded-lg border border-[#F5E2A8]">
                    <span className="text-xs text-[#D9822B]">★</span>
                    <span className="text-xs font-bold text-[#4A3E37]">{rev.overallRating}.0</span>
                  </div>
                </div>

                {/* Star Category Breakdown Pills */}
                <div className="flex flex-wrap gap-2 text-[11px] text-[#7A6B62]">
                  <span className="bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#EFE5D9]">
                    Food: <strong>{rev.foodRating}★</strong>
                  </span>
                  <span className="bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#EFE5D9]">
                    Service: <strong>{rev.serviceRating}★</strong>
                  </span>
                  <span className="bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#EFE5D9]">
                    Atmosphere: <strong>{rev.atmosphereRating}★</strong>
                  </span>
                  {rev.favoriteDish && (
                    <span className="bg-[#E8F4F3] text-[#2D7D7A] px-2 py-0.5 rounded-md font-semibold">
                      Favorite: {rev.favoriteDish}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#4A3E37] leading-relaxed italic">
                  “{rev.comment}”
                </p>

                {/* Admin Moderation Bar */}
                {isAdminMode && (
                  <div className="pt-2 border-t border-[#F0E6DA] flex items-center justify-between text-xs">
                    <span className={`font-semibold text-[11px] ${
                      rev.status === 'published' ? 'text-[#2E9B66]' : 'text-[#B83E2C]'
                    }`}>
                      Status: {rev.status.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2">
                      {onToggleModerationStatus && (
                        <button
                          onClick={() => onToggleModerationStatus(rev.id)}
                          className="px-2 py-1 bg-[#F5EFE6] hover:bg-[#EAE0D3] rounded text-[#4A3E37] text-[11px] cursor-pointer"
                        >
                          {rev.status === 'published' ? 'Hide / Moderate' : 'Approve & Publish'}
                        </button>
                      )}
                      {onDeleteReview && (
                        <button
                          onClick={() => onDeleteReview(rev.id)}
                          className="px-2 py-1 bg-[#FDF0EE] text-[#B83E2C] hover:bg-[#FADCD7] rounded text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
