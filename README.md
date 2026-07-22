# NIKHIL AND BROTHER JEWELLERY

> **Luxury Jewellery Web Application & Appointment Booking Engine**  
> *Hyderabad, Telangana*

---

## 🌟 Project Overview

**NIKHIL AND BROTHER JEWELLERY** is a complete, production-ready full-stack luxury web application crafted for a premier jewellery brand in Hyderabad. Customers can view live 24K, 22K (916 Hallmarked), and 18K gold rates, calculate gold jewellery costs, and book private VIP store appointments before visiting. On booking, the backend leverages Google's **Gemini AI API** to generate a personalized, warm luxury confirmation thank-you note.

---

## 🏢 Business Details

- **Store Name:** NIKHIL AND BROTHER JEWELLERY
- **Address:** Nandi Hills, Nagarjuna Hills, Meerpet, Hyderabad, Telangana – 500097
- **Phone Numbers:** +91 9502719122 | +91 9912381112
- **Business Hours:**
  - Monday – Saturday: 10:00 AM – 8:00 PM
  - Sunday: 11:00 AM – 6:00 PM

---

## 🎨 Brand Identity & Palette

- **Primary:** Deep Emerald Green (`#014D40`)
- **Secondary:** Champagne Gold (`#D4AF37`)
- **Background:** Warm Neutral (`#F8F6F2`)
- **Typography:**
  - Display / Headings: *Playfair Display*
  - Body: *Poppins*

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, React Router DOM, Tailwind CSS v4, Motion (Framer Motion), Lucide React Icons
- **Backend:** Node.js, Express.js (Runs inside unified `server.ts`)
- **Storage:** In-memory JavaScript data arrays (No external database, auto-resets on server restart)
- **AI Integration:** Google Gemini API (`@google/genai` SDK with `gemini-3.6-flash` model)

---

## 📂 Folder Structure

```
nikhil-and-brother-jewellery/
├── server.ts                       # Express backend server & Vite middleware entry
├── index.html                      # HTML root template with Playfair & Poppins Google Fonts
├── metadata.json                   # Applet capability declarations
├── package.json                    # Full stack dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── .env.example                    # Environment variable template
├── src/
│   ├── main.tsx                    # React entry point
│   ├── App.tsx                     # Main Router setup
│   ├── index.css                   # Tailwind CSS styling & custom shimmer utilities
│   ├── types.ts                    # TypeScript interface definitions
│   ├── components/
│   │   ├── common/
│   │   │   ├── Logo.tsx            # Brand Trishul & Wreath Emblem SVG component
│   │   │   ├── WhatsAppButton.tsx  # Floating WhatsApp direct chat link
│   │   │   └── ScrollToTop.tsx     # Scroll-to-top floating button
│   │   └── layout/
│   │       ├── Navbar.tsx          # Sticky navigation header with live clock & rate ticker
│   │       └── Footer.tsx          # Comprehensive store footer & contacts
│   ├── data/
│   │   └── mockData.ts             # Initial collections, testimonials & FAQs
│   ├── services/
│   │   └── api.ts                  # Frontend API service layer
│   └── pages/
│       ├── HomePage.tsx            # Hero, collections, trust pillars, testimonials
│       ├── AboutPage.tsx           # Heritage story, mission, timeline, statistics
│       ├── GoldRatePage.tsx        # Live 24K/22K rates, 7-day trend, cost estimator
│       ├── AppointmentPage.tsx     # Booking form with AI confirmation card
│       ├── ContactPage.tsx         # Store address, phone buttons, map & direct form
│       ├── AdminDashboardPage.tsx  # Manage appointments & live gold rate editor
│       └── NotFoundPage.tsx       # 404 error screen
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="YOUR_APP_URL"
```

> **Note:** The Gemini API key is read server-side only in `server.ts` to ensure security.

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Starts the Node `tsx` server on port `3000` with live Vite middleware.

### Production Build & Start
```bash
npm run build
npm start
```

---

## 🤖 Gemini API Setup

When a customer submits an appointment, the backend (`POST /api/appointments`) calls `@google/genai` with model `gemini-3.6-flash`:

```ts
const response = await aiClient.models.generateContent({
  model: "gemini-3.6-flash",
  contents: `Generate a warm, luxurious, elegant 2-3 sentence thank-you & confirmation message for customer "${fullName}" visiting Nikhil and Brother Jewellery...`,
});
```

If `GEMINI_API_KEY` is not present, the system seamlessly falls back to a pre-crafted luxury note.

---

## 🔮 Future Enhancements

1. **SMS / WhatsApp Notification Integration:** Send automated booking alerts directly to the customer's phone via Twilio or WhatsApp Business API.
2. **Virtual Try-On AR Module:** Integrate WebAR so customers can preview 22K gold necklaces and rings on camera.
3. **Multi-Branch Selector:** Support multiple showroom locations across Hyderabad (e.g. Jubilee Hills, Banjara Hills).
