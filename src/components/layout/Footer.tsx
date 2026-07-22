import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002D25] text-white border-t-2 border-[#D4AF37]/40 relative overflow-hidden">
      {/* Background Subtle Gold Ornament Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Store Brand Info */}
          <div className="space-y-4">
            <Logo size="lg" variant="light" />
            <p className="text-gray-300 text-xs leading-relaxed pt-2">
              Crafting timeless elegance and heirloom jewellery in Hyderabad. Built on decades of trust, 100% certified 916 hallmarked purity, and unmatched royal artistry.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#014D40] px-3 py-1.5 rounded-md border border-[#D4AF37]/30 text-[11px] text-[#F3E5AB]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>BIS 916 Hallmarked</span>
              </div>
              <div className="flex items-center gap-2 bg-[#014D40] px-3 py-1.5 rounded-md border border-[#D4AF37]/30 text-[11px] text-[#F3E5AB]">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>IGI Certified</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#F3E5AB] border-b border-[#D4AF37]/30 pb-2 mb-4 tracking-wide">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link to="/" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">›</span> Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link to="/gold-rate" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">›</span> Today's Gold Rate
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">›</span> Book VIP Appointment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">›</span> Showroom Location & Map
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">›</span> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Store Address & Hours */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#F3E5AB] border-b border-[#D4AF37]/30 pb-2 mb-4 tracking-wide">
              Showroom Location
            </h3>
            <ul className="space-y-3.5 text-xs text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Nikhil and Brother Jewellery</strong>
                  <br />
                  Nandi Hills, Nagarjuna Hills,
                  <br />
                  Meerpet, Hyderabad, Telangana
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Business Hours:</p>
                  <p className="text-gray-300">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p className="text-gray-300">Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Appointments */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#F3E5AB] border-b border-[#D4AF37]/30 pb-2 mb-4 tracking-wide">
              Direct Contact
            </h3>
            <div className="space-y-3 text-xs text-gray-300">
              <p>For inquiries, gold rate locks, or custom orders:</p>
              <div className="space-y-2">
                <a
                  href="tel:9502719122"
                  className="flex items-center gap-2 bg-[#014D40] hover:bg-[#014D40]/80 border border-[#D4AF37]/40 px-3 py-2 rounded-lg text-[#F3E5AB] font-semibold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  Call 9502719122
                </a>
                <a
                  href="tel:9912381112"
                  className="flex items-center gap-2 bg-[#014D40] hover:bg-[#014D40]/80 border border-[#D4AF37]/40 px-3 py-2 rounded-lg text-[#F3E5AB] font-semibold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  Call 9912381112
                </a>
              </div>

              <div className="pt-2">
                <Link
                  to="/appointment"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold-gradient text-[#014D40] font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg shadow-md hover:bg-gold-gradient-hover transition-all"
                >
                  Book Private Viewing
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} NIKHIL AND BROTHER JEWELLERY. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" /> for Hyderabad
          </p>
        </div>
      </div>

      {/* Elegant Dark Bottom Status Bar */}
      <div className="bg-[#001D18] text-white border-t border-[#D4AF37]/30 py-3.5 px-4 sm:px-10 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-gray-400">© {new Date().getFullYear()} Nikhil and Brother Jewellery</div>
          <div className="flex items-center gap-4 sm:gap-6 text-[#F3E5AB]">
            <span className="text-[#D4AF37]">BIS Hallmarked</span>
            <span className="text-gray-400">•</span>
            <span>IGI Certified Diamonds</span>
            <span className="text-gray-400">•</span>
            <span>Lifetime Exchange</span>
          </div>
          <div className="flex items-center text-[#D4AF37] font-bold">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse shadow-[0_0_8px_#34d399]" />
            STORE OPEN NOW
          </div>
        </div>
      </div>
    </footer>
  );
};
