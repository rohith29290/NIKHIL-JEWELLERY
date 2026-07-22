import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Users, Clock, Sparkles, Heart, CheckCircle2, History } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const milestones = [
    { year: 'Heritage', title: 'Founding Legacy', desc: 'Started as a traditional gold crafting atelier in Hyderabad, focusing on handmade 22K gold ornaments.' },
    { year: '2008', title: 'Nizam Polki Expansion', desc: 'Introduced authentic Nizam Kundan & Polki bridal sets handcrafted by hereditary karigars.' },
    { year: '2018', title: 'Certified Solitaire Wing', desc: 'Launched IGI & GIA certified diamond solitaire collections and 100% BIS hallmark guarantee.' },
    { year: '2026', title: 'Meerpet Flagship Launch', desc: 'Opened state-of-the-art luxury showroom with private VIP appointment lounges in Meerpet, Hyderabad.' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Header Banner */}
      <section className="bg-[#014D40] text-white py-16 px-4 text-center relative border-b-2 border-[#D4AF37]/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="relative max-w-4xl mx-auto z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#F3E5AB] font-semibold">Our Story & Heritage</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
            Nikhil and Brother Jewellery
          </h1>
          <p className="text-gray-200 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Rooted in Hyderabad's royal jewellery tradition, dedicated to absolute purity, exquisite craftsmanship, and lifelong customer trust.
          </p>
        </div>
      </section>

      {/* Main Story & Values Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-[#014D40]/10 border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-wider text-[#014D40] font-bold">25+ Years of Trust</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#014D40] leading-tight">
              A Legacy Built on Royal Artistry & Uncompromising Purity
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed font-light">
              At <strong>Nikhil and Brother Jewellery</strong>, we believe that jewellery is not merely an ornament—it is an heirloom passed down through generations, carrying love, heritage, and timeless value.
            </p>

            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Situated at Meerpet, Hyderabad, our showroom brings together the finest 22K (916) hallmarked gold, certified IGI diamonds, and uncut polki chokers inspired by the grand Nizam era. Every design reflects hours of dedicated handcrafting by senior karigars.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#014D40] text-sm">100% BIS 916 Hallmark</h4>
                  <p className="text-xs text-gray-500">Government tested purity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#014D40] text-sm">Transparent Valuation</h4>
                  <p className="text-xs text-gray-500">Zero hidden deductions</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800"
                alt="Crafting Gold Jewellery"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#014D40] text-white p-6 rounded-2xl shadow-xl border border-[#D4AF37]/50 max-w-xs">
              <p className="font-serif font-bold text-2xl text-[#F3E5AB]">50,000+</p>
              <p className="text-xs text-gray-200 mt-1">Families across Telangana trust us for their bridal celebrations.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION, VISION & VALUES */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8F6F2] p-8 rounded-2xl border border-[#D4AF37]/30">
              <div className="p-3 bg-[#014D40] text-[#D4AF37] rounded-xl w-fit mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#014D40] mb-2">Our Mission</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                To provide families with 100% certified hallmarked gold and certified diamonds, ensuring absolute pricing transparency and regal service.
              </p>
            </div>

            <div className="bg-[#F8F6F2] p-8 rounded-2xl border border-[#D4AF37]/30">
              <div className="p-3 bg-[#014D40] text-[#D4AF37] rounded-xl w-fit mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#014D40] mb-2">Our Vision</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                To stand as Hyderabad's premier heritage jewellery brand, recognized for reviving authentic royal designs and building multigenerational trust.
              </p>
            </div>

            <div className="bg-[#F8F6F2] p-8 rounded-2xl border border-[#D4AF37]/30">
              <div className="p-3 bg-[#014D40] text-[#D4AF37] rounded-xl w-fit mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#014D40] mb-2">Customer First</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Every customer visiting our Meerpet store receives personalized VIP attention, private lounge viewings, and tailored jewellery consultations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">Our Journey</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#014D40] mt-2 mb-3">
            Milestones of Trust & Excellence
          </h2>
          <div className="w-20 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        <div className="relative border-l-2 border-[#D4AF37]/40 pl-8 ml-4 space-y-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[41px] top-0 bg-[#014D40] text-[#D4AF37] p-2 rounded-full border-2 border-[#D4AF37] shadow-md">
                <History className="w-4 h-4" />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md border border-[#D4AF37]/20 group-hover:shadow-lg transition-shadow">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">{m.year}</span>
                <h3 className="font-serif text-lg font-bold text-[#014D40] mt-1 mb-2">{m.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOK VISIT CTA */}
      <section className="py-16 bg-[#014D40] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-extrabold mb-4 text-[#F3E5AB]">
            Experience Royal Hospitality in Hyderabad
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 mb-8 font-light leading-relaxed">
            Visit our showroom at Nandi Hills, Nagarjuna Hills, Meerpet, Hyderabad. Book an advance appointment to lock today's gold rate and enjoy a private viewing.
          </p>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 bg-gold-gradient hover:bg-gold-gradient-hover text-[#014D40] font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-xl glow-gold transition-all"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};
