import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { Home, Phone } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#014D40] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <Logo size="xl" variant="light" className="justify-center" />

        <h1 className="font-serif text-6xl font-extrabold text-[#F3E5AB]">404</h1>

        <h2 className="font-serif text-2xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="text-gray-300 text-xs font-light leading-relaxed">
          The requested page could not be located. Please return to the Nikhil and Brother Jewellery home page or contact our Hyderabad showroom directly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold-gradient text-[#014D40] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>

          <a
            href="tel:9502719122"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#D4AF37] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Showroom</span>
          </a>
        </div>
      </div>
    </div>
  );
};
