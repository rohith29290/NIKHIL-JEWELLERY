import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Storage
let goldRateData = {
  rate24k: 10250,
  rate22k: 9400,
  rate18k: 7680,
  silverRate: 125,
  lastUpdated: new Date().toISOString(),
  trend: "up" as "up" | "down" | "stable",
  changeAmount24k: +120,
  history: [
    { date: "16 Jul", rate24k: 10110, rate22k: 9280 },
    { date: "17 Jul", rate24k: 10140, rate22k: 9310 },
    { date: "18 Jul", rate24k: 10180, rate22k: 9340 },
    { date: "19 Jul", rate24k: 10160, rate22k: 9320 },
    { date: "20 Jul", rate24k: 10200, rate22k: 9360 },
    { date: "21 Jul", rate24k: 10220, rate22k: 9380 },
    { date: "22 Jul (Today)", rate24k: 10250, rate22k: 9400 },
  ],
};

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

// POST Update Gold Rate (Admin)
app.post("/api/gold-rate/update", (req, res) => {
  const { rate24k, rate22k, rate18k, silverRate, trend } = req.body;

  if (rate24k && !isNaN(Number(rate24k))) {
    const old24k = goldRateData.rate24k;
    const new24k = Number(rate24k);
    goldRateData.rate24k = new24k;
    goldRateData.changeAmount24k = new24k - old24k;
  }
  if (rate22k && !isNaN(Number(rate22k))) {
    goldRateData.rate22k = Number(rate22k);
  }
  if (rate18k && !isNaN(Number(rate18k))) {
    goldRateData.rate18k = Number(rate18k);
  }
  if (silverRate && !isNaN(Number(silverRate))) {
    goldRateData.silverRate = Number(silverRate);
  }
  if (trend && ["up", "down", "stable"].includes(trend)) {
    goldRateData.trend = trend;
  }

  goldRateData.lastUpdated = new Date().toISOString();

  // update today entry in history
  const todayLabel = "Today";
  const existingIndex = goldRateData.history.findIndex((h) =>
    h.date.includes("Today")
  );
  if (existingIndex !== -1) {
    goldRateData.history[existingIndex] = {
      date: `Today (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      rate24k: goldRateData.rate24k,
      rate22k: goldRateData.rate22k,
    };
  }

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
