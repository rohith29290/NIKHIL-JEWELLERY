import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, RefreshCw, Clock, Calculator, ShieldCheck, Sparkles, Calendar, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { GoldRate } from '../types';

export const GoldRatePage: React.FC = () => {
  const [goldRate, setGoldRate] = useState<GoldRate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Gold Rate Calculator state
  const [grams, setGrams] = useState<number>(10);
  const [carat, setCarat] = useState<'22k' | '24k' | '18k'>('22k');
  const [makingChargePct, setMakingChargePct] = useState<number>(12); // estimated 12% making charges

  const fetchRate = async () => {
    try {
      setRefreshing(true);
      const data = await apiService.getGoldRate();
      setGoldRate(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 600);
    }
  };

  useEffect(() => {
    fetchRate();
  }, []);

  // Calculation formulas
  const baseRatePerGram = goldRate
    ? carat === '24k'
      ? goldRate.rate24k
      : carat === '22k'
      ? goldRate.rate22k
      : goldRate.rate18k
    : 0;

  const rawGoldCost = grams * baseRatePerGram;
  const makingChargesAmount = (rawGoldCost * makingChargePct) / 100;
  const subtotal = rawGoldCost + makingChargesAmount;
  const gstAmount = (subtotal * 3) / 100; // 3% GST on gold jewellery
  const totalEstimatedCost = subtotal + gstAmount;

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Header Banner */}
      <section className="bg-[#014D40] text-white py-16 px-4 text-center relative border-b-2 border-[#D4AF37]/50 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 bg-[#00382E] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full mb-3">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest text-[#F3E5AB]">Official Hyderabad Rates</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white mb-3">
            Today's Gold Rate in Hyderabad
          </h1>
          <p className="text-gray-200 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Transparent, real-time gold and silver pricing for 24K, 22K (916 Hallmarked), and 18K purity. Lock today's rate by booking an appointment.
          </p>
        </div>
      </section>

      {/* MAIN GOLD RATE DISPLAY */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/40">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#014D40] text-[#D4AF37] rounded-2xl shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Last Updated</p>
                <p className="font-serif font-bold text-[#014D40] text-sm sm:text-base">
                  {goldRate
                    ? new Date(goldRate.lastUpdated).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                    : 'Loading...'}
                </p>
              </div>
            </div>

            <button
              onClick={fetchRate}
              disabled={refreshing}
              className="inline-flex items-center gap-2 bg-[#014D40]/10 hover:bg-[#014D40] text-[#014D40] hover:text-[#F3E5AB] border border-[#014D40]/30 px-5 py-2.5 rounded-full text-xs font-bold transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Refreshing Rates...' : 'Refresh Rate'}</span>
            </button>
          </div>

          {/* Rate Cards Grid */}
          {loading ? (
            <div className="py-20 text-center">
              <RefreshCw className="w-10 h-10 text-[#D4AF37] animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-500">Fetching latest gold rates...</p>
            </div>
          ) : goldRate ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {/* 24K Card */}
              <div className="bg-[#F8F6F2] rounded-2xl p-6 border-2 border-[#D4AF37] relative overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <span className="absolute top-3 right-3 bg-[#D4AF37] text-[#014D40] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  99.9% Pure
                </span>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">24 Carat Gold</p>
                <h3 className="font-serif text-3xl font-extrabold text-[#014D40] mt-2 mb-1">
                  ₹{goldRate.rate24k.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-gray-500 font-medium">per gram (₹{(goldRate.rate24k * 10).toLocaleString('en-IN')} / 10g)</p>
                <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Highest Purity Standard</span>
                </div>
              </div>

              {/* 22K Card (Standard Hallmarked) */}
              <div className="bg-[#014D40] text-white rounded-2xl p-6 border-2 border-[#D4AF37] relative overflow-hidden shadow-xl hover:shadow-2xl transition-shadow glow-gold">
                <span className="absolute top-3 right-3 bg-[#F3E5AB] text-[#014D40] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                  916 Hallmarked
                </span>
                <p className="text-xs uppercase tracking-wider text-[#F3E5AB] font-bold">22 Carat Gold</p>
                <h3 className="font-serif text-3xl font-extrabold text-white mt-2 mb-1">
                  ₹{goldRate.rate22k.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-gray-200 font-medium">per gram (₹{(goldRate.rate22k * 10).toLocaleString('en-IN')} / 10g)</p>
                <div className="mt-4 pt-3 border-t border-white/20 text-[11px] text-[#F3E5AB] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Most Popular for Jewellery</span>
                </div>
              </div>

              {/* 18K Card */}
              <div className="bg-[#F8F6F2] rounded-2xl p-6 border border-gray-300 relative overflow-hidden shadow-md">
                <span className="absolute top-3 right-3 bg-gray-200 text-gray-700 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                  75% Gold
                </span>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">18 Carat Gold</p>
                <h3 className="font-serif text-3xl font-extrabold text-[#014D40] mt-2 mb-1">
                  ₹{goldRate.rate18k.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-gray-500 font-medium">per gram (₹{(goldRate.rate18k * 10).toLocaleString('en-IN')} / 10g)</p>
                <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] text-gray-600 font-medium">
                  Ideal for Diamond Settings
                </div>
              </div>

              {/* Fine Silver Card */}
              <div className="bg-[#F8F6F2] rounded-2xl p-6 border border-gray-300 relative overflow-hidden shadow-md">
                <span className="absolute top-3 right-3 bg-slate-300 text-slate-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                  Fine Silver
                </span>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Pure Silver</p>
                <h3 className="font-serif text-3xl font-extrabold text-[#014D40] mt-2 mb-1">
                  ₹{goldRate.silverRate.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-gray-500 font-medium">per gram (₹{(goldRate.silverRate * 1000).toLocaleString('en-IN')} / kg)</p>
                <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] text-gray-600 font-medium">
                  Pure 999 Silver Articles
                </div>
              </div>
            </div>
          ) : null}

          {/* Rate Lock CTA */}
          <div className="mt-10 bg-gradient-to-r from-[#014D40] to-[#002D25] text-white p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif text-xl font-bold text-[#F3E5AB]">Lock Today's Rate Before Buying</h3>
              <p className="text-xs text-gray-200 font-light max-w-xl">
                Book an advance appointment today. If gold prices rise by your store visit date, you pay today's lower rate! If prices drop, you pay the prevailing lower rate.
              </p>
            </div>
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 bg-gold-gradient hover:bg-gold-gradient-hover text-[#014D40] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg glow-gold transition-all shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Lock Rate & Book Appointment</span>
            </Link>
          </div>
        </div>
      </section>

      {/* GOLD PRICE TREND & CALCULATOR SECTION */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 7-Day Rate History */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#D4AF37]/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#014D40] flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                7-Day Gold Price Trend
              </h3>
              <span className="text-[11px] bg-[#014D40]/10 text-[#014D40] font-semibold px-3 py-1 rounded-full">
                Hyderabad
              </span>
            </div>

            {goldRate && goldRate.history && (
              <div className="space-y-3">
                {goldRate.history.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8F6F2] border border-gray-200 text-xs hover:border-[#D4AF37] transition-colors"
                  >
                    <span className="font-semibold text-gray-700">{h.date}</span>
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-gray-400 text-[10px] block">22K</span>
                        <span className="font-bold text-[#014D40]">₹{h.rate22k.toLocaleString('en-IN')}/g</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 text-[10px] block">24K</span>
                        <span className="font-bold text-[#014D40]">₹{h.rate24k.toLocaleString('en-IN')}/g</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Gold Price Calculator */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#D4AF37]/30">
            <h3 className="font-serif text-2xl font-bold text-[#014D40] flex items-center gap-2 mb-2">
              <Calculator className="w-6 h-6 text-[#D4AF37]" />
              Gold Jewellery Cost Estimator
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-light">
              Estimate the approximate purchase price including gold weight, estimated making charges, and 3% GST.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Select Purity</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCarat('22k')}
                    className={`py-2 rounded-lg text-xs font-bold border ${
                      carat === '22k'
                        ? 'bg-[#014D40] text-[#F3E5AB] border-[#D4AF37]'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    22K (916)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCarat('24k')}
                    className={`py-2 rounded-lg text-xs font-bold border ${
                      carat === '24k'
                        ? 'bg-[#014D40] text-[#F3E5AB] border-[#D4AF37]'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    24K (Pure)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCarat('18k')}
                    className={`py-2 rounded-lg text-xs font-bold border ${
                      carat === '18k'
                        ? 'bg-[#014D40] text-[#F3E5AB] border-[#D4AF37]'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    18K
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Gold Weight (Grams)</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-[#014D40] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Estimated Making Charges ({makingChargePct}%)
                </label>
                <input
                  type="range"
                  min="8"
                  max="25"
                  value={makingChargePct}
                  onChange={(e) => setMakingChargePct(Number(e.target.value))}
                  className="w-full accent-[#014D40]"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>8% (Simple Chains)</span>
                  <span>15% (Bridal)</span>
                  <span>25% (Heavy Antique)</span>
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="mt-6 pt-4 border-t border-gray-200 bg-[#F8F6F2] p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Raw Gold Cost ({grams}g @ ₹{baseRatePerGram}/g):</span>
                  <span className="font-semibold text-gray-800">₹{rawGoldCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Making Charges ({makingChargePct}%):</span>
                  <span className="font-semibold text-gray-800">₹{makingChargesAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (3%):</span>
                  <span className="font-semibold text-gray-800">₹{gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between font-serif font-extrabold text-base text-[#014D40] pt-2 border-t border-gray-300">
                  <span>Total Estimated Price:</span>
                  <span className="text-[#014D40]">₹{totalEstimatedCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
