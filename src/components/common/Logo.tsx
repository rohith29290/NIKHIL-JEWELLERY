import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'light';
  layout?: 'horizontal' | 'vertical';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  showSubtitle = true,
  className = '',
}) => {
  const dimensionMap = {
    sm: { textTitle: 'text-base sm:text-lg', textSub: 'text-[9px] sm:text-[10px]' },
    md: { textTitle: 'text-xl sm:text-2xl', textSub: 'text-[10px] sm:text-[11px]' },
    lg: { textTitle: 'text-2xl sm:text-3xl', textSub: 'text-[12px] sm:text-[13px]' },
    xl: { textTitle: 'text-4xl sm:text-5xl', textSub: 'text-[14px] sm:text-[16px]' },
  };

  const dim = dimensionMap[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      <span
        className={`font-serif font-bold tracking-[0.25em] leading-none ${dim.textTitle} ${
          variant === 'light' ? 'text-white' : 'text-[#014D40]'
        }`}
      >
        NIKHIL
      </span>
      {showSubtitle && (
        <span
          className={`font-serif font-semibold tracking-[0.38em] uppercase mt-1.5 ${dim.textSub} text-[#D4AF37]`}
        >
          JEWELLERY
        </span>
      )}
    </div>
  );
};
