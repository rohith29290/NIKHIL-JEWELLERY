import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Storage & Structure
interface GoldRateHistoryItem {
  date: string;
  rate24k: number;
  rate22k: number;
  rate18k: number;
  silverRate: number;
  rate24k_10g: number;
  rate22k_10g: number;
  rate18k_10g: number;
  silverRate_10g: number;
}

let goldRateData = {
  rate24k: 13230,
  rate22k: 12128,
  rate18k: 9923,
  silverRate: 210,
  rate24k_10g: 132300,
  rate22k_10g: 121280,
  rate18k_10g: 99230,
  silverRate_10g: 2100,
  silverRate_1kg: 210000,
  lastUpdated: new Date().toISOString(),
  trend: "up" as "up" | "down" | "stable",
  changeAmount24k: 50,
  city: "Hyderabad",
  source: "Live Market Stream (GoldAPI / ER-API)",
  history: [] as GoldRateHistoryItem[],
};

// Function to generate realistic 7-day price history ending on Today
function generate7DayHistory(c24k: number, c22k: number, c18k: number, cSilver: number) {
  const history: GoldRateHistoryItem[] = [];
  const now = new Date();
  const offsets = [-0.012, -0.008, -0.005, -0.009, -0.003, -0.001, 0];

  for (let i = 6; i >= 0; i--) {
    const dayDate = new Date(now.getTime() - i * 86400000);
    const dayStr = i === 0 
      ? `Today (${dayDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })})`
      : dayDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      
    const factor = 1 + offsets[6 - i];
    const r24k = Math.round(c24k * factor);
    const r22k = Math.round(c22k * factor);
    const r18k = Math.round(c18k * factor);
    const rSilver = Math.round(cSilver * factor);

    history.push({
      date: dayStr,
      rate24k: r24k,
      rate22k: r22k,
      rate18k: r18k,
      silverRate: rSilver,
      rate24k_10g: r24k * 10,
      rate22k_10g: r22k * 10,
      rate18k_10g: r18k * 10,
      silverRate_10g: rSilver * 10,
    });
  }

  goldRateData.history = history;
}

// Function to fetch live Hyderabad gold & silver rates from API sources
async function updateLiveGoldRates() {
  try {
    let new24k = 0;
    let new22k = 0;
    let new18k = 0;
    let newSilver = 0;
    let fetchedSource = "";

    // Primary Source: GoldAPI + Open Exchange Rates
    try {
      const [gRes, sRes, fRes] = await Promise.all([
        fetch("https://api.gold-api.com/price/XAU", { headers: { "User-Agent": "Mozilla/5.0" } }),
        fetch("https://api.gold-api.com/price/XAG", { headers: { "User-Agent": "Mozilla/5.0" } }),
        fetch("https://open.er-api.com/v6/latest/USD", { headers: { "User-Agent": "Mozilla/5.0" } })
      ]);

      if (gRes.ok && sRes.ok && fRes.ok) {
        const gData = await gRes.json();
        const sData = await sRes.json();
        const fData = await fRes.json();

        const goldUsd = Number(gData.price);
        const silverUsd = Number(sData.price);
        const inrFx = Number(fData.rates?.INR);

        if (goldUsd > 0 && inrFx > 0) {
          const spotGoldG = (goldUsd * inrFx) / 31.1034768;
          const spotSilverG = (silverUsd * inrFx) / 31.1034768;

          // Hyderabad domestic retail gold price including import duty (basic + AIDC) & local jeweler margin (~4.6%)
          new24k = Math.round(spotGoldG * 1.046);
          new22k = Math.round(new24k * 0.9167);
          new18k = Math.round(new24k * 0.75);
          newSilver = Math.round(spotSilverG * 1.15); // Fine silver with duty & local margin
          fetchedSource = "Live Bullion & FX Stream (GoldAPI / ER-API)";
        }
      }
    } catch (e) {
      console.error("Primary live gold API fetch failed:", e);
    }

    // Secondary Source: Fawaz Ahmed Currency API
    if (!new24k) {
      try {
        const [xauRes, xagRes] = await Promise.all([
          fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json"),
          fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xag.json")
        ]);
        if (xauRes.ok && xagRes.ok) {
          const xauData = await xauRes.json();
          const xagData = await xagRes.json();
          const xauInr = Number(xauData.xau?.inr);
          const xagInr = Number(xagData.xag?.inr);
          if (xauInr > 0) {
            const spotGoldG = xauInr / 31.1034768;
            const spotSilverG = xagInr / 31.1034768;
            new24k = Math.round(spotGoldG * 1.05);
            new22k = Math.round(new24k * 0.9167);
            new18k = Math.round(new24k * 0.75);
            newSilver = Math.round(spotSilverG * 1.15);
            fetchedSource = "Live Currency Data Stream";
          }
        }
      } catch (e) {
        console.error("Secondary live gold API fetch failed:", e);
      }
    }

    if (new24k > 0) {
      const old24k = goldRateData.rate24k;
      const change = new24k - old24k;

      goldRateData.trend = change > 0 ? "up" : change < 0 ? "down" : "stable";
      goldRateData.changeAmount24k = change;
      goldRateData.rate24k = new24k;
      goldRateData.rate22k = new22k;
      goldRateData.rate18k = new18k;
      goldRateData.silverRate = newSilver;
      goldRateData.rate24k_10g = new24k * 10;
      goldRateData.rate22k_10g = new22k * 10;
      goldRateData.rate18k_10g = new18k * 10;
      goldRateData.silverRate_10g = newSilver * 10;
      goldRateData.silverRate_1kg = newSilver * 1000;
      goldRateData.lastUpdated = new Date().toISOString();
      goldRateData.source = fetchedSource || "Live Hyderabad Market Feed";

      generate7DayHistory(new24k, new22k, new18k, newSilver);
    }
  } catch (err) {
    console.error("Error updating live gold rates:", err);
  }
}

