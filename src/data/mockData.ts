import { CollectionItem, Testimonial } from '../types';

export const JEWELLERY_COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-1',
    title: 'The Royal Nizam Kundan Choker',
    category: 'Wedding Jewellery',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    description: 'Handcrafted in 22K certified hallmarked gold with uncut polki diamonds, Zambian emerald drops, and freshwater pearl clusters.',
    purity: '22K (916) Gold',
    tag: 'Bestseller',
  },
  {
    id: 'col-2',
    title: 'Temple Heritage Lakshmi Neckpiece',
    category: 'Gold Purchase',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    description: 'Intricately carved Goddess Lakshmi antique gold necklace with ruby accents, celebrating South Indian royal traditions.',
    purity: '22K (916) Gold',
    tag: 'Heritage',
  },
  {
    id: 'col-3',
    title: 'Solitaire Diamond Bridal Symphony',
    category: 'Diamond Jewellery',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    description: 'IGI certified VVS-EF brilliant cut diamonds set in 18K white gold with matching chandelier drop earrings.',
    purity: '18K White Gold',
    tag: 'Certified IGI',
  },
  {
    id: 'col-4',
    title: 'Champagne Gold Bridal Kadas',
    category: 'Gold Purchase',
    image: 'https://images.unsplash.com/photo-1611591475140-1388f8d55d31?auto=format&fit=crop&q=80&w=800',
    description: 'Pair of traditional solid 22K gold bangles with intricate nakshi floral carving and gold bead border.',
    purity: '22K (916) Gold',
    tag: 'Traditional',
  },
  {
    id: 'col-5',
    title: 'Vintage Polki Jhumkas',
    category: 'Wedding Jewellery',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
    description: 'Royal court style polki jhumka earrings adorned with natural ruby teardrops and delicate gold seed beads.',
    purity: '22K Gold',
    tag: 'Trending',
  },
  {
    id: 'col-6',
    title: 'Diamond & Emerald Royalty Ring',
    category: 'Diamond Jewellery',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800',
    description: 'Cushion-cut natural emerald surrounded by double halo brilliant diamonds, crafted for regal elegance.',
    purity: '18K Yellow Gold',
    tag: 'Limited Edition',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ananya Reddy',
    location: 'Jubilee Hills, Hyderabad',
    rating: 5,
    comment: 'Nikhil and Brother Jewellery made my wedding jewellery shopping completely seamless. The 22K Kundan bridal set was breathtaking, and booking an appointment in advance meant we received dedicated VIP attention.',
    occasion: 'Bridal Shopping',
    date: '10 July 2026',
  },
  {
    id: 't-2',
    name: 'Suresh Varma',
    location: 'Gachibowli, Hyderabad',
    rating: 5,
    comment: 'The transparency in 916 gold rates and making charges is commendable. I checked today’s gold price on their website, booked an appointment, and locked in a great deal on my daughter’s gold exchange.',
    occasion: 'Gold Exchange & Purchase',
    date: '02 July 2026',
  },
  {
    id: 't-3',
    name: 'Dr. Meera Kulkarni',
    location: 'Banjara Hills, Hyderabad',
    rating: 5,
    comment: 'Their certified diamond collection surpasses international standards. The staff at the Meerpet showroom were courteous, knowledgeable, and patient.',
    occasion: 'Diamond Collection',
    date: '28 June 2026',
  }
];

export const FAQS = [
  {
    question: 'How do I lock today’s gold rate before visiting the store?',
    answer: 'You can view today’s live 24K and 22K gold prices on our Gold Rate page and book an advance appointment. During your store visit on the appointment date, our sales consultants honor the locked rate or the prevailing lower rate, giving you the best price guarantee.',
  },
  {
    question: 'Are all your gold and diamond products certified?',
    answer: 'Yes! 100% of our gold jewellery carries the official BIS 916 Hallmark certificate. All our diamonds are individually certified by international gemological labs such as IGI (International Gemological Institute) and GIA.',
  },
  {
    question: 'Where is your physical jewellery store located in Hyderabad?',
    answer: 'Our luxury flagship showroom is located at Nandi Hills, Nagarjuna Hills, Meerpet, Hyderabad. You can find detailed directions and Google Map links on our Contact page.',
  },
  {
    question: 'Do you offer old gold exchange services?',
    answer: 'Yes, we offer transparent, zero-deduction old gold exchange policies based on precise digital purity testing machines right in front of you.',
  },
  {
    question: 'Why should I book an appointment before visiting?',
    answer: 'Booking an appointment grants you private lounge access, a dedicated senior jewellery consultant, customized product displays matching your requirements, and a personalized luxury welcome.',
  },
];
