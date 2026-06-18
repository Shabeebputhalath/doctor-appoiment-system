import React, { useState, useEffect } from 'react';
import { LandingPage } from './views/LandingPage';
import { DoctorsListing } from './views/DoctorsListing';
import { DoctorDetails } from './views/DoctorDetails';
import { Auth } from './views/Auth';
import { AdminAuth } from './views/AdminAuth';
import { motion, AnimatePresence } from 'motion/react';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { DoctorDashboard } from './components/dashboard/DoctorDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { Toaster, toast } from 'sonner';
import { useNotifications } from './hooks/useNotifications';
import { seedCMS } from './services/cmsService';
import { 
  User, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Activity, 
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  Bell,
  Zap,
  Star,
  CreditCard,
  FileText as FileTextIcon,
  ClipboardList,
  Stethoscope,
  BellRing,
  Menu,
  X as CloseIcon,
  MessageSquare,
  Search
} from 'lucide-react';

import { doctors } from './data/doctors';
import { createAppointmentRealtime } from './services/firebase';

// --- Components ---

const NotificationDropdown = ({ notifications, onClose }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    className="absolute top-16 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 py-4"
  >
    <div className="px-6 py-2 border-b border-slate-50 flex items-center justify-between mb-4">
      <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Notifications</h4>
      <span className="text-[10px] font-bold text-primary">{notifications.length} New</span>
    </div>
    <div className="max-h-80 overflow-y-auto">
      {notifications.length === 0 ? (
        <div className="p-10 text-center">
          <BellRing size={24} className="mx-auto text-slate-200 mb-2" />
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Inbox Zero</p>
        </div>
      ) : (
        notifications.map((n: any) => (
          <div key={n.id} className="px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group">
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{n.title}</p>
              <span className="text-[9px] font-medium text-slate-400">{n.time}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">{n.message}</p>
          </div>
        ))
      )}
    </div>
    <div className="px-6 pt-4 border-t border-slate-50">
      <button className="w-full py-3 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-primary hover:text-white transition-all">
        View All Alerts
      </button>
    </div>
  </motion.div>
);

