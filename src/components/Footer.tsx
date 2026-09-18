import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Clock, Heart, ArrowUp } from 'lucide-react';
import { RESTAURANT_PHONE } from '../utils/orderUtils';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C2420] text-[#E8DCCF] pt-14 pb-8 border-t border-[#3D332D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3D332D]">
          
          {/* Col 1: Brand & Slogan (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" showSlogan={true} />
            
            <p className="text-sm text-[#B5A89E] leading-relaxed">
              Traditional Colombian and Cuban cuisine with creative Caribbean fusion. Celebrating the warmth, heritage, and joy of two sister cultures in the musical capital of Ibagué, Tolima.
            </p>

            <div className="pt-2 text-xs text-[#E8DCCF] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C46D4E] shrink-0" />
                <span>Plazoleta de Calambeo, junto al Mercacentro, Ibagué, Tolima, Colombia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#68B8B5] shrink-0" />
                <a href={`tel:${RESTAURANT_PHONE}`} className="hover:underline text-white font-semibold">
                  {RESTAURANT_PHONE}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-display text-base font-bold text-white tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B5A89E]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Full Menu & Dietary Filters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('build-order')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Build Your Own Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('promotions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thursday & Birthday Promotions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('suggestions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Help Us Improve (Suggestions)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Hours (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-display text-base font-bold text-white tracking-wide">
              Operating Hours
            </h4>
            <div className="space-y-2 text-xs text-[#B5A89E]">
              <div className="flex justify-between py-1 border-b border-[#3D332D]">
                <span>Breakfast:</span>
                <span className="text-white font-medium">6:00 AM – 10:00 AM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3D332D]">
                <span>Lunch:</span>
                <span className="text-white font-medium">11:30 AM – 2:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3D332D]">
                <span>Afternoon Snacks:</span>
                <span className="text-white font-medium">3:30 PM – 5:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3D332D] text-[#8C7A70]">
                <span>Dinner Service:</span>
                <span>Admin Activation / Events</span>
              </div>
            </div>
            <p className="text-[11px] text-[#8C7A70] pt-1">
              *Daily freshly prepared batches. Delivery active across all Ibagué neighborhoods during meal periods.
            </p>
          </div>

          {/* Col 4: Back to Top & Legal (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-2xl bg-[#3D332D] hover:bg-[#4D4039] text-[#E8DCCF] transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="mt-8 md:mt-0 text-left md:text-right text-[11px] text-[#8C7A70]">
              <span className="block font-medium text-[#B5A89E]">Entre Arepas y Ropa Vieja</span>
              <span className="block">All rights reserved © {new Date().getFullYear()}</span>
              <span className="block mt-1">Ibagué, Tolima, Colombia</span>
            </div>
          </div>

        </div>

        {/* Bottom Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7A70]">
          <p>
            English Language Interface for International Diners, Tourists & Colombian Community.
          </p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#E88C7D] fill-[#E88C7D]" /> for Caribbean & Tolimense culinary lovers.
          </p>
        </div>

      </div>
    </footer>
  );
};
