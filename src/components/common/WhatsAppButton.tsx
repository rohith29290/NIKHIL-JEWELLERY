import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phone = '919502719122';
  const text = encodeURIComponent(
    'Hello Nikhil and Brother Jewellery! I would like to inquire about today gold rates and jewellery collections.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group glow-gold border-2 border-white"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp with Nikhil and Brother Jewellery"
    >
      <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
        Chat with Us
      </span>
    </a>
  );
};
