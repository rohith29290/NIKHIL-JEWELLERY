import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Header Banner */}
      <section className="bg-[#014D40] text-white py-16 px-4 text-center relative border-b-2 border-[#D4AF37]/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="relative max-w-4xl mx-auto z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#F3E5AB] font-semibold">Hyderabad Flagship Showroom</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white mt-2 mb-3">
            Contact Nikhil and Brother Jewellery
          </h1>
          <p className="text-gray-200 text-sm max-w-xl mx-auto font-light leading-relaxed">
            We look forward to welcoming you to our luxury store in Meerpet. Get in touch for custom jewellery orders, gold rates, and appointments.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Store Information Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#D4AF37]/30 space-y-8">
            <div className="border-b border-gray-100 pb-6">
              <h2 className="font-serif text-2xl font-bold text-[#014D40] mb-2">Showroom Address</h2>
              <p className="text-xs text-gray-600 leading-relaxed flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Nikhil and Brother Jewellery</strong>
                  <br />
                  Nandi Hills, Nagarjuna Hills,
                  <br />
                  Meerpet, Hyderabad,
                  <br />
                  Telangana – 500097
                </span>
              </p>
            </div>

            {/* Direct Phone Numbers */}
            <div className="border-b border-gray-100 pb-6 space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#014D40]">Phone Numbers</h3>
              <div className="space-y-2">
                <a
                  href="tel:9502719122"
                  className="flex items-center gap-3 bg-[#014D40]/5 hover:bg-[#014D40] text-[#014D40] hover:text-[#F3E5AB] p-3 rounded-xl border border-[#D4AF37]/30 transition-all font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>+91 9502719122</span>
                </a>
                <a
                  href="tel:9912381112"
                  className="flex items-center gap-3 bg-[#014D40]/5 hover:bg-[#014D40] text-[#014D40] hover:text-[#F3E5AB] p-3 rounded-xl border border-[#D4AF37]/30 transition-all font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>+91 9912381112</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Direct */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-serif text-lg font-bold text-[#014D40] mb-3">WhatsApp Inquiry</h3>
              <a
                href="https://wa.me/919502719122?text=Hello%20Nikhil%20and%20Brother%20Jewellery%2C%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="font-serif text-lg font-bold text-[#014D40] mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                Business Hours
              </h3>
              <div className="space-y-2 text-xs text-gray-600 bg-[#F8F6F2] p-4 rounded-xl border border-gray-200">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Monday – Saturday:</span>
                  <span>10:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200">
                  <span className="font-semibold text-gray-800">Sunday:</span>
                  <span>11:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Map & Contact Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Google Map Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#D4AF37]/30">
              <h2 className="font-serif text-xl font-bold text-[#014D40] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                Find Us on Map – Meerpet, Hyderabad
              </h2>
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
                <iframe
                  title="Nikhil and Brother Jewellery Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.625624794828!2d78.5284!3d17.3331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98f328905333%3A0x6b4020a6f8b50201!2sMeerpet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#D4AF37]/30">
              <h2 className="font-serif text-2xl font-bold text-[#014D40] mb-2">Send Us a Direct Message</h2>
              <p className="text-xs text-gray-500 mb-6 font-light">
                Have questions about custom jewellery design, 916 gold rates, or store visits? Drop us a line.
              </p>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="font-serif font-bold text-emerald-800 text-lg">Thank You for Contacting Us!</h3>
                  <p className="text-xs text-emerald-700">
                    We have received your message. Our team at Nikhil and Brother Jewellery will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Mobile Number"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Custom Order">Custom Jewellery Design</option>
                      <option value="Gold Rate Lock">Gold Rate Lock Inquiry</option>
                      <option value="Old Gold Exchange">Old Gold Exchange</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#014D40] hover:bg-[#00382E] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
