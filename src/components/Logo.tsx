import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showSlogan = false }) => {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-[#F6D365] via-[#E88C7D] to-[#68B8B5] p-[2px] shadow-sm`}>
        <div className={`flex items-center justify-center rounded-[14px] bg-[#FAF7F2] ${isLarge ? 'w-14 h-14' : isSmall ? 'w-9 h-9' : 'w-11 h-11'}`}>
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isLarge ? 'w-10 h-10' : isSmall ? 'w-6 h-6' : 'w-8 h-8'}
            aria-label="Entre Arepas y Ropa Vieja Emblem"
          >
            {/* Golden Arepa Outline */}
            <ellipse cx="32" cy="34" rx="22" ry="18" fill="#F8E1A0" stroke="#D9822B" strokeWidth="2.5" />
            <ellipse cx="32" cy="34" rx="16" ry="12" fill="#FAF7F2" stroke="#E59838" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Caribbean Palm Leaf / Colombian Botanical Accent */}
            <path
              d="M16 22C24 14 36 12 48 16C40 24 30 26 22 28C18 29 16 26 16 22Z"
              fill="#78A389"
              opacity="0.85"
            />
            {/* Hibiscus / Tropical Flower Petal */}
            <path
              d="M32 24C35 18 42 19 44 23C46 27 41 31 36 31C33 31 31 28 32 24Z"
              fill="#E88C7D"
            />
            <circle cx="36" cy="25" r="2" fill="#FAF7F2" />

            {/* Cuban Star Accent */}
            <polygon
              points="32,28 33.2,31.5 37,31.5 34,33.5 35.2,37 32,35 28.8,37 30,33.5 27,31.5 30.8,31.5"
              fill="#C46D4E"
            />

            {/* Golden Grill Marks */}
            <path d="M26 31L38 31" stroke="#C46D4E" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M24 35L40 35" stroke="#C46D4E" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M28 39L36 39" stroke="#C46D4E" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif-display font-bold tracking-tight text-[#2C2420] ${
            isLarge ? 'text-2xl sm:text-3xl' : isSmall ? 'text-base' : 'text-lg sm:text-xl'
          }`}>
            Entre Arepas <span className="font-sans font-light text-[#E88C7D]">&</span> Ropa Vieja
          </span>
        </div>
        {showSlogan && (
          <span className="text-xs sm:text-sm font-medium tracking-wide text-[#68B8B5] italic">
            Two Cultures, One Table, Endless Flavor
          </span>
        )}
        {!showSlogan && (
          <span className="text-[10px] tracking-wider uppercase font-semibold text-[#8C7A70]">
            Colombian • Cuban Fusion • Ibagué
          </span>
        )}
      </div>
    </div>
  );
};
