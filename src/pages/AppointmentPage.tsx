import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Sparkles,
  CheckCircle,
  MapPin,
  ArrowLeft,
  Share2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Appointment, PurposeType } from '../types';

export const AppointmentPage: React.FC = () => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [purpose, setPurpose] = useState<PurposeType>('Gold Purchase');
  const [message, setMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Status & Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  const purposeOptions: PurposeType[] = [
    'Gold Purchase',
    'Wedding Jewellery',
    'Diamond Jewellery',
    'Exchange',
    'Repair',
    'Consultation',
    'Others',
  ];

  const timeSlots = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
  ];

  // Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required (minimum 2 letters).';
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      newErrors.mobileNumber = 'Mobile number must contain exactly 10 digits.';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date.';
    } else {
      const todayStr = new Date().toISOString().split('T')[0];
      if (preferredDate < todayStr) {
        newErrors.preferredDate = 'Appointment date cannot be in the past.';
      }
    }

    if (!preferredTimeSlot) {
      newErrors.preferredTimeSlot = 'Time slot is required.';
    }

    if (!purpose) {
      newErrors.purpose = 'Purpose of visit is required.';
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms to confirm your appointment.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await apiService.bookAppointment({
        fullName,
        mobileNumber: mobileNumber.replace(/\D/g, ''),
        email,
        preferredDate,
        preferredTimeSlot,
        purpose,
        message,
        termsAccepted,
      });

      setBookedAppointment(result);
    } catch (err: any) {
      setErrors({ server: err.message || 'Failed to book appointment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDateStr = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* SUCCESS CARD DISPLAY AFTER SUBMISSION */}
        {bookedAppointment ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#D4AF37] relative overflow-hidden"
          >
            {/* Top Success Badge */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border-4 border-[#014D40] text-[#014D40] shadow-lg"
              >
                <CheckCircle className="w-12 h-12 text-[#014D40]" />
              </motion.div>

              <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-extrabold bg-[#014D40]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/40">
                VIP Appointment Confirmed
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#014D40]">
                Appointment Successfully Booked
              </h1>

              <p className="text-xs text-gray-500 font-medium">
                Reference Code: <span className="font-bold text-[#014D40]">{bookedAppointment.id}</span>
              </p>
            </div>

            {/* AI Confirmation Message Box */}
            {bookedAppointment.aiConfirmationMessage && (
              <div className="mt-8 bg-gradient-to-r from-[#014D40] to-[#002D25] text-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2 text-[#F3E5AB]">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-serif text-sm font-bold uppercase tracking-wider">
                    Personalized Welcome Note from Management
                  </span>
                </div>
                <p className="text-sm font-light text-gray-100 leading-relaxed italic">
                  "{bookedAppointment.aiConfirmationMessage}"
                </p>
              </div>
            )}

            {/* Appointment Summary Details Grid */}
            <div className="mt-8 bg-[#F8F6F2] rounded-2xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
              <div>
                <span className="text-gray-400 font-semibold uppercase text-[10px] block">Customer Name</span>
                <span className="font-bold text-sm text-[#014D40]">{bookedAppointment.fullName}</span>
              </div>

              <div>
                <span className="text-gray-400 font-semibold uppercase text-[10px] block">Contact Number</span>
                <span className="font-bold text-sm text-[#014D40]">+91 {bookedAppointment.mobileNumber}</span>
              </div>

              <div>
                <span className="text-gray-400 font-semibold uppercase text-[10px] block">Scheduled Date</span>
                <span className="font-bold text-sm text-[#014D40]">{bookedAppointment.preferredDate}</span>
              </div>

              <div>
                <span className="text-gray-400 font-semibold uppercase text-[10px] block">Time Slot</span>
                <span className="font-bold text-sm text-[#014D40]">{bookedAppointment.preferredTimeSlot}</span>
              </div>

              <div>
                <span className="text-gray-400 font-semibold uppercase text-[10px] block">Purpose of Visit</span>
                <span className="font-bold text-sm text-[#014D40]">{bookedAppointment.purpose}</span>
              </div>

              <div>
                <span className="text-gray-400 font-semibold uppercase text-[10px] block">Showroom Location</span>
                <span className="font-bold text-sm text-[#014D40]">
                  Meerpet, Hyderabad (Nandi Hills)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#014D40] hover:bg-[#00382E] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>

              <a
                href={`https://wa.me/919502719122?text=${encodeURIComponent(
                  `Hello Nikhil and Brother Jewellery! I have booked appointment ${bookedAppointment.id} for ${bookedAppointment.preferredDate} (${bookedAppointment.preferredTimeSlot}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        ) : (
          /* BOOKING FORM DISPLAY */
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/30 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-[#014D40] text-white p-8 sm:p-10 text-center relative border-b-2 border-[#D4AF37]/50">
              <div className="inline-flex items-center gap-2 bg-[#00382E] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full mb-3">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-widest text-[#F3E5AB]">Private Showroom Visit</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
                Book a VIP Appointment
              </h1>
              <p className="text-xs sm:text-sm text-gray-200 mt-2 max-w-xl mx-auto font-light leading-relaxed">
                Experience royal hospitality at our Hyderabad showroom. Enjoy private lounges, rate lock protection, and dedicated jewellery experts.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-6">
              {errors.server && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>{errors.server}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm font-medium`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Mobile Number (10 Digits) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="e.g. 9502719122"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm font-medium`}
                    />
                  </div>
                  {errors.mobileNumber && <p className="text-[11px] text-red-500 mt-1">{errors.mobileNumber}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. customer@example.com"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm font-medium`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Purpose Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Purpose of Visit <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value as PurposeType)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm font-medium text-gray-800 bg-white"
                  >
                    {purposeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      min={minDateStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm font-medium`}
                    />
                  </div>
                  {errors.preferredDate && <p className="text-[11px] text-red-500 mt-1">{errors.preferredDate}</p>}
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
                    <select
                      value={preferredTimeSlot}
                      onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm font-medium bg-white"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Message / Request */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Special Request or Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Looking for Kundan bridal chokers or custom diamond rings..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm font-medium"
                />
              </div>

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#014D40] focus:ring-[#D4AF37]"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I agree to visit the Nikhil and Brother Jewellery showroom in Meerpet, Hyderabad at the scheduled time slot and understand that appointment confirmation is subject to store availability.
                  </span>
                </label>
                {errors.terms && <p className="text-[11px] text-red-500 mt-1">{errors.terms}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gold-gradient hover:bg-gold-gradient-hover text-[#014D40] font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl shadow-xl glow-gold transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating AI Confirmation & Booking...</span>
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-5 h-5" />
                      <span>Confirm Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
