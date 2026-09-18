import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle, Sparkles, Moon, Sun, Coffee, Utensils } from 'lucide-react';
import { getRestaurantStatus, SERVICE_WINDOWS } from '../utils/orderUtils';

interface HoursStatusBannerProps {
  overrideHour?: number;
  overrideMinute?: number;
  onOverrideTimeChange?: (hour: number | undefined, minute: number | undefined) => void;
}

export const HoursStatusBanner: React.FC<HoursStatusBannerProps> = ({
  overrideHour,
  overrideMinute,
  onOverrideTimeChange,
}) => {
  const [showTester, setShowTester] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const status = getRestaurantStatus(overrideHour, overrideMinute);

  return (
    <div className="w-full bg-[#FAF4ED] border-b border-[#E8DCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          
          {/* Live Status Pill */}
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold text-xs transition-colors shadow-xs ${
                status.isOpen
                  ? 'bg-[#EBF7F2] text-[#246A4A] border border-[#BDE5D3]'
                  : 'bg-[#FDF2F0] text-[#A63A29] border border-[#F6CBC5]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-[#2E9B66] animate-pulse' : 'bg-[#D94F3D]'}`} />
              {status.isOpen ? 'OPEN NOW' : 'CURRENTLY CLOSED'}
            </span>

            <span className="text-[#5C4F48] font-medium hidden sm:inline">
              {status.isOpen ? (
                <>Serving: <strong className="text-[#2C2420]">{status.currentWindow}</strong></>
              ) : (
                <>Next Service: <strong className="text-[#2C2420]">{status.nextWindow}</strong></>
              )}
            </span>

            {overrideHour !== undefined && (
              <span className="text-[11px] bg-[#E88C7D]/15 text-[#C45946] px-2 py-0.5 rounded font-mono">
                Simulated Time: {status.currentTimeString}
              </span>
            )}
          </div>

          {/* Opening Windows Pill List */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1 bg-white/80 border border-[#E3D8CC] px-2.5 py-1 rounded-lg text-[#554740]">
              <Coffee className="w-3.5 h-3.5 text-[#C46D4E]" />
              <span className="font-semibold text-[#2C2420]">Breakfast:</span> 6:00 AM – 10:00 AM
            </div>

            <div className="flex items-center gap-1 bg-white/80 border border-[#E3D8CC] px-2.5 py-1 rounded-lg text-[#554740]">
              <Sun className="w-3.5 h-3.5 text-[#D9822B]" />
              <span className="font-semibold text-[#2C2420]">Lunch:</span> 11:30 AM – 2:00 PM
            </div>

            <div className="flex items-center gap-1 bg-white/80 border border-[#E3D8CC] px-2.5 py-1 rounded-lg text-[#554740]">
              <Sparkles className="w-3.5 h-3.5 text-[#68B8B5]" />
              <span className="font-semibold text-[#2C2420]">Snacks:</span> 3:30 PM – 5:00 PM
            </div>

            {/* Dinner Status Warning Pill */}
            <div className="flex items-center gap-1 bg-[#F5EFE6] border border-[#D9CABE] px-2.5 py-1 rounded-lg text-[#7A6B62]">
              <Moon className="w-3.5 h-3.5 text-[#9C8275]" />
              <span className="font-semibold">Dinner:</span> Menu Active (Special Event Only)
            </div>

            {/* Time Simulator Toggle Button */}
            {onOverrideTimeChange && (
              <button
                type="button"
                onClick={() => setShowTester(!showTester)}
                className="text-[11px] text-[#2D7D7A] hover:text-[#1F5856] underline font-medium cursor-pointer ml-1"
                title="Test how the site looks during different service windows"
              >
                {showTester ? 'Hide Simulator' : 'Test Service Hours'}
              </button>
            )}
          </div>
        </div>

        {/* Time Simulator Tray */}
        {showTester && onOverrideTimeChange && (
          <div className="mt-2.5 pt-2.5 border-t border-[#E8DCCF] flex flex-wrap items-center gap-2 text-xs bg-white p-2.5 rounded-lg">
            <span className="font-semibold text-[#3D332D]">Simulate Hour:</span>
            <button
              onClick={() => onOverrideTimeChange(undefined, undefined)}
              className={`px-2 py-1 rounded text-xs border ${
                overrideHour === undefined ? 'bg-[#2D7D7A] text-white border-[#2D7D7A]' : 'bg-[#F7F3EE] border-[#DDD3C7] text-[#4A3E37]'
              }`}
            >
              Real Device Time ({currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
            </button>
            <button
              onClick={() => onOverrideTimeChange(8, 0)}
              className={`px-2 py-1 rounded text-xs border ${
                overrideHour === 8 ? 'bg-[#2D7D7A] text-white border-[#2D7D7A]' : 'bg-[#F7F3EE] border-[#DDD3C7] text-[#4A3E37]'
              }`}
            >
              Breakfast (8:00 AM)
            </button>
            <button
              onClick={() => onOverrideTimeChange(12, 30)}
              className={`px-2 py-1 rounded text-xs border ${
                overrideHour === 12 ? 'bg-[#2D7D7A] text-white border-[#2D7D7A]' : 'bg-[#F7F3EE] border-[#DDD3C7] text-[#4A3E37]'
              }`}
            >
              Lunch (12:30 PM)
            </button>
            <button
              onClick={() => onOverrideTimeChange(16, 15)}
              className={`px-2 py-1 rounded text-xs border ${
                overrideHour === 16 ? 'bg-[#2D7D7A] text-white border-[#2D7D7A]' : 'bg-[#F7F3EE] border-[#DDD3C7] text-[#4A3E37]'
              }`}
            >
              Snacks (4:15 PM)
            </button>
            <button
              onClick={() => onOverrideTimeChange(20, 0)}
              className={`px-2 py-1 rounded text-xs border ${
                overrideHour === 20 ? 'bg-[#2D7D7A] text-white border-[#2D7D7A]' : 'bg-[#F7F3EE] border-[#DDD3C7] text-[#4A3E37]'
              }`}
            >
              Closed / Evening (8:00 PM)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
