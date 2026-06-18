import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import Stripe from "stripe";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

// Storage DB Files
const CMS_FILE = path.join(process.cwd(), "cms_db.json");
const DOCTORS_FILE = path.join(process.cwd(), "doctors_db.json");
const APPOINTMENTS_FILE = path.join(process.cwd(), "appointments_db.json");
const MESSAGES_FILE = path.join(process.cwd(), "messages_db.json");

// Helper to read JSON
function readJSON(file: string, defaultData: any) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf8"));
    }
  } catch (err) {
    console.error(`Error reading database file ${file}:`, err);
  }
  return defaultData;
}

// Helper to write JSON
function writeJSON(file: string, data: any) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`Error writing database file ${file}:`, err);
  }
}

// Mock/Default Database seeds
const defaultCMS = {
  hero: {
    heroTitle: 'Your Health, Our Priority.',
    heroSubtitle: 'Access world-class healthcare from the comfort of your home. Connect with certified specialists in minutes.',
    ctaText: 'Start Consultation'
  },
  testimonials: [
    { id: 1, name: 'Sarah Jenkins', content: 'The booking process was incredibly smooth. I found a top specialist and scheduled a call within minutes. Life-changing!', rating: 5, role: 'Patient' },
    { id: 2, name: 'Dr. Michael Chen', content: 'As a doctor, this platform helps me manage my patients efficiently. The interface is intuitive and professional.', rating: 5, role: 'Specialist' },
    { id: 3, name: 'Robert Miller', content: 'Finally, a medical app that actually works. The secure payment and verified doctor tags give me total confidence.', rating: 4, role: 'Patient' }
  ],
  faq: [
    { id: 1, question: 'How do I book an appointment?', answer: 'Simply search for a doctor and click Book.' },
    { id: 2, question: 'Is it covered by insurance?', answer: 'We accept most major insurance providers.' }
  ],
  services: [
    { id: 1, title: '24/7 Virtual Care', description: 'Immediate access to doctors anytime, anywhere.', icon: 'Zap', color: 'bg-blue-500' },
    { id: 2, title: 'Specialist Consultation', description: 'Expert advice for complex health conditions.', icon: 'Stethoscope', color: 'bg-cyan-500' }
  ]
};

const defaultDoctors = [
  {
    id: 'DR-001',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    experience: '12 Yrs',
    rating: 4.9,
    reviews: 120,
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    location: 'New York, NY',
    about: 'Dr. Michael Chen is a board-certified cardiologist with over 12 years of experience in the field of cardiovascular medicine. He specializes in interventional cardiology and has performed thousands of successful procedures. His patient-centric approach and commitment to using the latest technological advancements in heart care have earned him a reputation as one of the top specialists in the region.',
    patients: '3,700+',
    operations: '1,200+',
    price: '$120',
    email: 'michael@medicare.com',
    status: 'Verified',
    appointments: 1240
  },
  {
    id: 'DR-002',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Dermatologist',
    experience: '8 Yrs',
    rating: 4.8,
    reviews: 85,
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop',
    location: 'Brooklyn, NY',
    about: 'Dr. Sarah Jenkins is a passionate dermatologist focused on medical and cosmetic skin care. She graduated from Stanford University and completed her residency at the Mayo Clinic. She believes in a holistic approach to skin health, combining medical treatments with lifestyle recommendations.',
    patients: '2,500+',
    price: '$90',
    email: 'sarah@medicare.com',
    status: 'Verified',
    appointments: 850
  },
  {
    id: 'DR-003',
    name: 'Dr. Robert Miller',
    specialty: 'Dentist',
    experience: '15 Yrs',
    rating: 4.7,
    reviews: 210,
    availableToday: false,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2000&auto=format&fit=crop',
    location: 'Manhattan, NY',
    about: 'Dr. Robert Miller is an expert in restorative and aesthetic dentistry. With over 15 years of private practice experience, he is known for his gentle touch and meticulous attention to detail. He specializes in dental implants and complete smile makeovers.',
    patients: '4,100+',
    operations: '850+',
    price: '$75',
    email: 'robert@medicare.com',
    status: 'Verified',
    appointments: 210
  },
  {
    id: 'DR-004',
    name: 'Dr. Amanda Wright',
    specialty: 'General Medicine',
    experience: '10 Yrs',
    rating: 4.9,
    reviews: 145,
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2000&auto=format&fit=crop',
    location: 'Queens, NY',
    about: 'Dr. Amanda Wright is a family medicine specialist who provides comprehensive care for patients of all ages. She is dedicated to preventive medicine and empowers her patients to take an active role in their health management. Her clinical interests include nutrition, mental health, and chronic disease management.',
    patients: '5,000+',
    price: '$65',
    email: 'amanda@medicare.com',
    status: 'Verified',
    appointments: 640
  }
];