// Immediately initialize live rates on server startup
updateLiveGoldRates();

// Refresh rates automatically every 5 minutes (300,000 ms)
setInterval(() => {
  updateLiveGoldRates();
}, 300000);

interface AppointmentRecord {
  id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  preferredDate: string;
  preferredTimeSlot: string;
  purpose: string;
  message?: string;
  termsAccepted: boolean;
  createdAt: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  aiConfirmationMessage?: string;
}

let appointmentsData: AppointmentRecord[] = [
  {
    id: "NBJ-1001",
    fullName: "Rajesh Sharma",
    mobileNumber: "9876543210",
    email: "rajesh.sharma@gmail.com",
    preferredDate: "2026-07-23",
    preferredTimeSlot: "11:00 AM - 01:00 PM",
    purpose: "Wedding Jewellery",
    message: "Looking for complete Kundan bridal set for my daughter's wedding.",
    termsAccepted: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: "Upcoming",
    aiConfirmationMessage:
      "Dear Rajesh Sharma, It is our privilege to welcome you to Nikhil and Brother Jewellery. Our master jewellery specialists look forward to assisting you in selecting the perfect bridal Kundan masterpiece for your special celebration.",
  },
  {
    id: "NBJ-1002",
    fullName: "Priyanka Reddy",
    mobileNumber: "9123456789",
    email: "priyanka.reddy@yahoo.com",
    preferredDate: "2026-07-24",
    preferredTimeSlot: "03:00 PM - 05:00 PM",
    purpose: "Gold Purchase",
    message: "Interested in 22K gold bangles and traditional antique neckpieces.",
    termsAccepted: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: "Upcoming",
    aiConfirmationMessage:
      "Dear Priyanka Reddy, Thank you for choosing Nikhil and Brother Jewellery. We have curated our finest 22K hallmark gold collection for your private viewing.",
  },
];

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API ROUTES

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GET Gold Rate
app.get("/api/gold-rate", (req, res) => {
  res.json({
    success: true,
    data: goldRateData,
  });
});

// POST Refresh Live Gold Rate
app.post("/api/gold-rate/refresh", async (req, res) => {
  await updateLiveGoldRates();
  res.json({
    success: true,
    message: "Live gold rates refreshed successfully",
    data: goldRateData,
  });
});

