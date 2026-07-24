import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'light' | 'dark';
  layout?: 'horizontal' | 'vertical';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'light',
  layout = 'horizontal',
  showSubtitle = true,
  className = '',
}) => {
  // Sizing mappings for SVG emblem and text
  const sizeMap = {
    sm: {
      emblem: 'w-8 h-8',
      title: 'text-xs sm:text-sm tracking-[0.15em]',
      subtitle: 'text-[8px] sm:text-[9px] tracking-[0.3em]',
    },
    md: {
      emblem: 'w-11 h-11 sm:w-12 sm:h-12',
      title: 'text-sm sm:text-base md:text-lg tracking-[0.18em]',
      subtitle: 'text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.35em]',
    },
    lg: {
      emblem: 'w-14 h-14 sm:w-16 sm:h-16',
      title: 'text-lg sm:text-xl md:text-2xl tracking-[0.2em]',
      subtitle: 'text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.38em]',
    },
    xl: {
      emblem: 'w-20 h-20 sm:w-28 sm:h-28',
      title: 'text-2xl sm:text-3xl md:text-4xl tracking-[0.22em]',
      subtitle: 'text-[13px] sm:text-[15px] md:text-[17px] tracking-[0.4em]',
    },
  };

  const currentSize = sizeMap[size];

  // Color mappings
  const textColor = variant === 'dark' ? 'text-[#014D40]' : 'text-white';
  const subtitleColor = 'text-[#D4AF37]';

  return (
    <div
      className={`inline-flex items-center select-none ${
        layout === 'vertical' ? 'flex-col text-center gap-2' : 'flex-row gap-3 text-left'
      } ${className}`}
    >
      {/* Original Uploaded Logo Image with Transparent Background */}
      <img
        src="/logo-transparent.png"
        alt="NIKHIL AND BROTHER JEWELLERY Logo"
        className={`${currentSize.emblem} object-contain shrink-0 transition-transform duration-300 hover:scale-105`}
      />

      {/* Brand Name Text beside the logo */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-serif font-bold uppercase ${currentSize.title} ${textColor} transition-colors drop-shadow-sm`}
          >
            NIKHIL AND BROTHER
          </span>
          {showSubtitle && (
            <span
              className={`font-serif font-bold uppercase mt-1 ${currentSize.subtitle} ${subtitleColor}`}
            >
              JEWELLERY
            </span>
          )}
        </div>
      )}
    </div>
  );
};