const defaultAppointments = [
  { id: 'd1', doc: 'Dr. Michael Chen', spec: 'Cardiology', date: 'May 18, 2026', time: '10:00 AM', status: 'Approved', price: '$120.00', userId: 'demo@example.com' },
  { id: 'd2', doc: 'Dr. Sarah Jenkins', spec: 'General Medicine', date: 'June 02, 2026', time: '02:30 PM', status: 'Pending', price: '$80.00', userId: 'demo@example.com' }
];

// Seed database files if they don't exist
if (!fs.existsSync(CMS_FILE)) writeJSON(CMS_FILE, defaultCMS);
if (!fs.existsSync(DOCTORS_FILE)) writeJSON(DOCTORS_FILE, defaultDoctors);
if (!fs.existsSync(APPOINTMENTS_FILE)) writeJSON(APPOINTMENTS_FILE, defaultAppointments);
if (!fs.existsSync(MESSAGES_FILE)) writeJSON(MESSAGES_FILE, []);

let stripe: Stripe | null = null;
const getStripe = () => {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.warn("STRIPE_SECRET_KEY is missing. Stripe functionality will be limited.");
      return null;
    }
    stripe = new Stripe(key);
  }
  return stripe;
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer (using memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  const PORT = 3000;

  app.use(express.json());

  // Socket.io Logic
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their private room`);
    });

    socket.on("chat:send", (data) => {
      const { to, from, message, fromName } = data;
      const timestamp = new Date().toISOString();
      const payload = { from, fromName, to, message, timestamp };
      
      const msgs = readJSON(MESSAGES_FILE, []);
      msgs.push(payload);
      writeJSON(MESSAGES_FILE, msgs);

      // Emit to the recipient's room
      io.to(to).emit("chat:receive", payload);
      // Echo back to sender for syncing (if they have multiple tabs)
      io.to(from).emit("chat:receive", payload);
    });

    socket.on("appointment:status_change", (data) => {
      const { to, appointmentId, status, message } = data;
      io.to(to).emit("notification:new", {
        type: "appointment_update",
        appointmentId,
        status,
        message,
        timestamp: new Date().toISOString()
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // --- CMS DB APIs ---
  app.get("/api/cms", (req, res) => {
    const cms = readJSON(CMS_FILE, defaultCMS);
    res.json(cms);
  });

  app.get("/api/cms/:section", (req, res) => {
    const { section } = req.params;
    const cms = readJSON(CMS_FILE, defaultCMS);
    res.json(cms[section] || null);
  });

  app.post("/api/cms/:section", (req, res) => {
    const { section } = req.params;
    const data = req.body;
    const cms = readJSON(CMS_FILE, defaultCMS);
    cms[section] = data;
    writeJSON(CMS_FILE, cms);
    
    // Broadcast update to all clients via Socket.io
    io.emit("cms:update", { section, data });
    
    res.json({ success: true, section, data });
  });

  // --- DOCTORS DB APIs ---
  app.get("/api/doctors", (req, res) => {
    const docs = readJSON(DOCTORS_FILE, defaultDoctors);
    res.json(docs);
  });

  app.post("/api/doctors", (req, res) => {
    const newDoc = req.body;
    const docs = readJSON(DOCTORS_FILE, defaultDoctors);
    const id = newDoc.id || `DR-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const doc = {
      id,
      name: newDoc.name,
      specialty: newDoc.specialty,
      experience: newDoc.experience || "1 Yr",
      rating: 5.0,
      reviews: 0,
      availableToday: true,
      image: newDoc.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      location: newDoc.location || "New York, NY",
      about: newDoc.about || "Experienced practitioner.",
      patients: "0+",
      price: newDoc.price || "$100",
      email: newDoc.email,
      status: newDoc.status || "Pending",
      appointments: 0
    };
    docs.push(doc);
    writeJSON(DOCTORS_FILE, docs);
    
    res.json({ success: true, doctor: doc });
  });

  app.put("/api/doctors/:id", (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    const docs = readJSON(DOCTORS_FILE, defaultDoctors);
    const updatedDocs = docs.map((d: any) => d.id === id ? { ...d, ...updateFields } : d);
    writeJSON(DOCTORS_FILE, updatedDocs);
    res.json({ success: true, doctor: updatedDocs.find((d: any) => d.id === id) });
  });

  app.delete("/api/doctors/:id", (req, res) => {
    const { id } = req.params;
    const docs = readJSON(DOCTORS_FILE, defaultDoctors);
    const filteredDocs = docs.filter((d: any) => d.id !== id);
    writeJSON(DOCTORS_FILE, filteredDocs);
    res.json({ success: true });
  });

  // --- APPOINTMENTS DB APIs ---
  app.get("/api/appointments", (req, res) => {
    const { userId, doctorEmail } = req.query;
    let appointments = readJSON(APPOINTMENTS_FILE, defaultAppointments);
    
    if (userId) {
      appointments = appointments.filter((a: any) => a.userId === userId);
    }
    if (doctorEmail) {
      const docs = readJSON(DOCTORS_FILE, defaultDoctors);
      const docObj = docs.find((d: any) => d.email === doctorEmail);
      if (docObj) {
        appointments = appointments.filter((a: any) => a.doc === docObj.name);
      } else {
        appointments = appointments.filter((a: any) => a.doctorEmail === doctorEmail);
      }
    }
    res.json(appointments);
  });

  app.post("/api/appointments", (req, res) => {
    const newApt = req.body;
    const appointments = readJSON(APPOINTMENTS_FILE, defaultAppointments);
    const apt = {
      id: newApt.id || Math.random().toString(36).substr(2, 9),
      doc: newApt.doc,
      spec: newApt.spec,
      date: newApt.date,
      time: newApt.time,
      status: newApt.status || "Pending",
      price: newApt.price,
      paymentId: newApt.paymentId || "PAY-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId: newApt.userId
    };
    appointments.unshift(apt);
    writeJSON(APPOINTMENTS_FILE, appointments);
    
    res.json({ success: true, appointment: apt });
  });

  app.put("/api/appointments/:id", (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    const appointments = readJSON(APPOINTMENTS_FILE, defaultAppointments);
    const updatedApts = appointments.map((a: any) => a.id === id ? { ...a, ...updateFields } : a);
    writeJSON(APPOINTMENTS_FILE, updatedApts);
    res.json({ success: true, appointment: updatedApts.find((a: any) => a.id === id) });
  });

  app.delete("/api/appointments/:id", (req, res) => {
    const { id } = req.params;
    const appointments = readJSON(APPOINTMENTS_FILE, defaultAppointments);
    const filteredApts = appointments.filter((a: any) => a.id !== id);
    writeJSON(APPOINTMENTS_FILE, filteredApts);
    res.json({ success: true });
  });

  // --- CHAT MESSAGES APIs ---
  app.get("/api/messages", (req, res) => {
    const { user1, user2 } = req.query;
    if (!user1 || !user2) {
      return res.status(400).json({ error: "Missing identity query parameters (user1 and user2)" });
    }
    const msgs = readJSON(MESSAGES_FILE, []);
    const filteredMsgs = msgs.filter((m: any) => 
      (m.from === user1 && m.to === user2) || 
      (m.from === user2 && m.to === user1)
    );
    res.json(filteredMsgs);
  });

  // API Route: File Upload 
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Convert buffer to base64 for Cloudinary upload
      const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(fileBase64, {
        folder: "medicare_uploads",
        resource_type: "auto",
      });

      res.json({
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        bytes: result.bytes,
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({ error: error.message || "Failed to upload file" });
    }
  });

  // API Route: Create Payment Intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency = "usd", metadata } = req.body;
      const stripeClient = getStripe();

      if (!stripeClient) {
        return res.status(503).json({ error: "Stripe service unavailable" });
      }

      const paymentIntent = await stripeClient.paymentIntents.create({
        amount,
        currency,
        metadata,
        payment_method_types: ["card"],
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Payment Intent Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
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

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
