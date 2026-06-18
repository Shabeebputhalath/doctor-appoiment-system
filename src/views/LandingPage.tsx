import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { subscribeToCMS } from '../services/cmsService';
import { toast } from 'sonner';
import { 
  Stethoscope, 
  ChevronDown, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Star, 
  Plus, 
  Minus,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  HeartPulse,
  Syringe,
  Activity,
  UserRound,
  Globe,
  Menu,
  X,
  Smile,
  Award,
  Sparkles,
  Play,
  LayoutDashboard
} from 'lucide-react';

// --- Types ---

interface ServiceProps {
  icon: any;
  title: string;
  desc: string;
  color: string;
  image: string;
  key?: React.Key;
}

interface FAQItem {
  question: string;
  answer: string;
  key?: React.Key;
}

// --- Navigation ---

const Navbar = ({ onLogin, onFindDoctors, profile, onEnterDashboard }: { onLogin: () => void, onFindDoctors: () => void, profile?: any, onEnterDashboard?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 md:py-6 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 rounded-full px-5 sm:px-8 py-3.5 shadow-[0_15px_45px_rgba(37,99,235,0.22)] border border-blue-500/60 flex items-center justify-between transition-all duration-300">
          
          {/* Left Side: Medical Icon + Two-line Text Header */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Beautiful stylized white circular seal containing health/medical cross and caregiver hybrid */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="7" r="2.5" fill="currentColor" />
                <path d="M12 11.5v8.5M8 15h8M7 19.5c0-2.5 2-4.5 5-4.5s5 2 5 4.5" strokeLinecap="round" />
              </svg>
            </div>
            
            {/* Title & Organization Type labels stacked exactly as shown in screenshot */}
            <div className="text-left leading-tight">
              <div className="font-extrabold text-sm tracking-tight text-white uppercase sm:text-md">HealSync</div>
              <div className="text-[9px] font-bold text-white/90 tracking-widest font-mono uppercase">Specialist Hospital</div>
            </div>
          </div>

          {/* Central Nav Links matching screenshot exactly */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {[
              { label: 'Home', href: '#home' },
              { label: 'Service', href: '#services' },
              { label: 'About Us', href: '#aboutus' },
              { label: 'Reviews', href: '#reviews' },
              { label: 'FAQs', href: '#faq' }
            ].map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-white/85 hover:text-white font-sans text-xs md:text-sm font-bold tracking-wide transition-all duration-150 hover:scale-[1.03]"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action Button: Book Appointment with premium white pill color styling */}
          <div className="flex items-center gap-2 sm:gap-3">
            {profile ? (
              <button 
                onClick={onEnterDashboard}
                className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider scale-[0.98] hover:scale-100 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <LayoutDashboard size={14} />
                Enter {profile.role === 'patient' ? 'Patient' : profile.role === 'doctor' ? 'Doctor' : 'Admin'} Dashboard →
              </button>
            ) : (
              <button 
                onClick={onLogin}
                className="hidden md:flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider scale-[0.98] hover:scale-100 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
              >
                Login / Sign Up
              </button>
            )}

            <button 
              onClick={onFindDoctors}
              className="hidden sm:flex items-center justify-center bg-white text-blue-600 hover:bg-slate-50 hover:text-blue-700 px-6 py-2.5 rounded-full text-xs font-black tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-250 whitespace-nowrap cursor-pointer"
            >
              Book Appointment
            </button>
            
            {/* Hamburger menu toggle button for responsive tablets/mobiles */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu with matching theme design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="lg:hidden mt-2 mx-auto max-w-sm bg-[#1E293B]/95 backdrop-blur-md rounded-3xl border border-white/10 p-5 shadow-2xl pointer-events-auto"
          >
            <div className="space-y-1">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Service', href: '#services' },
                { label: 'About Us', href: '#aboutus' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'FAQs', href: '#faq' }
              ].map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="block text-xs font-bold text-white py-3 px-5 rounded-2xl hover:bg-white/10 hover:text-white transition-all"
                >
                  {item.label}
                </a>
              ))}
              
              <div className="h-px bg-white/20 my-2" />
              
              <button 
                onClick={() => {
                  onFindDoctors();
                  setIsOpen(false);
                }}
                className="block w-full text-center text-xs font-black text-blue-600 bg-white py-3.5 px-5 rounded-2xl hover:bg-slate-50 transition-all shadow-md mb-2"
              >
                Book Appointment
              </button>

              {profile ? (
                <button 
                  onClick={() => {
                    onEnterDashboard?.();
                    setIsOpen(false);
                  }}
                  className="block w-full text-center text-xs font-black text-white bg-emerald-500 hover:bg-emerald-600 py-3.5 px-5 rounded-2xl transition-all shadow-md"
                >
                  Enter {profile.role === 'patient' ? 'Patient' : profile.role === 'doctor' ? 'Doctor' : 'Admin'} Dashboard →
                </button>
              ) : (
                <button 
                  onClick={() => {
                    onLogin();
                    setIsOpen(false);
                  }}
                  className="block w-full text-center text-xs font-black text-white bg-white/10 hover:bg-white/20 border border-white/25 py-3.5 px-5 rounded-2xl transition-all"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero Section ---

const Hero = ({ onFindDoctors }: { onFindDoctors: () => void }) => {
  const [apptName, setApptName] = useState('');
  const [apptPhone, setApptPhone] = useState('');
  const [apptDate, setApptDate] = useState('');
  const [apptTime, setApptTime] = useState('');

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptName.trim() || !apptPhone.trim()) {
      toast.error('Please prefill your Name & Phone Number to schedule.');
      return;
    }
    toast.success(`Welcome ${apptName}! Directing you to our verified specialist dentists directory...`);
    
    // Store metadata locally to autofill in lists/appointments later
    localStorage.setItem('temp_appt_name', apptName);
    localStorage.setItem('temp_appt_phone', apptPhone);
    localStorage.setItem('temp_appt_date', appptDateDefault);
    localStorage.setItem('temp_appt_time', appptTimeDefault);

    setTimeout(() => {
      onFindDoctors();
    }, 1200);
  };

  const appptDateDefault = apptDate || "2026-06-15";
  const appptTimeDefault = apptTime || "10:30";

  return (
    <section id="home" className="pt-32 lg:pt-36 pb-32 px-6 relative overflow-hidden bg-[#FAFBFD]">
      {/* Premium background details */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -mr-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-sky-550/5 rounded-full blur-[100px] -ml-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
          
          {/* Left Hero Column */}
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-100/60 px-4 py-2 rounded-full shadow-sm">
              <Sparkles size={13} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 font-mono">Expert Doctor Bookings, Instantly Scheduled</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl xl:text-[76px] font-display font-black text-[#0F172A] leading-[1.05] tracking-tight">
              Your <span className="text-blue-600">Smart Care<br />Specialists</span> Await
            </h1>

            <p className="text-slate-500 font-semibold text-sm md:text-base max-w-xl leading-relaxed">
              Connect with certified cardiologists, pediatricians, dermatologists, and primary physicians. HealSync provides real-time calendar selection, seamless tele-health solutions, and painless expert consultation bookings.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
              <a 
                href="#services"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/15 hover:shadow-blue-600/30 hover:scale-[1.01] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 font-mono"
              >
                Explore Our Services <ArrowRight size={14} />
              </a>
              <button 
                onClick={onFindDoctors}
                className="flex items-center gap-3 px-6 py-4 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50/80 text-[#0F172A] text-xs font-black uppercase tracking-wider transition-all duration-200 hover:border-slate-300 font-mono"
              >
                <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <Play size={10} fill="currentColor" />
                </div>
                Watch Video
              </button>
            </div>
          </motion.div>

          {/* Right Hero Column: Medical Professional with masked circular shapes and stars */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Star details like the dental mock blueprint */}
              <div className="absolute top-6 left-6 text-blue-600 animate-pulse">
                <Sparkles size={32} />
              </div>
              <div className="absolute -bottom-4 right-10 text-cyan-500 opacity-60">
                <Sparkles size={18} />
              </div>
              
              {/* Outer Blue Circle Base matching mock */}
              <div className="absolute inset-4 rounded-full bg-blue-600/10 border-2 border-dashed border-blue-600/20 animate-[spin_50s_linear_infinite]" />
              
              {/* Dynamic Shape base containing doctor cutout */}
              <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[400px] rounded-b-full rounded-t-[10rem] bg-gradient-to-tr from-blue-600 to-indigo-650 overflow-hidden shadow-2xl shadow-blue-500/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.15),transparent)]" />
                <img 
                   src="https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600&auto=format&fit=crop" 
                   alt="Certified Healthcare Specialist" 
                   className="h-[100%] w-full object-cover object-top relative z-10 hover:scale-102 transition-transform duration-700 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                   referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Contact Badge overlay */}
              <div className="absolute bottom-6 left-6 p-3 bg-white rounded-2xl border border-slate-100 shadow-xl flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                  <Phone size={14} className="animate-bounce" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-black uppercase text-slate-400 tracking-wider font-mono">Emergency Hotline</p>
                  <p className="font-display font-black text-xs text-slate-900">+1 (800) 555-0199</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- Floating Appointment Booking Bar --- */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_25px_65px_rgba(15,23,42,0.04)] p-6 lg:p-8"
        >
          <form onSubmit={handleBookSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
            {/* Input 1: Name */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono flex items-center gap-2 pl-1">
                <UserRound size={11} className="text-blue-600" /> Name
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={apptName}
                  onChange={(e) => setApptName(e.target.value)}
                  placeholder="John Doe" 
                  className="w-full h-14 pl-4 pr-4 bg-slate-50 border border-slate-100/80 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-mono"
                  required
                />
              </div>
            </div>

            {/* Input 2: Phone */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono flex items-center gap-2 pl-1">
                <Phone size={11} className="text-blue-600" /> Phone Number
              </label>
              <div className="relative">
                <input 
                  type="tel" 
                  value={apptPhone}
                  onChange={(e) => setApptPhone(e.target.value)}
                  placeholder="Your Phone" 
                  className="w-full h-14 pl-4 bg-slate-50 border border-slate-100/80 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-mono"
                  required
                />
              </div>
            </div>

            {/* Input 3: Date */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono flex items-center gap-2 pl-1">
                <Clock size={11} className="text-blue-600" /> Preferred Date
              </label>
              <input 
                type="date" 
                value={apptDate}
                onChange={(e) => setApptDate(e.target.value)}
                className="w-full h-14 px-4 bg-slate-50 border border-slate-100/80 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-mono"
              />
            </div>

            {/* Input 4: Time */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono flex items-center gap-2 pl-1">
                <Clock size={11} className="text-blue-600" /> Preferred Time
              </label>
              <select 
                value={apptTime}
                onChange={(e) => setApptTime(e.target.value)}
                className="w-full h-14 px-4 bg-slate-50 border border-slate-100/80 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-mono"
              >
                <option value="09:00">09:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:30">03:30 PM</option>
              </select>
            </div>

            {/* CTA Book Button */}
            <button
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-95 transition-all text-center flex items-center justify-center cursor-pointer font-mono"
            >
              Book an Appointment
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

// --- Brand Tickers (Horizontal scrolling effect) ---

const BrandTicker = () => {
  const specialities = [
    "Primary Care", "Cardiovascular Care", "Pediatric Wellness", "Dermatology Clinic", 
    "Neurological Health", "Orthopedics & Joint Care", "Emergency Response", "Internal Medicine"
  ];

  return (
    <div className="w-full bg-blue-600 text-white py-4 overflow-hidden select-none border-y border-blue-500 whitespace-nowrap">
      <div className="inline-flex animate-[marquee_25s_linear_infinite]">
        {[...specialities, ...specialities, ...specialities].map((spec, i) => (
          <div key={i} className="inline-flex items-center mx-10 text-xs font-black uppercase tracking-[0.25em] font-mono">
            <Activity size={14} className="mr-3 shrink-0 text-white" />
            {spec}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- About Us Section (curved shape masked collage) ---

const AboutUs = () => {
  return (
    <section id="aboutus" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Curved photo collage with stars */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient circle backplate */}
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-50 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 -z-10" />
            
            {/* Overlapping Tooth Masking Container styling */}
            <div className="relative">
              <div className="rounded-[4rem] rounded-tr-[12rem] overflow-hidden border-8 border-slate-50 shadow-2xl relative w-[320px] h-[400px] hover:scale-[1.01] transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1579684389781-75089d64438b?q=80&w=600&auto=format&fit=crop" 
                  alt="Friendly family checkup" 
                  className="w-full h-full object-cover"
                />
                
                {/* Visual Spark stars overlay */}
                <span className="absolute top-8 left-8 text-white filter drop-shadow">
                  <Sparkles size={28} />
                </span>
                
                {/* "CONTACT" badge in circle */}
                <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-[#0F172A] border-2 border-slate-800 text-white flex items-center justify-center flex-col animate-[spin_20s_linear_infinite] cursor-pointer">
                  <span className="text-[6px] font-black tracking-widest uppercase">Medical</span>
                  <span className="text-[6px] font-black tracking-widest uppercase">Expert</span>
                </div>
              </div>

              {/* Tooth shape abstract border accent */}
              <div className="absolute -top-6 -right-6 text-blue-600 animate-pulse">
                <Sparkles size={18} />
              </div>
            </div>
          </div>

          {/* Right Column: About Us details */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-55 font-mono text-blue-600 bg-blue-50">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#0F172A] tracking-tight leading-tight">
                15 Years of Expertise <br />in Patient Care
              </h2>
            </div>

            <p className="text-slate-500 font-semibold text-sm md:text-base leading-relaxed">
              We offer comprehensive patient-focused care with verified expert doctors. Our certified specialists prioritize patient wellness above all else, ensuring that every consultation, diagnosis, and treatment is customized with advanced medical insights.
            </p>

            <div className="space-y-4">
              {[
                "Premium Healthcare Services You Can Trust",
                "Award Winning Criteria In Specialist Medicine",
                "Dedicated Medical Pioneers Behind Every Recovery"
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <CheckCircle2 size={12} fill="currentColor" className="text-white group-hover:text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a 
                href="#services"
                className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-8 py-4.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md shadow-blue-600/10 font-mono"
              >
                Learn More
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Services Grid & Interactive Panel ---

const SERVICE_DETAILS: Record<string, {
  highlights: { title: string; desc: string }[];
  checklist: string[];
  certifications: string[];
  badgeText: string;
}> = {
  "General Practice": {
    badgeText: "Primary Medicine",
    highlights: [
      { title: "Preventive Health Assessments", desc: "Complete vital metrics review and standard blood sugar/pressure screening." },
      { title: "Immunizations & Vaccines", desc: "Safe flu shots, travel vaccinations, and seasonal wellness support sessions." },
      { title: "Chronic Disease Care", desc: "Advanced treatment maps for hypertension, asthma, allergy, and diabetes control." }
    ],
    checklist: ["Vitals Screening", "Prescriptions", "Family Wellness", "Diagnostic Referrals"],
    certifications: ["AMA Compliant", "FDA Approved"]
  },
  "Specialist Consultation": {
    badgeText: "Advanced Diagnostics",
    highlights: [
      { title: "Targeted Organ Screenings", desc: "Advanced cardiac stress tests, dermatological mapping, and neuropathic reviews." },
      { title: "Precision Treatment Mapping", desc: "Personalized therapeutic protocols designed by board-certified specialists." },
      { title: "Post-Operative Recovery Plans", desc: "Meticulous follow-up care and recovery tracking to guarantee optimal healing." }
    ],
    checklist: ["Expert Diagnostics", "Advanced Imaging", "Board Certified Care", "Targeted Therapies"],
    certifications: ["Fellow of ACP/ACC", "Board Vetted Specialist"]
  },
  "Telemedicine Consult": {
    badgeText: "On-demand Virtual Care",
    highlights: [
      { title: "Instant Virtual Waiting Room", desc: "Secure connection within 15 minutes for acute symptoms and prescription refills." },
      { title: "Digital Prescription Routing", desc: "Automatic local pharmacy routing for hassle-free order fills." },
      { title: "Care Anywhere Coordination", desc: "Includes online follow-ups and specialist referrals without leaving home." }
    ],
    checklist: ["HD Encrypted Stream", "Pharmacies Integrated", "Zero Travel Required", "Immediate Care"],
    certifications: ["HIPAA Certified Server", "Telehealth Board Vetted"]
  },
  "Urgent Care & Triage": {
    badgeText: "Immediate Medical Response",
    highlights: [
      { title: "Accelerated Patient Flow", desc: "Priority check-ins for high fevers, deep cuts, and urgent diagnostic tests." },
      { title: "On-Site Laboratory Diagnostics", desc: "Immediate blood counts, rapid strep tests, and emergency x-rays." },
      { title: "Wound Treatment & Splinting", desc: "Professional medical suturing, sterile bandaging, and orthopedic supports." }
    ],
    checklist: ["Walk-Ins Welcome", "Full Trauma Splint", "Rapid Lab On-Site", "Painless Recovery"],
    certifications: ["AAUCM Registered Clinic"]
  }
};

const getServiceDetailInfo = (title: string) => {
  return SERVICE_DETAILS[title] || {
    badgeText: "Elite Care Design",
    highlights: [
      { title: "State-of-the-Art Patient Care", desc: `Comprehensive, certified health treatments designed explicitly for your comfort and longevity.` },
      { title: "Certified Clinical Guidelines", desc: "Every consultation, treatment, and evaluation conforms strictly to gold-standard medical codes." }
    ],
    checklist: ["Medical Core", "Board Vetted Partners", "Advanced Tools", "Pain-free Solutions"],
    certifications: ["Clinical Class-I Approved"]
  };
};

const CoreServiceCard = ({ title, desc, icon: Icon, image, onOpen, isActive }: ServiceProps & { onOpen: () => void, isActive: boolean }) => (
  <motion.div 
    whileHover={{ y: -6 }}
    onClick={onOpen}
    className={`rounded-3xl border text-left flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 min-h-[380px] bg-white ${
      isActive 
        ? "border-blue-600 shadow-xl ring-2 ring-blue-600/10" 
        : "border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.015)] hover:border-slate-200 hover:shadow-lg"
    }`}
  >
    {/* Product photo inside rounded frame */}
    <div className="relative h-44 w-full bg-slate-50 overflow-hidden shrink-0">
      <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
      
      {/* Floating circle indicator icon in middle bottom */}
      <div className="absolute -bottom-5 left-6 w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20">
        <Icon size={16} />
      </div>
    </div>

    {/* Details portion */}
    <div className="p-6 pt-8 flex-grow flex flex-col justify-between">
      <div className="space-y-2">
        <h3 className={`text-lg font-display font-black tracking-tight leading-snug transition-colors ${isActive ? 'text-blue-600' : 'text-slate-900'}`}>
          {title}
        </h3>
        <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-sm">
          {desc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-50 flex items-center justify-between mt-4">
        <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
          {isActive ? 'Active Care' : 'Read Path'}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
          <ArrowRight size={12} />
        </div>
      </div>
    </div>
  </motion.div>
);

const Services = ({ onFindDoctors }: { onFindDoctors?: () => void }) => {
  const [list, setList] = useState<ServiceProps[]>([
    { 
      icon: Stethoscope, 
      title: "General Practice", 
      desc: "Preventive medicine, detailed screenings, prescription refills, and active family health consultations.", 
      color: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1579684389781-75089d64438b?q=80&w=400&auto=format&fit=crop"
    },
    { 
      icon: ShieldCheck, 
      title: "Specialist Consultation", 
      desc: "Instant matching and scheduling with top-rating cardiologists, dermatologists, and neurologists.", 
      color: "bg-cyan-600",
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=400&auto=format&fit=crop"
    },
    { 
      icon: Activity, 
      title: "Telemedicine Consult", 
      desc: "Encrypted high-definition virtual visits for immediate diagnosis, care recommendations, and digital Pharmacy fills.", 
      color: "bg-indigo-600",
      image: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?q=80&w=400&auto=format&fit=crop"
    },
    { 
      icon: HeartPulse, 
      title: "Urgent Care & Triage", 
      desc: "Rapid diagnostic responses, acute disease treatments, physical injury aids, and non-emergency clinic checks.", 
      color: "bg-teal-600",
      image: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?q=80&w=400&auto=format&fit=crop"
    }
  ]);

  const [selectedService, setSelectedService] = useState<ServiceProps | null>(list[0]);
  const details = selectedService ? getServiceDetailInfo(selectedService.title) : null;

  return (
    <section id="services" className="py-24 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header containing tag and Explore All button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="max-w-xl space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-55 text-blue-600 bg-blue-50 font-mono">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#0F172A] tracking-tight leading-tight">
              A Wide Range of Specialties <br />for Your Health and Wellness
            </h2>
          </div>
          <button 
            onClick={onFindDoctors}
            className="self-start md:self-end bg-blue-600 hover:bg-blue-700 text-white px-8 py-4.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md shadow-blue-500/10 font-mono"
          >
            Explore All Services
          </button>
        </div>

        {/* 4 Cards Grid Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {list.map((item, index) => (
            <CoreServiceCard 
              key={index} 
              {...item} 
              isActive={selectedService?.title === item.title}
              onOpen={() => setSelectedService(item)}
            />
          ))}
        </div>

        {/* Interactive Workspace Area Detail Panel */}
        <AnimatePresence mode="wait">
          {selectedService && details && (
            <motion.div
              key={selectedService.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[2.8rem] p-8 md:p-10 border border-slate-100 shadow-xl overflow-hidden flex flex-col text-left relative"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[60px]" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left of workspace: Highlights lists */}
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md font-mono mb-4">
                      {details.badgeText}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                        {React.createElement(selectedService.icon, { size: 20 })}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 tracking-tight">
                        {selectedService.title} Details
                      </h3>
                    </div>
                    <p className="text-slate-500 font-semibold text-xs md:text-sm leading-relaxed max-w-xl">
                      {selectedService.desc} We practice precise dental standards ensuring optimal comfort, high accuracy outcomes, and full compliance parameters.
                    </p>
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* Highlights loop */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] font-mono">
                      Key Pathways Provided
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {details.highlights.map((h, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-[#FAFBFD] border border-slate-100 hover:bg-white hover:border-blue-100 transition-all flex gap-3">
                          <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <h5 className="font-extrabold text-[#0F172A] tracking-tight text-xs sm:text-sm">{h.title}</h5>
                            <p className="text-[11px] text-slate-400 font-medium leading-normal">{h.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right of workspace: checklist badges and CTA click */}
                <div className="lg:col-span-5 bg-slate-50/50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-3 font-mono">Workflows</span>
                      <div className="flex flex-wrap gap-2">
                        {details.checklist && details.checklist.map((c, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-xl bg-white border border-slate-100 text-[10px] font-bold text-slate-700 flex items-center gap-1.5 font-mono shadow-sm">
                            <Smile size={10} className="text-blue-600 shrink-0" />
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-3 font-mono">Accreditations</span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[8px] font-black uppercase tracking-widest bg-[#0F172A] text-white px-2 py-1 rounded-md font-mono shadow-sm">HIPAA COMPLIANT</span>
                        {details.certifications && details.certifications.map((cert, idx) => (
                          <span key={idx} className="text-[8px] font-black uppercase tracking-widest bg-white text-slate-650 border border-slate-150 px-2 py-1 rounded-md font-mono shadow-sm">{cert}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={onFindDoctors}
                    className="w-full h-14 rounded-2xl bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer mt-8 font-mono"
                  >
                    Select Medical Specialist <ArrowRight size={12} />
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

// --- Why Choose Us Section ---

const WhyChooseUs = ({ onFindDoctors }: { onFindDoctors?: () => void }) => {
  return (
    <section id="specialists" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Doctor circular photo with bubbles/stars decorations */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Dotted pattern detail */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-[radial-gradient(#3b82f6_2px,transparent_2px)] [background-size:12px_12px] opacity-40 -translate-x-6 -translate-y-6 pointer-events-none" />
            
            <div className="relative">
              {/* Outer decorative borders mapping mock */}
              <div className="absolute inset-x-0 -bottom-6 top-6 border border-dashed border-blue-600/20 rounded-[10rem]" />
              
              <div className="relative w-[300px] h-[340px] rounded-t-[10rem] rounded-b-3xl overflow-hidden border-4 border-slate-50 shadow-2xl bg-gradient-to-tr from-sky-450 to-blue-650 hover:scale-[1.01] transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=600&auto=format&fit=crop" 
                  alt="Specialist Medical smiling" 
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Play button overlay */}
                <div onClick={onFindDoctors} className="absolute inset-0 bg-black/10 hover:bg-black/20 flex items-center justify-center transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center text-blue-600 shadow-xl group-hover:scale-110 transition-transform">
                    <Play size={18} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Sparkles element */}
              <span className="absolute -bottom-4 -left-4 text-blue-600">
                <Sparkles size={24} />
              </span>
            </div>
          </div>

          {/* Right Column: Key metrics counters and points list */}
          <div className="lg:col-span-7 space-y-10 text-left">
            <div className="space-y-3">
              <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 font-mono">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#0F172A] tracking-tight leading-tight">
                Benefits of HealSync Care:<br />
                Your Path to Better Health
              </h2>
            </div>

            {/* Metrics Counters */}
            <div className="grid grid-cols-3 gap-6 p-6 rounded-3xl bg-slate-50/80 border border-slate-100/50">
              <div className="text-center space-y-1">
                <p className="text-2xl sm:text-3.5xl font-display font-black text-blue-600 leading-none">10+</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Skilled Doctors</p>
              </div>
              <div className="text-center space-y-1 border-x border-slate-200/60">
                <p className="text-2xl sm:text-3.5xl font-display font-black text-blue-600 leading-none">99%</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Patient Satisfy</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-2xl sm:text-3.5xl font-display font-black text-blue-600 leading-none">20K+</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Bookings Done</p>
              </div>
            </div>

            {/* Bullet points mapping checkbox highlights */}
            <div className="space-y-4">
              {[
                { title: "Easy Online Appointment Booking", copy: "Instantly claim and schedule specific medical specialist calendars in real-time." },
                { title: "Experienced and Certified Doctors", copy: "Every member of our medical board has over 8 years of certified hospital clinic practice." },
                { title: "Advanced Medical Equipment", copy: "Employing high-definition ultrasound, digital monitoring, and certified diagnostic systems." }
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-md shadow-blue-500/10">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-[#0F172A] tracking-tight text-sm sm:text-base">{bullet.title}</h4>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">{bullet.copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button 
                onClick={onFindDoctors}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/15 hover:shadow-blue-600/30 transition-all font-mono"
              >
                Book an Appointment
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Testimonials Section (Patient Stories) ---

const Testimonials = () => {
  const [reviews, setReviews] = useState([
    { name: "Sarah Jenkins", role: "Primary Care Patient", text: "The checkups and diagnostic reports were incredibly clear and smooth. I scheduled my slot instantly and got my treatment plan on the same day. Highly professional team!", rating: 5 },
    { name: "Dr. Robert Chen", role: "Senior Medical Advisor", text: "Providing top-notch clinical work is delightful with HealSync. The scheduling integrations and real-time patient charts are optimal.", rating: 5 },
    { name: "Emily Watson", role: "Cardiology Department", text: "I had my cardiology scans and general assessments completed. My health parameters are fully tracked, and the doctors were extremely caring. Outstanding standards!", rating: 5 },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return subscribeToCMS('testimonials', (data) => data && data.length > 0 && setReviews(data));
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const activeReview = reviews[activeIndex] || reviews[0];

  const getInitials = (name: string) => {
    if (!name) return "PT";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <section id="reviews" className="py-24 px-6 bg-[#F8FAFC] overflow-hidden relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Score, and Slider Controls */}
          <div className="lg:col-span-5 text-left space-y-8 lg:pr-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100/60 font-mono">
                Patient Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#0F172A] tracking-tighter leading-tight">
                What Our Community <br />Says About Us.
              </h2>
            </div>

            {/* Aggregate Trust Score Bento */}
            <div className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.015)] space-y-4 hover:border-blue-100/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="flex text-amber-500 gap-0.5">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <span className="text-xs font-black text-[#0F172A] font-mono">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Aggregated from over <span className="text-slate-900 font-bold">1,200+ verified appointments</span> and pediatric clinical tracking records.
              </p>
            </div>

            {/* Controls (Arrows & Pagination Tracker) */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100/60">
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next/Prev buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 text-slate-650 hover:text-slate-950 transition-all active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ArrowRight className="rotate-180" size={18} />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-md shadow-slate-950/10 active:scale-95 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sliding Showcase Testimonial Card */}
          <div className="lg:col-span-7 relative">
            <div className="bg-white rounded-[2.8rem] p-8 md:p-12 border border-slate-100 shadow-[0_30px_70px_rgba(15,23,42,0.03)] min-h-[320px] flex flex-col justify-between relative overflow-hidden text-left hover:border-indigo-100/50 transition-all duration-300">
              
              <span className="absolute -right-4 -bottom-10 text-[200px] font-display font-black text-slate-50 select-none pointer-events-none leading-none opacity-80 font-mono">
                ”
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-6 select-none relative z-10 flex-grow flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(activeReview.rating || 5)].map((_, idx) => (
                        <Star key={idx} size={15} fill="currentColor" stroke="none" />
                      ))}
                    </div>

                    <blockquote className="text-base md:text-lg text-slate-700 font-medium leading-relaxed italic tracking-tight">
                      "{activeReview.text}"
                    </blockquote>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-650 to-blue-500 flex items-center justify-center text-white font-black text-xs font-display shadow-md shrink-0">
                        {getInitials(activeReview.name)}
                      </div>
                      <div className="text-left">
                        <cite className="not-italic font-display font-black text-slate-900 text-sm md:text-base">
                          {activeReview.name}
                        </cite>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5 mt-0.5 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                          {activeReview.role || 'Orthodontic Client'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- FAQ Item Component ---

const FAQItemComp = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-slate-100 transition-all duration-300 ${isOpen ? 'py-7 bg-slate-50/20 px-4 rounded-2xl' : 'py-5'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group gap-4 cursor-pointer"
      >
        <span className={`text-base md:text-lg font-display font-black tracking-tight transition-colors duration-250 ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-350 shrink-0 ${isOpen ? 'rotate-180 bg-blue-600 border-blue-650 text-white' : 'border-slate-200 text-slate-400 group-hover:border-slate-350'}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-500 font-semibold leading-relaxed text-xs md:text-sm max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- FAQ List ---

const FAQ = () => {
  const [items, setItems] = useState([
    { id: 1, question: "How do I book an appointment with a doctor?", answer: "Browse through our specialist list, find a doctor, select your preferred date slot, fill in key symptoms, and click Book instantly." },
    { id: 2, question: "Are telehealth consultations covered by insurance?", answer: "Yes, 100%. Our digital consultations and treatment plans qualify under major national and regional wellness provider coverages." },
    { id: 3, question: "What is your rescheduling cancellation logic?", answer: "You can reschedule or cancel any booked consultation up to 24 hours before your slot directly from your patient dashboard menu." },
    { id: 4, question: "How do you guarantee patient safety and records privacy?", answer: "All health reports, biometric tracking data, and clinical messages are locked secure under multi-layered end-to-end HIPAA compliant storage." },
  ]);

  useEffect(() => {
    return subscribeToCMS('faq', (data) => data && setItems(data));
  }, []);

  return (
    <section id="faq" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
           <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100/50 mb-4 font-mono">
             Common Questions
           </span>
           <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tighter leading-tight">
              Patient Help Desk.
           </h2>
        </div>
        <div className="bg-white p-6 md:p-12 rounded-[2.8rem] shadow-[0_30px_70px_rgba(15,23,42,0.025)] border border-slate-100">
          <div className="divide-y divide-slate-100">
            {items.map((item, i) => <FAQItemComp key={item.id || i} {...item} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---

const Footer = () => (
  <footer className="bg-[#0F172A] py-24 pb-12 px-6 text-white overflow-hidden relative">
    <div className="max-w-7xl mx-auto relative z-10 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 lg:col-span-1 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <Smile size={24} />
            </div>
            <span className="font-display font-black text-2xl tracking-tighter">HealSync</span>
          </div>
          <p className="text-slate-400 font-semibold leading-relaxed text-xs">
            Modernizing the patient experience with smart technology, certified medical practitioners, and compassionate care.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white font-mono">Quick Links</h5>
          <ul className="space-y-4 text-slate-400 font-bold text-sm">
            <li><a href="#aboutus" className="hover:text-blue-500 transition-colors">About Us</a></li>
            <li><a href="#services" className="hover:text-blue-500 transition-colors">Medical Services</a></li>
            <li><a href="#faq" className="hover:text-blue-500 transition-colors">Patient Portal FAQ</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms & Records Safeguards</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white font-mono">Contact Us</h5>
          <ul className="space-y-4 text-slate-400 font-bold text-sm">
            <li className="flex items-center gap-3 text-xs"><MapPin size={16} className="text-blue-600" /> Manhattan Office, 10001, USA</li>
            <li className="flex items-center gap-3 text-xs"><Phone size={16} className="text-blue-600" /> +1 (800) 555-0199</li>
            <li className="flex items-center gap-3 text-xs"><Mail size={16} className="text-blue-600" /> contact@healsync.com</li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white font-mono">Newsletter</h5>
          <p className="text-slate-400 text-xs font-semibold mb-6">Stay updated with critical health and medical recommendations.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-white/5 border-none px-4 py-3 rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-blue-600 outline-none" 
            />
            <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">© 2026 HealSync Medical Group. All Rights Reserved.</p>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Clinical System Online</p>
        </div>
      </div>
    </div>
  </footer>
);

// --- Landing Page View ---

export const LandingPage = ({ onLogin, onFindDoctors, profile, onEnterDashboard }: { 
  onLogin: () => void, 
  onFindDoctors: () => void,
  profile?: any,
  onEnterDashboard?: () => void
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onLogin={onLogin} onFindDoctors={onFindDoctors} profile={profile} onEnterDashboard={onEnterDashboard} />
      <Hero onFindDoctors={onFindDoctors} />
      <BrandTicker />
      <AboutUs />
      <Services onFindDoctors={onFindDoctors} />
      <BrandTicker />
      <WhyChooseUs onFindDoctors={onFindDoctors} />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};