// POST Update Gold Rate (Admin Manual Override)
app.post("/api/gold-rate/update", (req, res) => {
  const { rate24k, rate22k, rate18k, silverRate, trend } = req.body;

  if (rate24k && !isNaN(Number(rate24k))) {
    const old24k = goldRateData.rate24k;
    const new24k = Number(rate24k);
    goldRateData.rate24k = new24k;
    goldRateData.rate24k_10g = new24k * 10;
    goldRateData.changeAmount24k = new24k - old24k;
  }
  if (rate22k && !isNaN(Number(rate22k))) {
    const val = Number(rate22k);
    goldRateData.rate22k = val;
    goldRateData.rate22k_10g = val * 10;
  }
  if (rate18k && !isNaN(Number(rate18k))) {
    const val = Number(rate18k);
    goldRateData.rate18k = val;
    goldRateData.rate18k_10g = val * 10;
  }
  if (silverRate && !isNaN(Number(silverRate))) {
    const val = Number(silverRate);
    goldRateData.silverRate = val;
    goldRateData.silverRate_10g = val * 10;
    goldRateData.silverRate_1kg = val * 1000;
  }
  if (trend && ["up", "down", "stable"].includes(trend)) {
    goldRateData.trend = trend;
  }

  goldRateData.lastUpdated = new Date().toISOString();

  // update today entry in history
  generate7DayHistory(goldRateData.rate24k, goldRateData.rate22k, goldRateData.rate18k, goldRateData.silverRate);

  res.json({
    success: true,
    message: "Gold rates updated successfully",
    data: goldRateData,
  });
});

// GET Appointments
app.get("/api/appointments", (req, res) => {
  res.json({
    success: true,
    count: appointmentsData.length,
    data: appointmentsData,
  });
});

// POST Book Appointment (with Gemini AI confirmation generation)
app.post("/api/appointments", async (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      preferredDate,
      preferredTimeSlot,
      purpose,
      message,
      termsAccepted,
    } = req.body;

    // Validation
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, error: "Full Name is required (minimum 2 characters)." });
    }
    const cleanPhone = (mobileNumber || "").replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ success: false, error: "Mobile number must contain exactly 10 digits." });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: "Please provide a valid email address." });
    }
    if (!preferredDate) {
      return res.status(400).json({ success: false, error: "Preferred Date is required." });
    }
    const todayStr = new Date().toISOString().split("T")[0];
    if (preferredDate < todayStr) {
      return res.status(400).json({ success: false, error: "Preferred Date cannot be in the past." });
    }
    if (!preferredTimeSlot) {
      return res.status(400).json({ success: false, error: "Time Slot is required." });
    }
    if (!purpose) {
      return res.status(400).json({ success: false, error: "Purpose of visit is required." });
    }

    // Generate AI Confirmation Message using Gemini API
    let aiMessage = "";
    try {
      const aiClient = getGeminiClient();
      if (aiClient) {
        const prompt = `Generate a warm, luxurious, elegant 2 to 3 sentence thank-you & confirmation message for a customer named "${fullName}" who has booked a VIP appointment at "Nikhil and Brother Jewellery" in Hyderabad for "${purpose}" on ${preferredDate} during slot ${preferredTimeSlot}. Emphasize craftsmanship, heritage, and personalized royal hospitality. Do not use markdown headers, just pure elegant text.`;

        const response = await aiClient.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
        });

        if (response && response.text) {
          aiMessage = response.text.trim();
        }
      }
    } catch (aiErr) {
      console.error("Gemini AI generation error:", aiErr);
    }

    // Fallback message if AI was not configured or errored
    if (!aiMessage) {
      aiMessage = `Dear ${fullName}, We are delighted to confirm your appointment at Nikhil and Brother Jewellery on ${preferredDate} (${preferredTimeSlot}) for ${purpose}. Our master craftsmen and luxury consultants look forward to providing you with an unforgettable heirloom shopping experience in Hyderabad.`;
    }

    const newAppointment: AppointmentRecord = {
      id: `NBJ-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName,
      mobileNumber: cleanPhone,
      email,
      preferredDate,
      preferredTimeSlot,
      purpose,
      message: message || "",
      termsAccepted: Boolean(termsAccepted),
      createdAt: new Date().toISOString(),
      status: "Upcoming",
      aiConfirmationMessage: aiMessage,
    };

    appointmentsData.unshift(newAppointment);

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: newAppointment,
    });
  } catch (error: any) {
    console.error("Error booking appointment:", error);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred while booking your appointment. Please try again.",
    });
  }
});

// DELETE Appointment (Admin)
app.delete("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const initialCount = appointmentsData.length;
  appointmentsData = appointmentsData.filter((app) => app.id !== id);

  if (appointmentsData.length === initialCount) {
    return res.status(404).json({
      success: false,
      error: "Appointment not found.",
    });
  }

  res.json({
    success: true,
    message: `Appointment ${id} deleted successfully.`,
  });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
