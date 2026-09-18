import React, { useState } from 'react';
import { Gift, Calendar, Tag, Check, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface PromotionsSectionProps {
  onApplyPromoCode: (code: string) => void;
  appliedPromoCode?: string;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  onApplyPromoCode,
  appliedPromoCode,
}) => {
  const [birthdayDate, setBirthdayDate] = useState('');
  const [birthdayClaimed, setBirthdayClaimed] = useState(false);
  const [birthdayError, setBirthdayError] = useState('');

  const handleApplyThursday = () => {
    onApplyPromoCode('THURSDAYCARIBE');
  };

  const handleClaimBirthday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdayDate) {
      setBirthdayError('Please select your birthday date.');
      return;
    }
    setBirthdayError('');
    setBirthdayClaimed(true);
    onApplyPromoCode('CUBACUMPLE15');
  };

  return (
    <section id="promotions" className="py-12 sm:py-16 bg-[#FAF4ED] border-b border-[#E8DCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C46D4E] block mb-2">
            Special Gastronomic Privileges
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2C2420] tracking-tight mb-3">
            Restaurant Promotions & Offers
          </h2>
          <p className="text-sm sm:text-base text-[#6B5D55]">
            Celebrate Caribbean traditions and memorable personal milestones with our exclusive offers at Entre Arepas y Ropa Vieja.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* PROMOTION 1: THURSDAY CARIBBEAN FLAVOR */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCF] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6D365]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF0D7] text-[#9E6510] text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" /> Weekly Special
                </span>
                <span className="font-mono text-xs bg-[#FAF7F2] border border-[#E3D8CC] px-2.5 py-1 rounded-lg text-[#C46D4E] font-bold">
                  Code: THURSDAYCARIBE
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C2420] mb-2">
                Thursday Caribbean Flavor
              </h3>

              <p className="text-sm text-[#635750] leading-relaxed mb-5">
                Every Thursday, experience selected Colombian-Cuban fusion specialties with a celebrated <strong>20% discount</strong>. Includes our famous Cuban Arepas, Caribbean Rice, and Passion Fruit Mojitos.
              </p>

              {/* Terms Box */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EDE2D5] text-xs text-[#7A6B62] space-y-1.5 mb-6">
                <strong className="text-[#3D332D] block font-semibold">Terms & Conditions:</strong>
                <p>• Valid for Dine In, Take Away, and Delivery orders placed on Thursdays or with promo code.</p>
                <p>• Applicable to selected fusion main dishes and signature cocktails.</p>
                <p>• Cannot be combined with Birthday discounts or other simultaneous promotions.</p>
              </div>
            </div>

            <button
              onClick={handleApplyThursday}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                appliedPromoCode === 'THURSDAYCARIBE'
                  ? 'bg-[#2E9B66] text-white'
                  : 'bg-[#C46D4E] hover:bg-[#A8573A] text-white'
              }`}
            >
              {appliedPromoCode === 'THURSDAYCARIBE' ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Thursday Code Applied to Order!</span>
                </>
              ) : (
                <>
                  <Tag className="w-4 h-4" />
                  <span>Apply "Thursday Caribbean Flavor" (20% OFF)</span>
                </>
              )}
            </button>
          </div>

          {/* PROMOTION 2: BIRTHDAY TREAT - 15% OFF */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCF] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E88C7D]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FDF0EE] text-[#B83E2C] text-xs font-bold uppercase tracking-wider">
                  <Gift className="w-3.5 h-3.5" /> Anniversary Celebration
                </span>
                <span className="font-mono text-xs bg-[#FAF7F2] border border-[#E3D8CC] px-2.5 py-1 rounded-lg text-[#2D7D7A] font-bold">
                  Code: CUBACUMPLE15
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C2420] mb-2">
                Birthday Treat — 15% OFF
              </h3>

              <p className="text-sm text-[#635750] leading-relaxed mb-4">
                Celebrate your birthday surrounded by Caribbean warmth and flavor! Customers celebrating their birthday receive a generous <strong>15% discount</strong> on their entire culinary order.
              </p>

              {/* Birthday Date Input Form */}
              <form onSubmit={handleClaimBirthday} className="mb-4 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE2D5]">
                <label 
                  htmlFor="birthday-date-picker"
                  className="block text-xs font-bold text-[#3D332D] mb-1.5"
                >
                  Enter Your Birthday Date:
                </label>
                <div className="flex gap-2">
                  <input
                    id="birthday-date-picker"
                    type="date"
                    value={birthdayDate}
                    onChange={(e) => setBirthdayDate(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#D9CABE] bg-white text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#2D7D7A] hover:bg-[#205E5B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Verify & Claim
                  </button>
                </div>
                {birthdayError && (
                  <span className="text-[11px] text-[#B83E2C] block mt-1">{birthdayError}</span>
                )}
                {birthdayClaimed && (
                  <span className="text-[11px] text-[#2E9B66] font-medium block mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Birthday verified! 15% discount code applied to your active order.
                  </span>
                )}
              </form>

              {/* Terms Box */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EDE2D5] text-xs text-[#7A6B62] space-y-1.5 mb-6">
                <strong className="text-[#3D332D] block font-semibold">Verification & Terms:</strong>
                <p>• Valid during your birthday week (3 days before and 3 days after your birthday).</p>
                <p>• Presentation of an official ID (Cédula de Ciudadanía or Passport) is required upon table seating or delivery delivery receipt.</p>
                <p>• Cannot be combined with other promotional coupons or corporate discounts.</p>
              </div>
            </div>

            <button
              onClick={() => onApplyPromoCode('CUBACUMPLE15')}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                appliedPromoCode === 'CUBACUMPLE15'
                  ? 'bg-[#2E9B66] text-white'
                  : 'bg-[#2D7D7A] hover:bg-[#205E5B] text-white'
              }`}
            >
              {appliedPromoCode === 'CUBACUMPLE15' ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Birthday Treat (15% OFF) Active!</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  <span>Apply Birthday Discount (15% OFF)</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