const Sidebar = ({ role, activeTab, setActiveTab, onLogout, profile, isOpen, onClose, setViewDashboard }: any) => {
  const menuItems: any = {
    patient: [
      { id: 'booking_directory', label: 'Browse Specialists', icon: Stethoscope },
      { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'appointments', label: 'My Appointments', icon: Calendar },
      { id: 'messages', label: 'Consultation Chat', icon: MessageSquare },
      { id: 'health', label: 'Health Profile', icon: Activity },
      { id: 'reports', label: 'Medical Reports', icon: FileTextIcon },
      { id: 'billing', label: 'Payments', icon: CreditCard },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
    doctor: [
      { id: 'booking_directory', label: 'Return to Main Site', icon: Stethoscope },
      { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
      { id: 'appointments', label: 'Appointments', icon: ClipboardList },
      { id: 'messages', label: 'Patient Chat', icon: MessageSquare },
      { id: 'schedule', label: 'My Schedule', icon: Calendar },
      { id: 'patients', label: 'Patients', icon: Users },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
    admin: [
      { id: 'booking_directory', label: 'Return to Main Site', icon: Stethoscope },
      { id: 'stats', label: 'Analytics', icon: LayoutDashboard },
      { id: 'doctors', label: 'Manage Doctors', icon: Stethoscope },
      { id: 'users', label: 'User Management', icon: Users },
      { id: 'appointments', label: 'Bookings & Finance', icon: ClipboardList },
      { id: 'cms', label: 'Content (CMS)', icon: FileTextIcon },
      { id: 'notifications', label: 'Automations', icon: BellRing },
      { id: 'settings', label: 'Settings', icon: Settings },
    ]
  };

  if (!menuItems[role]) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`w-[280px] sm:w-80 bg-[#0F1426] text-slate-100 flex flex-col p-6 sm:p-8 fixed left-0 top-0 h-screen z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:static lg:h-auto lg:translate-x-0 lg:border-r lg:border-[#1E294B] shrink-0`}>
        <div className="flex items-center justify-between mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Activity size={22} className="animate-pulse" />
            </div>
            <span className="font-display font-black text-lg tracking-tighter text-white">HealSync</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
             <CloseIcon size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-1.5 overflow-y-auto">
          {menuItems[role].map((item: any) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'booking_directory') {
                  setViewDashboard(false);
                } else {
                  setActiveTab(item.id);
                }
                onClose();
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-650 text-white shadow-xl shadow-blue-650/15 font-black' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 font-bold'
              }`}
            >
              <item.icon size={18} className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110 text-white' : 'text-slate-500 group-hover:text-slate-200'}`} />
              <span className="text-xs uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="pt-6 sm:pt-8 border-t border-[#1E294B]/80 mt-auto space-y-4">
          <div className="flex items-center gap-3.5 px-2 bg-white/5 rounded-2xl p-3 border border-white/5 shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden border-2 border-white/10 shrink-0">
               <img src={profile?.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate leading-none mb-1">{profile?.name}</p>
              <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest truncate leading-none">{profile?.role}</p>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold text-xs uppercase tracking-wider group"
          >
            <LogOut size={16} className="text-rose-400 group-hover:translate-x-0.5 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

const Header = ({ title, notifications, profile, onMenuToggle }: any) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-20 lg:h-24 bg-white/60 backdrop-blur-md sticky top-0 z-30 px-6 lg:px-12 flex items-center justify-between border-b border-slate-100 relative">
      <div className="flex items-center gap-6 min-w-0 flex-1 mr-4">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 shadow-sm shrink-0"
        >
          <Menu size={20} />
        </button>
        
        {/* Search Bar matching mockup 1 & 2 */}
        <div className="hidden md:flex items-center gap-3 bg-slate-100 hover:bg-slate-200/50 border border-slate-100/50 rounded-full px-5 py-2.5 w-full max-w-sm transition-all group">
          <Search size={15} className="text-slate-400 group-focus-within:text-blue-600 transition-colors shrink-0" />
          <input 
            type="text" 
            placeholder="Search appointments, health records, insights..." 
            className="bg-transparent border-none text-xs text-slate-800 outline-none w-full font-bold placeholder:text-slate-400"
          />
        </div>

        <div className="min-w-0 md:hidden">
          <h2 className="text-base font-display font-black text-slate-900 truncate">{title}</h2>
        </div>
      </div>
      
      <div className="flex items-center gap-6 relative shrink-0">
        {/* Dynamic Section Indicator for Desktop */}
         <div className="hidden lg:flex items-center gap-2 bg-blue-50/50 border border-blue-100/50 rounded-xl px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider font-mono">{title}</span>
         </div>

        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className={`w-11 h-11 rounded-full border flex items-center justify-center relative transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
            showNotifications ? 'bg-indigo-650 border-[#1E294B] text-white shadow-lg shadow-indigo-600/25' : 'bg-white border-slate-200/60 text-slate-500 hover:text-indigo-650 hover:border-indigo-100 shadow-[0_4px_10px_rgba(0,0,0,0.01)]'
          }`}
        >
          <Bell size={18} />
          {notifications.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          )}
        </button>

        <AnimatePresence>
          {showNotifications && (
            <NotificationDropdown 
              notifications={notifications} 
              onClose={() => setShowNotifications(false)} 
            />
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3.5 pl-6 border-l border-slate-200/60">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900 leading-none mb-1">{profile?.name}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{profile?.role}</p>
          </div>
          <div className="w-11 h-11 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform duration-300 shrink-0">
             <img src={profile?.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default function App() {
  const [profile, setProfile] = useState<any>(null);
  const [viewDashboard, setViewDashboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const { notifications, sendNotification } = useNotifications(profile);
  const [activeTab, setActiveTab] = useState('home');
  const [isViewingDoctors, setIsViewingDoctors] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(window.location.pathname === '/admin');
  const [impersonatedProfile, setImpersonatedProfile] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [doctorsList, setDoctorsList] = useState<any[]>(doctors);
  
  useEffect(() => {
    seedCMS();

    // Dynamically query full database of doctors (including newly onboarded ones)
    fetch('/api/doctors')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setDoctorsList(data);
        }
      })
      .catch((err) => console.log('Error pulling full doctors directory:', err));

    const handlePopState = () => {
      setIsAdminMode(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setIsAdminMode(path === '/admin');
    if (path === '/') {
        setIsViewingDoctors(false);
        setSelectedDoctorId(null);
        setImpersonatedProfile(null);
    }
  };

  const login = (role: string, email: string, name?: string) => {
    const defaultAvatars: any = {
      admin: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop',
      doctor: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
      patient: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    };

    const newProfile = {
      name: name || email.split('@')[0],
      email: email,
      role: role,
      avatar: defaultAvatars[role] || defaultAvatars.patient
    };

    setProfile(newProfile);
    setShowAuth(false);
    setImpersonatedProfile(null);
    toast.success(`Welcome back, ${newProfile.name}!`);
  };

  const impersonate = (role: string, email: string, name?: string) => {
    const defaultAvatars: any = {
      doctor: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
      patient: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    };

    setImpersonatedProfile({
      name: name || email.split('@')[0],
      email: email,
      role: role.toLowerCase(),
      avatar: defaultAvatars[role.toLowerCase()] || defaultAvatars.patient,
      isImpersonating: true
    });
    
    setViewDashboard(true);
    toast.info(`Viewing system as ${name || email}`);
  };

  const logout = () => {
    setProfile(null);
    setImpersonatedProfile(null);
    setActiveTab('home');
    setViewDashboard(false);
    toast.info('Logged out successfully');
  };

  useEffect(() => {
    if (profile) {
      if (profile.role === 'admin') setActiveTab('stats');
      else if (profile.role === 'doctor') setActiveTab('dashboard');
      else setActiveTab('home');
    }
  }, [profile]);

  const handleBook = (docId: string, slot: string, date: string, paymentId?: string) => {
    if (!profile) {
      setShowAuth(true);
      return;
    }
    
    // Create appointment and notify
    const doctor = doctorsList.find(d => d.id === docId) || doctors.find(d => d.id === docId);
    
    if (paymentId) {
      sendNotification(profile.email, 'Appointment Confirmed', `Your appointment with ${doctor?.name || 'Doctor'} on ${date} at ${slot} has been confirmed. Payment ID: ${paymentId}`, 'appointment');
      toast.success('Appointment Booked!', {
        description: `Confirmed with ${doctor?.name} for ${date} at ${slot}`
      });
      
      // Persist to local storage for the dashboard
      const APPOINTMENTS_KEY = 'medsync_appointments';
      const existing = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
      const newApt = {
        id: Math.random().toString(36).substr(2, 9),
        doc: doctor?.name || 'Doctor',
        spec: doctor?.specialty || 'General',
        date,
        time: slot,
        status: 'Approved',
        price: doctor?.price || '$100.00',
        paymentId,
        userId: profile.email,
        doctorEmail: doctor?.email || ''
      };
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify([newApt, ...existing]));

      // POST to persistent backend database
      fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newApt)
      })
      .then(res => res.json())
      .then(resData => {
        console.log('Appointment backend write completed:', resData);
        // Sync to Firestore real-time DB
        createAppointmentRealtime(newApt);
      })
      .catch(err => {
        console.error('Appointment backend sync error:', err);
        // Fallback sync directly to Firestore real-time DB
        createAppointmentRealtime(newApt);
      });
      
      setSelectedDoctorId(null);
      setActiveTab('appointments');
      setViewDashboard(true);
    } else {
      // If payment didn't go through but we somehow reached here
      toast.error('Payment Required', { description: 'Please complete the payment to book the appointment.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
           <Activity size={48} className="animate-pulse text-primary mx-auto" />
           <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Loading Medical OS...</p>
        </div>
      </div>
    );
  }

  const activeProfile = impersonatedProfile || profile;
  const isDashboardRole = activeProfile?.role === 'patient' || activeProfile?.role === 'doctor' || activeProfile?.role === 'admin';

  if (!activeProfile || (isDashboardRole && !viewDashboard && !isAdminMode)) {
    return (
      <div className="relative">
        <AnimatePresence mode="wait">
          {isAdminMode ? (
            <motion.div
              key="admin-auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminAuth 
                onSuccess={login} 
                onBack={() => navigateTo('/')} 
              />
            </motion.div>
          ) : showAuth ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Auth onSuccess={login} onBack={() => setShowAuth(false)} />
            </motion.div>
          ) : selectedDoctorId ? (
            <motion.div
              key="doctor-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white"
            >
              <DoctorDetails 
                docId={selectedDoctorId} 
                onBack={() => setSelectedDoctorId(null)}
                onBook={handleBook}
                profile={activeProfile}
                onRequireAuth={() => setShowAuth(true)}
              />
            </motion.div>
          ) : !isViewingDoctors ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage 
                onLogin={() => setShowAuth(true)} 
                onFindDoctors={() => setIsViewingDoctors(true)} 
                profile={activeProfile}
                onEnterDashboard={() => setViewDashboard(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="doctors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DoctorsListing 
                onBack={() => setIsViewingDoctors(false)} 
                onBook={(id) => setSelectedDoctorId(id)}
                onViewProfile={(id) => setSelectedDoctorId(id)}
                profile={activeProfile}
                onEnterDashboard={() => setViewDashboard(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const renderContent = () => {
    const activeProfile = impersonatedProfile || profile;
    if (!activeProfile) return null;

    switch (activeProfile.role) {
      case 'patient': return <PatientDashboard activeTab={activeTab} profile={activeProfile} onTabChange={setActiveTab} />;
      case 'doctor': return <DoctorDashboard activeTab={activeTab} profile={activeProfile} onTabChange={setActiveTab} />;
      case 'admin': return <AdminDashboard activeTab={activeTab} onAction={sendNotification as any} profile={activeProfile} onImpersonate={impersonate} />;
      default: return null;
    }
  };

  const getTitle = () => {
    const activeProfile = impersonatedProfile || profile;
    if (!activeProfile) return "";
    
    if (activeProfile.role === 'patient') return "Patient Dashboard";
    if (activeProfile.role === 'doctor') return "Clinical Suite";
    if (activeProfile.role === 'admin') return "Central Administration";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-indigo-50/80 to-blue-200/60 p-0 sm:p-6 lg:p-8 flex flex-col justify-center font-sans antialiased text-slate-800">
      <Toaster position="top-right" expand={true} richColors />
      
      {impersonatedProfile && (
        <div className="fixed top-0 left-0 right-0 h-10 bg-slate-900 text-white z-[100] flex items-center justify-between px-6 lg:px-12 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
           <div className="flex items-center gap-4 truncate">
              <ShieldAlert size={12} className="text-primary shrink-0" />
              <span className="truncate">Administrative View Mode: Impersonating {impersonatedProfile.name}</span>
           </div>
           <button 
             onClick={() => {
                setImpersonatedProfile(null);
                setActiveTab('stats');
                toast.success('Restored Administrative Control');
             }}
             className="bg-primary px-3 py-1 lg:px-4 lg:py-1.5 rounded-full hover:bg-primary-dark transition-all shrink-0"
           >
              Exit
           </button>
        </div>
      )}

      <div className={`w-full max-w-[1520px] mx-auto bg-white rounded-[2rem] lg:rounded-[3.5rem] shadow-[0_50px_100px_rgba(9,15,30,0.08)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[90vh] relative ${impersonatedProfile ? 'mt-10' : ''}`}>
        <Sidebar 
          role={(impersonatedProfile || profile).role} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={logout} 
          profile={impersonatedProfile || profile}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          setViewDashboard={setViewDashboard}
        />
        
        <main className="flex-1 min-h-[90vh] flex flex-col bg-slate-50/70 relative z-10">
          <Header 
            title={getTitle()} 
            notifications={notifications}
            profile={impersonatedProfile || profile}
            onMenuToggle={() => setIsSidebarOpen(true)}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={(impersonatedProfile || profile).role + activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-4 sm:p-8 lg:p-12 flex-1"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

