import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Clock, Phone, Calendar, Menu, X, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { apiService } from '../../services/api';
import { GoldRate } from '../../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [goldRate, setGoldRate] = useState<GoldRate | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Clock ticker
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }) +
          ' | ' +
          now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch live gold rate ticker
    const fetchGoldRate = () => {
      apiService.getGoldRate().then(setGoldRate).catch(console.error);
    };
    fetchGoldRate();

    const interval = setInterval(fetchGoldRate, 300000); // refresh every 5 mins
    return () => clearInterval(interval);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/gold-rate', label: 'Gold Rate' },
    { path: '/appointment', label: 'Book Appointment' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin', label: 'Admin Portal' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Banner Bar - Live Gold Rate Ticker & Store Hours */}
      <div className="bg-[#00382E] text-white text-xs py-1.5 px-4 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Ticker & Live Clock */}
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <div className="flex items-center gap-1.5 text-[#F3E5AB] font-medium">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>{currentTime || 'Loading Live Clock...'}</span>
            </div>
            {goldRate && (
              <Link
                to="/gold-rate"
                className="inline-flex items-center gap-2 bg-[#014D40] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all hover:scale-105"
              >
                <TrendingUp className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-gray-200">22K Gold:</span>
                <span className="font-bold text-[#F3E5AB]">₹{goldRate.rate22k.toLocaleString('en-IN')}/g</span>
                <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-900/60 px-1 rounded">
                  Live
                </span>
              </Link>
            )}
          </div>

          {/* Quick Contact & Certification */}
          <div className="flex items-center gap-4 text-gray-300 text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1 text-[#F3E5AB]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              100% BIS 916 Hallmarked Gold
            </span>
            <div className="flex items-center gap-3">
              <a href="tel:9502719122" className="hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
                <Phone className="w-3 h-3 text-[#D4AF37]" />
                9502719122
              </a>
              <span>|</span>
              <a href="tel:9912381112" className="hover:text-[#D4AF37] transition-colors">
                9912381112
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#014D40] text-white border-b border-[#D4AF37]/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="md" variant="light" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 transition-colors ${
                  isActive(link.path)
                    ? 'text-[#F3E5AB] border-b-2 border-[#D4AF37]'
                    : 'text-gray-200 hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 bg-gold-gradient hover:bg-gold-gradient-hover text-[#014D40] font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-lg hover:shadow-gold glow-gold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-200 hover:text-[#D4AF37] p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#00382E] border-b border-[#D4AF37]/30 text-white px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#014D40] text-[#F3E5AB] font-bold border-l-4 border-[#D4AF37]'
                    : 'text-gray-200 hover:bg-[#014D40] hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-700 space-y-3">
            <Link
              to="/appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gold-gradient text-[#014D40] font-bold text-sm tracking-wider uppercase py-3 rounded-lg shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>

            <div className="text-center text-xs text-gray-300 pt-2">
              <p>📍 Nandi Hills, Nagarjuna Hills, Meerpet, Hyderabad</p>
              <p className="mt-1 font-medium text-[#F3E5AB]">📞 9502719122 | 9912381112</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
