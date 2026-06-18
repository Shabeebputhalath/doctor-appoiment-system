import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  HeartPulse,
  Menu,
  X,
  Stethoscope,
  Activity,
  Award,
  Sparkles,
  Users,
  Check
} from 'lucide-react';

import { Doctor, doctors } from '../data/doctors';

export const DoctorsListing = ({ onBack, onBook, onViewProfile, profile, onEnterDashboard }: { 
  onBack: () => void, 
  onBook: (docId: string) => void,
  onViewProfile: (docId: string) => void,
  profile?: any,
  onEnterDashboard?: () => void
}) => {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(doctors);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/api/doctors')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Server offline');
      })
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Standardize fields if capitalization is different (e.g., Dentistry vs Dentist)
          const parsed = data.map((d: any) => ({
            ...d,
            specialty: d.specialty === 'Dentistry' ? 'Pediatrician' : d.specialty
          }));
          setDoctorsList(parsed.filter((d: any) => d.status === 'Verified' || d.status === undefined));
        }
      })
      .catch((err) => console.log('Using static doctors fallback:', err));
  }, []);

  const specialties = ['All', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'General Medicine', 'Orthopedic'];

  const filteredDoctors = doctorsList.filter(doc => {
    const matchesSearch = (doc.name || '').toLowerCase().includes(search.toLowerCase()) || 
                          (doc.specialty || '').toLowerCase().includes(search.toLowerCase()) ||
                          (doc.about || '').toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-32 relative overflow-hidden">
      {/* Background decoration dots and light mesh glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/10 via-indigo-200/15 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-violet-200/10 via-indigo-100/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Premium Navbar matching LandingPage */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 md:py-6 pointer-events-none transition-all duration-300">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 rounded-full px-4 sm:px-8 py-3 shadow-[0_15px_45px_rgba(37,99,235,0.18)] border border-blue-500/50 flex items-center justify-between transition-all duration-300">
            
            {/* Left Side: Back trigger + Medical Icon/Logo Seal */}
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-md group shrink-0 active:scale-95 cursor-pointer"
                title="Back to Home"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div className="h-6 w-px bg-white/20 hidden xs:block" />
              <div 
                className="flex items-center gap-2.5 cursor-pointer group"
                onClick={onBack}
              >
                {/* Beautiful stylized white circular seal */}
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="7" r="2.5" fill="currentColor" />
                    <path d="M12 11.5v8.5M8 15h8M7 19.5c0-2.5 2-4.5 5-4.5s5 2 5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
                
                {/* Brand names stacked */}
                <div className="text-left leading-tight hidden xs:block">
                  <div className="font-extrabold text-sm tracking-tight text-white uppercase">HealSync</div>
                  <div className="text-[8px] font-bold text-white/90 tracking-widest font-mono uppercase">Specialist Hospital</div>
                </div>
              </div>
            </div>

            {/* Central Nav Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {[
                { label: 'Home', action: onBack },
                { label: 'Services', action: onBack },
                { label: 'Active Directory', action: () => {} },
                { label: 'Patient Portal', action: onBack }
              ].map((item) => (
                <button 
                  key={item.label} 
                  onClick={item.action}
                  className={`font-sans text-xs font-semibold tracking-wide transition-all duration-150 hover:scale-[1.03] ${
                    item.label === 'Active Directory' ? 'text-white font-black underline underline-offset-4' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Action buttons on the right */}
            <div className="flex items-center gap-3">
              {profile && (
                <button 
                  onClick={onEnterDashboard}
                  className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider scale-[0.98] hover:scale-100 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  <Activity size={12} />
                  Enter {profile.role === 'patient' ? 'Patient' : profile.role === 'doctor' ? 'Doctor' : 'Admin'} Dashboard →
                </button>
              )}

              <button 
                onClick={onBack}
                className="hidden sm:flex items-center justify-center bg-white text-blue-600 hover:bg-slate-50 hover:text-blue-700 px-6 py-2.5 rounded-full text-xs font-black tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-250 whitespace-nowrap cursor-pointer"
              >
                Go Back Home
              </button>
              
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Toggle navigation"
              >
                {isOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu with matching theme design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="lg:hidden mt-24 mx-4 bg-blue-600/95 backdrop-blur-md rounded-3xl border border-white/10 p-5 shadow-2xl pointer-events-auto fixed top-0 left-0 right-0 z-40"
          >
            <div className="space-y-1">
              {[
                { label: 'Home', action: onBack },
                { label: 'Services', action: onBack },
                { label: 'Active Directory', action: () => setIsOpen(false) },
                { label: 'Patient Portal', action: onBack }
              ].map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left text-sm font-bold text-white py-3 px-5 rounded-2xl hover:bg-white/10 hover:text-white transition-all"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="h-px bg-white/20 my-2" />
              
              {profile && (
                <button 
                  onClick={() => {
                    onEnterDashboard?.();
                    setIsOpen(false);
                  }}
                  className="block w-full text-center text-xs font-black text-white bg-emerald-500 py-3.5 px-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-md mb-2"
                >
                  Enter {profile.role === 'patient' ? 'Patient' : profile.role === 'doctor' ? 'Doctor' : 'Admin'} Dashboard →
                </button>
              )}

              <button 
                onClick={() => {
                  onBack();
                  setIsOpen(false);
                }}
                className="block w-full text-center text-xs font-black text-blue-600 bg-white py-3.5 px-5 rounded-2xl hover:bg-slate-50 transition-all shadow-md"
              >
                Exit to Landing Page
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Area - Redesigned elegantly in matching Off-White & deep high-contrast text */}
      <section className="pt-32 sm:pt-40 pb-12 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl text-left space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100/60 px-4 py-2 rounded-full shadow-sm">
              <Sparkles size={13} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 font-mono">HealSync Specialists Portal</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-[#0F172A] tracking-tight leading-[1.08]">
              Meet Certified <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">Expert Physicians</span>
            </h1>
            
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-xl leading-relaxed">
              Find premium medical specialists, review verified customer feedback, find clinic pricing, and seamlessly confirm real-time consult schedules instantly.
            </p>
          </div>

          {/* Premium High-Fidelity Search Bar with Glass effect */}
          <div className="mt-10 max-w-2xl">
            <div className="bg-white rounded-[2rem] p-2.5 shadow-[0_15px_45px_rgba(15,23,42,0.06)] border border-slate-100/80 flex flex-col sm:flex-row items-stretch gap-1.5 transition-all duration-300 hover:shadow-[0_15px_45px_rgba(15,23,42,0.09)]">
              <div className="flex-1 relative flex items-center">
                <Search className="absolute left-5 text-blue-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search doctors by name, specialty, or credentials..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50/50 text-slate-800 pl-13 pr-10 py-4 rounded-2xl text-xs sm:text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none border border-transparent focus:border-blue-500/30 transition-all placeholder:text-slate-400 font-sans"
                />
                {search && (
                  <button 
                    onClick={() => setSearch('')}
                    className="absolute right-3.5 w-6 h-6 bg-slate-200/80 hover:bg-slate-350/80 rounded-full flex items-center justify-center text-slate-600 text-[10px] font-black transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button className="bg-[#0F172A] hover:bg-blue-600 text-white rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0">
                <Filter size={14} className="text-blue-400" /> Filter Active
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-6 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Bento-style Specialty Filter Pills */}
          <div className="mb-12">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4 font-mono">Specialty Selection</p>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-hide">
              {specialties.map((specialty) => {
                const isActive = selectedSpecialty === specialty;
                return (
                  <button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`flex-shrink-0 px-6 sm:px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02] border border-blue-500/10' 
                        : 'bg-white text-slate-500 border border-slate-100 hover:text-[#0F172A] hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    {specialty}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Metadata Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>{filteredDoctors.length} Expert Doctors Available</span>
              <span className="text-xs bg-emerald-100/80 text-emerald-700 px-3 py-1 rounded-full font-black uppercase tracking-wider font-mono animate-pulse">Live</span>
            </h2>
            <div className="text-xs text-slate-400 font-bold font-mono">
              Filter: <strong className="text-blue-600 uppercase tracking-widest">{selectedSpecialty}</strong>
            </div>
          </div>

          {/* Premium Doctor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.4 }}
                key={doc.id}
                onClick={() => onViewProfile(doc.id)}
                className="bg-white rounded-[2.5rem] p-6 border border-slate-100/90 shadow-sm hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:border-blue-100/80 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Image container & Badges */}
                  <div className="relative mb-6 rounded-3xl overflow-hidden bg-slate-50 border border-slate-100/50 aspect-[4/3]">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer" 
                    />
                    
                    {/* Floating Availability Glow Tag */}
                    {doc.availableToday ? (
                      <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-emerald-500/20 flex items-center gap-1.5 border border-emerald-400/30">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        Available Today
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md text-white/90 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-white/10">
                        <Clock size={10} className="text-blue-400" />
                        Next: Tomorrow
                      </div>
                    )}

                    {/* Floating consultation fee badge */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#0F172A] px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg border border-slate-100 flex items-center gap-1 font-mono">
                      <span className="text-[9px] text-slate-400 font-normal font-sans mr-0.5">FROM</span>{doc.price}
                    </div>
                  </div>

                  {/* Rating & Specialty */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 font-mono flex items-center gap-1.5">
                      <Stethoscope size={11} /> {doc.specialty}
                    </p>
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-xl text-amber-600 text-xs font-black border border-amber-100">
                      <Star size={12} fill="currentColor" /> {doc.rating}
                    </div>
                  </div>

                  {/* Doctor Info Title & About brief */}
                  <h3 className="text-xl sm:text-2xl font-display font-black text-[#0F172A] tracking-tight group-hover:text-blue-600 transition-colors mb-3">
                    {doc.name}
                  </h3>
                  
                  <p className="text-slate-400 font-medium text-xs leading-relaxed line-clamp-2 mb-6">
                    {doc.about}
                  </p>

                  {/* Bento grids for metrics */}
                  <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                    <div className="flex items-center gap-2.5 text-slate-500">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100 shrink-0 shadow-sm">
                        <Award size={14} className="text-blue-500" />
                      </div>
                      <div className="text-left">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 font-mono">Practice</p>
                        <p className="text-xs font-bold text-[#0F172A]">{doc.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-500">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100 shrink-0 shadow-sm">
                        <Users size={14} className="text-blue-500" />
                      </div>
                      <div className="text-left">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 font-mono">Patients</p>
                        <p className="text-xs font-bold text-[#0F172A]">{doc.patients}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action footer with details and booking button */}
                <div className="pt-4 border-t border-slate-100/60 flex items-center justify-between gap-3">
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest font-mono shrink-0">
                    {doc.reviews} Verified Reviews
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onBook(doc.id);
                    }}
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Book Now <ChevronRight size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty search fallback */}
          {filteredDoctors.length === 0 && (
            <div className="mt-16 text-center max-w-sm mx-auto bg-white rounded-3xl p-8 border border-slate-150 shadow-sm">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-500 mb-4 animate-bounce">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">No Doctors Found</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed mb-6">
                We couldn't find any medical specialists matches for "{search}". Try selecting "All" or adjusting search constraints.
              </p>
              <button 
                onClick={() => {
                  setSearch('');
                  setSelectedSpecialty('All');
                }}
                className="bg-blue-600 text-white rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-md hover:bg-blue-700 transition"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

