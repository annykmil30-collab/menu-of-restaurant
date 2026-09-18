import React from 'react';
import { ArrowRight, Utensils, Heart, Sparkles, MapPin, Clock } from 'lucide-react';
import { formatCOP } from '../utils/orderUtils';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
  onOurStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onOrderNow,
  onOurStory,
}) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#FAF4ED] via-[#FAF7F2] to-[#FAF7F2] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EBE1D5]">
      {/* Subtle Caribbean & Botanical Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F6D365]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E88C7D]/12 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#68B8B5]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Story & Hero Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Location & Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E3D8CC] shadow-xs text-xs font-semibold text-[#5B4C43]">
              <span className="flex h-2 w-2 rounded-full bg-[#E88C7D]" />
              <MapPin className="w-3.5 h-3.5 text-[#C46D4E]" />
              <span>Ibagué, Tolima, Colombia</span>
              <span className="text-[#B5A89E]">•</span>
              <span className="text-[#68B8B5]">Caribbean Fusion</span>
            </div>

            {/* Main Brand Title & Slogan */}
            <div className="space-y-3">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C2420] tracking-tight leading-[1.1]">
                ENTRE AREPAS <br />
                <span className="text-[#C46D4E] font-serif-display italic font-normal">y</span> ROPA VIEJA
              </h1>
              
              <p className="font-serif-display text-xl sm:text-2xl text-[#68B8B5] italic font-medium tracking-wide">
                “Two Cultures, One Table, Endless Flavor.”
              </p>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-[#5A4E46] leading-relaxed max-w-xl mx-auto lg:mx-0">
              A Colombian-Cuban restaurant where traditional flavors, Caribbean warmth and modern culinary creativity come together. Born in the heart of Ibagué, fusing Tolimense soul with Havana zest.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOrderNow}
                className="px-6 py-3.5 rounded-xl bg-[#C46D4E] hover:bg-[#A8573A] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-97 cursor-pointer flex items-center gap-2"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F7EFE6] text-[#2C2420] border border-[#DDD3C7] font-semibold text-sm shadow-xs transition-all active:scale-97 cursor-pointer flex items-center gap-2"
              >
                <Utensils className="w-4 h-4 text-[#C46D4E]" />
                <span>Explore Menu</span>
              </button>

              <button
                onClick={onOurStory}
                className="px-5 py-3.5 rounded-xl bg-transparent hover:bg-[#F2E8DC]/60 text-[#5B4C43] font-medium text-sm transition-colors cursor-pointer"
              >
                Our Story
              </button>
            </div>

            {/* Key Signature Highlights */}
            <div className="pt-6 border-t border-[#E8DCCF] grid grid-cols-3 gap-3 text-center sm:text-left">
              <div>
                <span className="block text-xs font-semibold text-[#8C7A70] uppercase">Cuban Arepa</span>
                <span className="font-bold text-sm text-[#2C2420]">Ropa Vieja & Queso</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-[#8C7A70] uppercase">Tolima Lechón</span>
                <span className="font-bold text-sm text-[#2C2420]">Crisp Mojo Pork</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-[#8C7A70] uppercase">Drinks & Desserts</span>
                <span className="font-bold text-sm text-[#2C2420]">Maracuyá Mojitos</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Realistic Food Presentation */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-16/11 bg-[#FAF4ED]">
                <img
                  src="/images/hero_fusion_spread_1789756993190.jpg"
                  alt="Colombian-Cuban fusion banquet spread with arepas, ropa vieja, lechón, and tropical cocktails in Ibagué"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Subtle Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-medium mb-1">
                    <Sparkles className="w-3 h-3 text-[#F6D365]" />
                    <span>Handcrafted in Ibagué, Tolima</span>
                  </div>
                  <p className="font-serif-display text-base sm:text-lg font-bold">
                    Colombian Lechón, Cuban Ropa Vieja & Golden Arepas
                  </p>
                </div>
              </div>

              {/* Floating Testimonial Card */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#E8DCCF] max-w-[240px] sm:max-w-[270px] hidden sm:block">
                <div className="flex items-center gap-1 text-[#D9822B] mb-1">
                  {'★'.repeat(5)}
                </div>
                <p className="text-xs text-[#4A3E37] italic line-clamp-2">
                  “The best Colombian-Cuban fusion we’ve ever tasted in Ibagué. The Cuban Arepa is an absolute masterpiece!”
                </p>
                <span className="text-[10px] font-semibold text-[#8C7A70] block mt-1">
                  — Verified Diner from Ibagué
                </span>
              </div>

              {/* Floating Open Pill */}
              <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#E8DCCF] flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E88C7D]/20 flex items-center justify-center text-[#C46D4E]">
                  <Utensils className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-[#8C7A70]">Cuisine</span>
                  <span className="text-xs font-bold text-[#2C2420]">Tradition + Fusion</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
