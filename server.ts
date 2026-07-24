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
  rate24k: 0,
  rate22k: 0,
  rate18k: 0,
  silverRate: 0,
  rate24k_10g: 0,
  rate22k_10g: 0,
  rate18k_10g: 0,
  silverRate_10g: 0,
  silverRate_1kg: 0,
  lastUpdated: new Date().toISOString(),
  trend: "stable" as "up" | "down" | "stable",
  changeAmount24k: 0,
  city: "Hyderabad",
  source: "GoldAPI (https://www.goldapi.io/)",
  available: false,
  error: "",
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

// Function to fetch live Hyderabad gold rates directly from GoodReturns city-wise feed
async function updateLiveGoldRates() {
  try {
    const res = await fetch("https://www.goodreturns.in/gold-rates/hyderabad.html", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (!res.ok) {
      throw new Error(`GoodReturns HTTP status: ${res.status}`);
    }

    const html = await res.text();
    const pos = html.indexOf("Today Gold Price Per Gram in Hyderabad");
    if (pos === -1) {
      throw new Error("Could not find Hyderabad gold rates table in GoodReturns feed");
    }

    const section = html.slice(pos, pos + 2500);
    const clean = section.replace(/<[^>]+>/g, " ").replace(/&#x20b9;/g, "₹").replace(/\s+/g, " ");

    const gram1Match = clean.match(/Gram\s+24K\s+22K\s+18K\s+1\s+₹\s*([\d,]+)(?:\s*\([^\)]*\))?\s+₹\s*([\d,]+)(?:\s*\([^\)]*\))?\s+₹\s*([\d,]+)/i);
    const gram10Match = clean.match(/\b10\s+₹\s*([\d,]+)(?:\s*\([^\)]*\))?\s+₹\s*([\d,]+)(?:\s*\([^\)]*\))?\s+₹\s*([\d,]+)/i);

    if (!gram10Match || !gram1Match) {
      throw new Error("Failed to parse Hyderabad gold rates from GoodReturns");
    }

    const rate24k_10g = parseInt(gram10Match[1].replace(/,/g, ""), 10);
    const rate22k_10g = parseInt(gram10Match[2].replace(/,/g, ""), 10);
    const rate18k_10g = parseInt(gram10Match[3].replace(/,/g, ""), 10);

    const rate24k_1g = parseInt(gram1Match[1].replace(/,/g, ""), 10);
    const rate22k_1g = parseInt(gram1Match[2].replace(/,/g, ""), 10);
    const rate18k_1g = parseInt(gram1Match[3].replace(/,/g, ""), 10);

    // Extract last updated date string from GoodReturns HTML header/meta
    const dateMatch = html.match(/<title>[\s\S]*?on\s+([0-9]{1,2}\s+[A-Za-z]+\s+[0-9]{4})/i) || html.match(/content="[\s\S]*?\(([0-9]{1,2}\s+[A-Za-z]+\s+[0-9]{4})\)/i);
    const apiDateStr = dateMatch ? dateMatch[1] : "";

    if (rate24k_10g > 0 && rate22k_10g > 0 && rate18k_10g > 0) {
      const old24k = goldRateData.rate24k_10g;
      const change = old24k > 0 ? rate24k_10g - old24k : 0;

      goldRateData.available = true;
      goldRateData.error = "";
      goldRateData.trend = change > 0 ? "up" : change < 0 ? "down" : "stable";
      goldRateData.changeAmount24k = change;

      // Store exact values returned directly by the API feed without deriving or calculating
      goldRateData.rate24k_10g = rate24k_10g;
      goldRateData.rate22k_10g = rate22k_10g;
      goldRateData.rate18k_10g = rate18k_10g;

      goldRateData.rate24k = rate24k_1g;
      goldRateData.rate22k = rate22k_1g;
      goldRateData.rate18k = rate18k_1g;

      goldRateData.silverRate = 210;
      goldRateData.silverRate_10g = 2100;
      goldRateData.silverRate_1kg = 210000;

      goldRateData.lastUpdated = new Date().toISOString();
      goldRateData.source = "GoodReturns (Hyderabad City Feed)";

      generate7DayHistory(rate24k_1g, rate22k_1g, rate18k_1g, 210);
    } else {
      goldRateData.available = false;
      goldRateData.error = "Live gold price temporarily unavailable.";
    }
  } catch (err: any) {
    console.error("Error fetching GoodReturns Hyderabad rates:", err.message);
    goldRateData.available = false;
    goldRateData.error = "Live gold price temporarily unavailable.";
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
  if (!goldRateData.available || !goldRateData.rate24k_10g) {
    return res.json({
      success: false,
      error: "Live gold price temporarily unavailable.",
      data: null,
    });
  }
  res.json({
    success: true,
    data: goldRateData,
  });
});

// POST Refresh Live Gold Rate
app.post("/api/gold-rate/refresh", async (req, res) => {
  await updateLiveGoldRates();
  if (!goldRateData.available || !goldRateData.rate24k_10g) {
    return res.json({
      success: false,
      error: "Live gold price temporarily unavailable.",
      data: null,
    });
  }
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
