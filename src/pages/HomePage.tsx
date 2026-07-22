import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Logo } from '../components/common/Logo';
import {
  Calendar,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Award,
  Gem,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import { apiService } from '../services/api';
import { GoldRate, CollectionItem } from '../types';
import { JEWELLERY_COLLECTIONS, TESTIMONIALS, FAQS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const [goldRate, setGoldRate] = useState<GoldRate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    apiService.getGoldRate().then(setGoldRate).catch(console.error);
  }, []);

  const filteredCollections =
    selectedCategory === 'All'
      ? JEWELLERY_COLLECTIONS
      : JEWELLERY_COLLECTIONS.filter((col) => col.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] bg-[#014D40] text-white flex items-center justify-center overflow-hidden border-b-4 border-[#D4AF37]">
        {/* Background Overlay Effects & Shimmer Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00382E] via-[#014D40] to-[#002820] opacity-90" />
        <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

        {/* Floating Golden Ambient Ornaments */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating Geometric Elegant Ring */}
        <div className="absolute bottom-10 right-0 transform translate-x-1/4 opacity-20 pointer-events-none">
          <div className="w-96 h-96 rounded-full border border-[#D4AF37]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center z-10 flex flex-col items-center">
          {/* Animated Crest Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Logo size="xl" variant="light" layout="vertical" className="justify-center" />
          </motion.div>

          {/* Subtitle Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#00382E] border border-[#D4AF37]/50 px-4 py-1.5 rounded-full mb-6 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-bold">
              HERITAGE & PURITY • HYDERABAD
            </span>
          </motion.div>

          {/* Large Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] max-w-4xl"
          >
            Timeless <span className="text-[#D4AF37] italic">Jewellery</span> for Every Celebration
          </motion.h1>

          {/* Luxury Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-gray-200 text-base sm:text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed font-light"
          >
            Experience the pinnacle of Hyderabad's royal craftsmanship. Certified 22K hallmarked gold, Nizam Kundan Polki sets, and certified diamond solitaire collections at Meerpet.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md"
          >
            <Link
              to="/appointment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#c49f2e] text-[#014D40] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-sm shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </Link>

            <Link
              to="/gold-rate"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent hover:bg-[#D4AF37] hover:text-[#014D40] text-[#D4AF37] border border-[#D4AF37] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-sm shadow-lg transition-all duration-300"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Today's Gold Price</span>
            </Link>
          </motion.div>

          {/* Gold Rate Quick Ticker Card */}
          {goldRate && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 bg-[#00382E]/90 backdrop-blur-md border border-[#D4AF37]/50 border-l-4 border-l-[#D4AF37] rounded-sm p-5 sm:p-6 w-full max-w-2xl shadow-2xl text-left"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Hyderabad • Live Ticker</span>
                    <h2 className="text-lg font-bold font-serif text-white">Today's Gold Rate</h2>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="bg-[#014D40] px-4 py-2 rounded border border-[#D4AF37]/30 border-l-2 border-l-[#D4AF37]">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase block">24K Pure Gold</span>
                    <span className="text-lg font-serif font-bold text-white">
                      ₹{goldRate.rate24k.toLocaleString('en-IN')} <span className="text-[10px] font-sans text-gray-400">/gm</span>
                    </span>
                  </div>

                  <div className="bg-[#014D40] px-4 py-2 rounded border border-[#D4AF37]/30 border-l-2 border-l-[#D4AF37]">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase block">22K Standard</span>
                    <span className="text-lg font-serif font-bold text-[#F3E5AB]">
                      ₹{goldRate.rate22k.toLocaleString('en-IN')} <span className="text-[10px] font-sans text-gray-400">/gm</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* TRUST PILLARS SECTION */}
      <section className="py-16 bg-white border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 p-6 rounded-xl bg-[#F8F6F2] border border-[#D4AF37]/30 hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-[#014D40] text-[#D4AF37]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#014D40] text-base">100% BIS Hallmarked</h3>
                <p className="text-xs text-gray-600 mt-1">Guaranteed 916 gold purity with government hallmark seal.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-xl bg-[#F8F6F2] border border-[#D4AF37]/30 hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-[#014D40] text-[#D4AF37]">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#014D40] text-base">Certified Diamonds</h3>
                <p className="text-xs text-gray-600 mt-1">IGI & GIA certified VVS-EF brilliant diamond solitaire collection.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-xl bg-[#F8F6F2] border border-[#D4AF37]/30 hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-[#014D40] text-[#D4AF37]">
                <Gem className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#014D40] text-base">Transparent Pricing</h3>
                <p className="text-xs text-gray-600 mt-1">Clear gold weight breakups and competitive making charges.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-xl bg-[#F8F6F2] border border-[#D4AF37]/30 hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-[#014D40] text-[#D4AF37]">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#014D40] text-base">VIP Showroom Lounge</h3>
                <p className="text-xs text-gray-600 mt-1">Private viewing lounge for booked bridal appointments in Meerpet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS SHOWCASE */}
      <section className="py-20 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">Royal Masterpieces</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#014D40] mt-2 mb-4">
              Explore Our Jewellery Collections
            </h2>
            <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
            <p className="text-gray-600 text-sm mt-4 font-light">
              From traditional Nizam bridal sets to modern solitaire diamonds, discover craftsmanship crafted for generations.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['All', 'Wedding Jewellery', 'Gold Purchase', 'Diamond Jewellery'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#014D40] text-[#F3E5AB] shadow-lg border border-[#D4AF37]'
                    : 'bg-white text-gray-700 hover:bg-[#014D40]/10 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#D4AF37]/20 group hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  {item.tag && (
                    <span className="absolute top-4 left-4 bg-[#014D40] text-[#F3E5AB] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#D4AF37]/60 shadow-md">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-md border border-white/20">
                    {item.purity}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#014D40] mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to="/appointment"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#014D40] hover:text-[#D4AF37] transition-colors group/btn"
                    >
                      <span>Book Viewing</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPOINTMENT BANNER SECTION */}
      <section className="py-16 bg-[#014D40] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-left max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F3E5AB] font-semibold">VIP Hospitality</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3">
              Plan Your Visit Before Coming to the Store
            </h2>
            <p className="text-gray-200 text-sm font-light leading-relaxed">
              Book a personalized appointment with our master jewellery consultants. Enjoy private viewing rooms, complimentary gold purity checks, and advance rate lock guarantees.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-3 bg-gold-gradient hover:bg-gold-gradient-hover text-[#014D40] font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-2xl glow-gold transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">Client Reviews</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#014D40] mt-2 mb-4">
              Trusted by 50,000+ Happy Families
            </h2>
            <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#F8F6F2] rounded-2xl p-8 border border-[#D4AF37]/30 shadow-sm flex flex-col justify-between relative"
              >
                <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-gray-700 text-xs italic leading-relaxed mb-6 font-light">
                  "{t.comment}"
                </p>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-[#014D40] text-sm">{t.name}</h4>
                    <p className="text-[11px] text-gray-500">{t.location}</p>
                  </div>
                  <span className="text-[10px] bg-[#014D40]/10 text-[#014D40] px-2.5 py-1 rounded-full font-semibold">
                    {t.occasion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-[#F8F6F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">Clarifications</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#014D40] mt-2 mb-3">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-gold-gradient mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#D4AF37]/30 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-serif font-bold text-[#014D40] text-base hover:text-[#D4AF37] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-6 pb-6 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
