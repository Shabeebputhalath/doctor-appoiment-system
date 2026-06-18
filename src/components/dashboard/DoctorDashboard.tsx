import React from 'react';
import { FileUploader } from '../common/FileUploader';
import { 
  Users, 
  Activity, 
  Star, 
  User, 
  ChevronRight, 
  Clock, 
  Calendar,
  Zap,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
  ArrowUpRight,
  FileText,
  UserPlus,
  Settings as SettingsIcon,
  Search,
  Check,
  X,
  ClipboardList,
  Pill,
  Trash2,
  MoreVertical,
  Mail
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

import { toast } from 'sonner';
import { getSocket } from '../../services/socketService';
import { ChatWindow } from '../common/ChatWindow';
import { syncAppointmentsRealtime, updateAppointmentRealtime, createMedicationRealtime } from '../../services/firebase';

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, subtitle }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-primary/20 transition-all duration-500">
    <div className="flex items-start justify-between mb-6">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform duration-500`}>
        <Icon size={28} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trendValue}
        </div>
      )}
    </div>
    <div className="space-y-1">
      <h3 className="text-4xl font-display font-black text-slate-900 tracking-tight">{value}</h3>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{title}</p>
      {subtitle && <p className="text-[10px] font-bold text-slate-300 mt-2">{subtitle}</p>}
    </div>
  </div>
);

const AppointmentRow = ({ time, name, type, status }: any) => (
  <div className="group flex items-center justify-between p-6 rounded-3xl bg-white border border-slate-50 hover:border-primary/20 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center justify-center w-20 h-20 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{time.split(' ')[1]}</span>
        <span className="text-lg font-black text-slate-900">{time.split(' ')[0]}</span>
      </div>
      <div>
        <h4 className="text-lg font-display font-black text-slate-900 leading-tight mb-1 group-hover:text-primary transition-colors">{name}</h4>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{type}</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
          <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'Completed' ? 'text-green-500' : 'text-primary'}`}>{status}</span>
        </div>
      </div>
    </div>
    <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all group-hover:border-primary/20 border border-transparent">
      <ChevronRight size={20} />
    </button>
  </div>
);

const RevenueChart = () => {
  const data = [
    { day: 'Mon', revenue: 4000 },
    { day: 'Tue', revenue: 3000 },
    { day: 'Wed', revenue: 2000 },
    { day: 'Thu', revenue: 2780 },
    { day: 'Fri', revenue: 1890 },
    { day: 'Sat', revenue: 2390 },
    { day: 'Sun', revenue: 3490 },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} 
            dy={10}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'black', color: '#0f172a' }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const DashboardHome = () => (
  <div className="space-y-12 animate-in fade-in slide-in-from-y-3 duration-500">
    {/* Welcome Header */}
    <div className="relative bg-gradient-to-r from-[#1E294B] via-[#2A3E74] to-[#3B5998] overflow-hidden p-10 lg:p-14 rounded-[3.5rem] text-white shadow-2xl shadow-indigo-950/20 border border-white/5">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[130px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-5">
             <span className="px-4 py-1.5 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-300 font-mono border border-white/5">Clinician Dashboard</span>
             <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-black mb-5 tracking-tight leading-[1.1]">
            Good Day, <br /><span className="bg-gradient-to-r from-blue-300 to-indigo-200 bg-clip-text text-transparent">Dr. Rajesh Nicholls</span>
          </h2>
          <p className="text-slate-300/90 text-sm font-semibold leading-relaxed max-w-md mb-8">
            Your clinic diagnostics pipeline is operational. Track physical appointments, telemedicine sessions, and clinical invoices below.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
             <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.03] transition-all shadow-lg shadow-indigo-650/30 flex items-center gap-2">
                <Plus size={16} /> Schedule Slot
             </button>
             <button className="bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all backdrop-blur-md border border-white/5">
                View Diagnostics
             </button>
          </div>
        </div>
        
        {/* Statistics Capsule on Right */}
        <div className="lg:w-80 bg-white/5 backdrop-blur-xl border border-[#1E294B] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
           <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest font-mono">Today's Visits</p>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-300 border border-white/10">
                 <Clock size={18} />
              </div>
           </div>
           <div className="flex flex-col gap-1 mb-6">
              <h4 className="text-5xl font-display font-black tracking-tight text-white">12</h4>
              <p className="text-[10px] font-bold text-slate-400">1 completed • 11 pending</p>
           </div>
           <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[12%] h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
           </div>
        </div>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard 
        title="Total Patients" 
        value="1,284" 
        icon={Users} 
        color="bg-blue-600" 
        trend="up" 
        trendValue="+12%" 
        subtitle="12 new today"
      />
      <StatCard 
        title="Revenue" 
        value="$14,240" 
        icon={DollarSign} 
        color="bg-green-600" 
        trend="up" 
        trendValue="+8.4%" 
        subtitle="Outstanding: $1,250"
      />
      <StatCard 
        title="Total Visits" 
        value="48" 
        icon={Calendar} 
        color="bg-orange-500" 
        trend="down" 
        trendValue="-2.4%" 
        subtitle="Across 3 departments"
      />
      <StatCard 
        title="Satisfaction" 
        value="4.9" 
        icon={Star} 
        color="bg-primary" 
        subtitle="Based on 450 reviews"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Today's Schedule */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight">Today's Schedule</h3>
            <p className="text-sm font-semibold text-slate-400 mt-1">12 appointments scheduled for today</p>
          </div>
          <button className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2 hover:underline underline-offset-4">
             View Calendar <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="space-y-4">
          <AppointmentRow 
            time="09:30 AM" 
            name="Glam Haven" 
            type="CONSULTATION" 
            status="Completed" 
          />
          <AppointmentRow 
            time="10:45 AM" 
            name="Robert Miller" 
            type="VACCINATION" 
            status="In Progress" 
          />
          <AppointmentRow 
            time="11:30 AM" 
            name="Alice Wright" 
            type="CHECKUP" 
            status="Waiting" 
          />
          <AppointmentRow 
            time="02:00 PM" 
            name="Thomas Shelby" 
            type="SURGERY FOLLOW-UP" 
            status="Upcoming" 
          />
        </div>

        {/* Revenue Widget */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm mt-12">
           <div className="flex items-center justify-between mb-10">
              <h4 className="text-xl font-display font-black text-slate-900 tracking-tight">Revenue Trends</h4>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl">Weekly</button>
                 <button className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20">Monthly</button>
              </div>
           </div>
           <RevenueChart />
        </div>
      </div>

      {/* Quick Actions & Sidebar Widgets */}
      <div className="space-y-12">
        <div className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm">
           <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                 <Zap size={24} />
              </div>
              <div>
                <h4 className="text-xl font-display font-black text-slate-900 tracking-tight">Quick Actions</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Common tasks</p>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-[2rem] hover:bg-primary group transition-all">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-all">
                    <Calendar size={24} />
                 </div>
                 <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest group-hover:text-white">New Apt</span>
              </button>
              <button className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-[2rem] hover:bg-blue-600 group transition-all text-center">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-all">
                    <UserPlus size={24} />
                 </div>
                 <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest group-hover:text-white">Add Patient</span>
              </button>
              <button className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-[2rem] hover:bg-slate-900 group transition-all">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:scale-110 transition-all">
                    <FileText size={24} />
                 </div>
                 <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest group-hover:text-white">Reports</span>
              </button>
              <button className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-[2rem] hover:bg-slate-400 group transition-all">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover:scale-110 transition-all">
                    <SettingsIcon size={24} />
                 </div>
                 <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest group-hover:text-white">Settings</span>
              </button>
           </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[4rem] text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
           <div className="relative z-10">
              <h4 className="text-xl font-display font-black mb-4 tracking-tight">Lab Alerts</h4>
              <p className="text-xs font-semibold text-slate-400 mb-8">2 critical reviews pending</p>
              <div className="space-y-4">
                 <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                       <span className="text-xs font-bold text-slate-300">Patient #2944</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                 </div>
                 <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                       <span className="text-xs font-bold text-slate-300">Blood Sample #84</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const AppointmentsView = ({ appointments, setAppointments, profile }: { appointments: any[], setAppointments: any, profile: any }) => {
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [editingAppointment, setEditingAppointment] = React.useState<string | null>(null);
  const [clinicalNotes, setClinicalNotes] = React.useState('');
  const [prescriptionUrl, setPrescriptionUrl] = React.useState('');

  const handleStartEdit = (apt: any) => {
    setEditingAppointment(apt.id);
    setClinicalNotes(apt.notes || '');
    setPrescriptionUrl(apt.prescriptionUrl || '');
  };

  const handleUploadPrescription = (url: string) => {
    setPrescriptionUrl(url);
    toast.success("Prescription Uploaded & Linked", {
      description: "Digital prescription is now linked. Click 'Save Medical Record' to finalize."
    });
  };

  const handleSaveMedicalRecord = async (apt: any) => {
    try {
      if (!clinicalNotes && !prescriptionUrl) {
        toast.error("Please provide either clinical notes or attach a prescription.");
        return;
      }

      // Save to Firestore real-time database
      await updateAppointmentRealtime(apt.id, {
        notes: clinicalNotes,
        prescriptionUrl: prescriptionUrl,
        status: 'Completed'
      });

      // Also create a medical prescription record in real-time collections for patient dashboard
      if (prescriptionUrl) {
        await createMedicationRealtime({
          patientEmail: apt.userId,
          name: `Prescription for ${apt.spec || 'Consultation'}`,
          dosage: 'As instructed by doctor',
          refills: 3,
          doctor: profile?.name || apt.doc,
          status: 'Active',
          prescriptionUrl: prescriptionUrl,
          createdAt: Date.now()
        });
      }

      // Local storage sync
      const APPOINTMENTS_KEY = 'medsync_appointments';
      const stored = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
      const updated = stored.map((a: any) => 
        a.id === apt.id ? { ...a, notes: clinicalNotes, prescriptionUrl: prescriptionUrl, status: 'Completed' } : a
      );
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));

      // Emit socket notification
      const socket = getSocket();
      socket.emit('appointment:status_change', {
        to: apt.userId,
        appointmentId: apt.id,
        status: 'Completed',
        message: `Your medical record with ${profile.name} is saved. Notes and digital prescription are ready on your dashboard.`
      });

      toast.success("Medical Record Saved Successfully!");
      setEditingAppointment(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save medical records.");
    }
  };

  const handleStatusChange = (aptId: string, newStatus: string) => {
    const APPOINTMENTS_KEY = 'medsync_appointments';
    const stored = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
    const updated = stored.map((a: any) => 
      a.id === aptId ? { ...a, status: newStatus } : a
    );
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    setAppointments(updated.filter((a: any) => a.doc === profile.name || a.doc === `Dr. ${profile.name}`));
    
    // UPDATE backend database persistently
    fetch(`/api/appointments/${aptId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus })
    }).catch(err => console.error('Appointment backend status put failed:', err));

    // UPDATE Firestore real-time
    updateAppointmentRealtime(aptId, { status: newStatus })
      .catch(err => console.error('Firestore appointment status update failed:', err));

    // Emit real-time notification
    const apt = updated.find((a: any) => a.id === aptId);
    if (apt && apt.userId) {
       const socket = getSocket();
       socket.emit('appointment:status_change', {
          to: apt.userId,
          appointmentId: aptId,
          status: newStatus,
          message: `Your appointment with ${profile.name} has been marked as ${newStatus}.`
       });
    }

    toast.success(`Appointment ${newStatus}`);
  };

  const filteredAppointments = activeFilter === 'All' 
    ? appointments 
    : appointments.filter(a => a.status === activeFilter);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">Appointment Management</h2>
          <p className="text-sm font-semibold text-slate-400 mt-1">Review and manage your clinical schedule and patient visits.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          {['All', 'Pending', 'Confirmed', 'Completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeFilter === filter 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredAppointments.map((apt) => (
          <div key={apt.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-primary/20 transition-all duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-xl font-black text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                  {apt.avatar}
                </div>
                <div>
                  <h4 className="text-xl font-display font-black text-slate-900 mb-1 leading-tight group-hover:text-primary transition-colors">{apt.patient}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{apt.type}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{apt.time} • {apt.date}</span>
                  </div>
                  <div className="mt-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      apt.status === 'Completed' ? 'bg-green-50 text-green-600' :
                      apt.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {apt.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                      className="flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg shadow-primary/20"
                    >
                      <Check size={14} /> Accept
                    </button>
                    <button 
                       onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                       className="flex items-center gap-2 bg-red-50 text-red-500 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-100 transition-all shadow-sm"
                    >
                      <X size={14} /> Reject
                    </button>
                  </>
                )}
                {apt.status === 'Confirmed' && (
                  <>
                    <button 
                      onClick={() => handleStatusChange(apt.id, 'Completed')}
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg shadow-green-600/20"
                    >
                      <Check size={14} /> Mark Completed
                    </button>
                    <button 
                      onClick={() => {
                        if (editingAppointment === apt.id) {
                          setEditingAppointment(null);
                        } else {
                          handleStartEdit(apt);
                        }
                      }}
                      className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                        editingAppointment === apt.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <ClipboardList size={14} /> {editingAppointment === apt.id ? 'Close Edit' : 'Add Notes'}
                    </button>
                    <button 
                      onClick={() => handleStartEdit(apt)}
                      className="flex items-center gap-2 bg-slate-50 text-slate-600 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all"
                    >
                      <Pill size={14} /> Prescription
                    </button>
                  </>
                )}
                {apt.status === 'Completed' && (
                   <button className="flex items-center gap-2 bg-slate-50 text-slate-400 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] cursor-not-allowed">
                      <FileText size={14} /> View Summary
                   </button>
                )}
                <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {editingAppointment === apt.id && (
              <div className="mt-10 pt-10 border-t border-slate-50 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Clinical Notes</label>
                    <textarea 
                      placeholder="Enter examination details, symptoms, and findings..."
                      value={clinicalNotes}
                      onChange={(e) => setClinicalNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px] transition-all"
                    ></textarea>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Digital Prescription (Upload)</label>
                    <FileUploader 
                      label="Upload Signed Prescription" 
                      onUploadSuccess={handleUploadPrescription} 
                      accept="application/pdf,image/*"
                    />
                    {prescriptionUrl && (
                      <div className="flex items-center gap-2 mt-2 p-3 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-2xl text-xs font-bold animate-in fade-in">
                        <Pill size={14} /> Checked Prescription: Linked Successfully
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                   <button 
                     onClick={() => handleSaveMedicalRecord(apt)}
                     className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-slate-900/20"
                   >
                      Save Medical Record
                   </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AvailabilityView = () => {
  const [selectedDate, setSelectedDate] = React.useState('May 18, 2026');
  const [isVacationMode, setIsVacationMode] = React.useState(false);
  
  const slots = [
    { id: '1', time: '09:00 AM - 09:30 AM', status: 'Available' },
    { id: '2', time: '09:30 AM - 10:00 AM', status: 'Booked' },
    { id: '3', time: '10:00 AM - 10:30 AM', status: 'Available' },
    { id: '4', time: '10:30 AM - 11:00 AM', status: 'Blocked' },
    { id: '5', time: '11:00 AM - 11:30 AM', status: 'Available' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">Schedule Management</h2>
          <p className="text-sm font-semibold text-slate-400 mt-1">Configure your availability, block dates, and manage vacation periods.</p>
        </div>
        <div className="flex items-center gap-6">
           <div className={`p-1.5 rounded-2xl flex items-center gap-3 px-6 py-4 transition-all ${isVacationMode ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <span className="text-[10px] font-black uppercase tracking-widest">{isVacationMode ? 'Vacation Mode ON' : 'Vacation Mode OFF'}</span>
              <button 
                onClick={() => setIsVacationMode(!isVacationMode)}
                className={`w-12 h-6 rounded-full relative transition-colors ${isVacationMode ? 'bg-white/40' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isVacationMode ? 'right-1' : 'left-1'}`}></div>
              </button>
           </div>
           <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-105 transition-all">
             <Plus size={16} className="inline mr-2" /> Add Time Slots
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">Calendar Preview</h3>
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-primary rounded-full"></div> Available</span>
                  <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-slate-200 rounded-full"></div> Blocked</span>
               </div>
            </div>
            
            <div className="overflow-x-auto pb-4 scrollbar-hide">
               <div className="grid grid-cols-7 gap-4 mb-8 min-w-[500px]">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center text-[10px] font-black uppercase text-slate-300 tracking-widest">{day}</div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => {
                    const day = i + 1;
                    const isSelected = day === 18;
                    const isBlocked = [15, 16, 22].includes(day);
                    return (
                      <button 
                       key={i} 
                       onClick={() => setSelectedDate(`May ${day}, 2026`)}
                       className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                        isSelected ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110' : 
                        isBlocked ? 'bg-slate-50 text-slate-300 cursor-not-allowed line-through' :
                        'bg-slate-50 text-slate-900 hover:bg-slate-100'
                      }`}>
                        <span className="text-sm font-black">{day}</span>
                        {!isBlocked && !isSelected && <div className="w-1 h-1 bg-primary/20 rounded-full"></div>}
                      </button>
                    );
                  })}
               </div>
            </div>
          </div>

          <div className="bg-slate-900 p-12 rounded-[4rem] text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-700"></div>
             <div className="relative z-10">
                <h3 className="text-3xl font-display font-black mb-4 tracking-tight leading-tight">Quick Action: <br /><span className="text-primary italic">Bulk Block</span></h3>
                <p className="text-slate-400 font-medium leading-relaxed max-w-sm mb-10">
                   Instantly block all appointments for a specific date range or recurring pattern.
                </p>
                <div className="flex gap-4">
                   <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                      Select Range
                   </button>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">Slots for {selectedDate}</h3>
              </div>
              <div className="space-y-4">
                 {slots.map(slot => (
                   <div key={slot.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-primary/20 transition-all">
                      <div>
                         <p className="text-sm font-bold text-slate-900">{slot.time}</p>
                         <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                           slot.status === 'Available' ? 'text-green-500' :
                           slot.status === 'Booked' ? 'text-primary' : 'text-slate-400'
                         }`}>{slot.status}</p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                            <X size={16} />
                         </button>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-[10px] font-black uppercase text-slate-400 tracking-widest hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2">
                    <Plus size={16} /> New Slot
                 </button>
              </div>
           </div>

           <div className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
              <h4 className="text-lg font-display font-black text-orange-900 mb-4 tracking-tight">Upcoming Leave</h4>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-orange-100">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                       <Calendar size={20} />
                    </div>
                    <div>
                       <p className="text-xs font-black text-slate-900">May 25 - May 28</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase">Annual Leave</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const PatientsView = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('All');

  const patients = [
    { id: '1', name: 'Sarah Jenkins', age: '28', gender: 'Female', status: 'Stable', lastVisit: 'May 12, 2026', type: 'Recent', blood: 'O+', progress: 85 },
    { id: '2', name: 'Robert Miller', age: '54', gender: 'Male', status: 'Critical', lastVisit: 'May 15, 2026', type: 'Critical', blood: 'A-', progress: 32 },
    { id: '3', name: 'Alice Wright', age: '42', gender: 'Female', status: 'Under Review', lastVisit: 'May 08, 2026', type: 'Chronic', blood: 'B+', progress: 64 },
    { id: '4', name: 'Thomas Shelby', age: '35', gender: 'Male', status: 'Healthy', lastVisit: 'April 20, 2026', type: 'Recent', blood: 'AB+', progress: 95 },
    { id: '5', name: 'Elizabeth Swan', age: '24', gender: 'Female', status: 'Stable', lastVisit: 'May 17, 2026', type: 'Recent', blood: 'O-', progress: 88 },
  ];

  const filteredPatients = patients.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || p.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-md">
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight leading-tight">Patient Directory</h2>
          <p className="text-sm font-semibold text-slate-400 mt-2">Manage and monitor health records for all registered patients.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
           <div className="relative group w-full sm:w-80">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
              />
           </div>
           <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-3">
              <UserPlus size={16} /> New Patient
           </button>
        </div>
      </div>

      <div className="flex bg-slate-100/50 p-1 rounded-2xl w-fit border border-slate-100">
        {['All', 'Recent', 'Critical', 'Chronic'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeFilter === filter 
                ? 'bg-white text-primary shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="flex items-center gap-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-3xl font-black text-slate-200 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {patient.name.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-xl border-4 border-white shadow-sm flex items-center justify-center text-white ${
                    patient.status === 'Critical' ? 'bg-red-500' : 
                    patient.status === 'Healthy' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {patient.status === 'Critical' ? <ShieldAlert size={14} /> : <Check size={14} />}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-2xl font-display font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">{patient.name}</h4>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest leading-none">Demographics</p>
                      <p className="text-xs font-bold text-slate-500">{patient.age}Y • {patient.gender}</p>
                    </div>
                    <div className="w-px h-6 bg-slate-100 hidden sm:block"></div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest leading-none">Blood Type</p>
                      <p className="text-xs font-bold text-red-500">{patient.blood}</p>
                    </div>
                    <div className="w-px h-6 bg-slate-100 hidden sm:block"></div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest leading-none">Last Visit</p>
                      <p className="text-xs font-bold text-slate-900">{patient.lastVisit}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 lg:min-w-[400px]">
                <div className="flex-1 w-full flex flex-col gap-3">
                   <div className="flex justify-between items-end">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Health Progress</p>
                      <span className="text-xs font-black text-slate-900">{patient.progress}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          patient.progress > 80 ? 'bg-green-500' : 
                          patient.progress > 50 ? 'bg-primary' : 'bg-red-500'
                        }`}
                        style={{ width: `${patient.progress}%` }}
                      ></div>
                   </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Mail size={20} />
                   </button>
                   <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-slate-900/20">
                      View Records
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesView = ({ profile, appointments }: { profile: any, appointments: any[] }) => {
  const [selectedRecipient, setSelectedRecipient] = React.useState<any | null>(null);

  const patients = React.useMemo(() => {
    const pMap = new Map();
    appointments.forEach(a => {
      if (a.userId && !pMap.has(a.userId)) {
        pMap.set(a.userId, { email: a.userId, name: a.patient || a.userId.split('@')[0] });
      }
    });
    return Array.from(pMap.values());
  }, [appointments]);

  React.useEffect(() => {
    if (patients.length > 0 && !selectedRecipient) {
      setSelectedRecipient(patients[0]);
    }
  }, [patients, selectedRecipient]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">Patient Inquiries</h2>
          <p className="text-sm font-semibold text-slate-400 mt-1">Real-time collaboration with your patients.</p>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
             <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search index..."
                className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
            {patients.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRecipient(p)}
                className={`w-full p-6 text-left flex items-center gap-4 transition-all ${
                  selectedRecipient?.email === p.email ? 'bg-slate-50' : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-900 tracking-tight truncate">{p.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{p.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <ChatWindow 
          currentUser={{ email: profile.email, name: `Dr. ${profile.name}` }} 
          recipient={selectedRecipient} 
        />
      </div>
    </div>
  );
};

export const DoctorDashboard = ({ activeTab, profile, onTabChange }: { activeTab: string, profile: any, onTabChange?: (tab: string) => void }) => {
  const [appointments, setAppointments] = React.useState<any[]>([]);

  React.useEffect(() => {
    const socket = getSocket(profile.email);
    
    socket.on('notification:new', (notif: any) => {
      toast.info(notif.message, {
        description: `Time: ${new Date(notif.timestamp).toLocaleTimeString()}`,
      });
      // Refresh appointments if needed
    });

    return () => {
      socket.off('notification:new');
    };
  }, [profile.email]);

  React.useEffect(() => {
    if (!profile?.email) return;

    // Use our Firestore listener for direct real-time updates!
    const unsubscribe = syncAppointmentsRealtime({ doctorEmail: profile.email }, (liveApts) => {
      const APPOINTMENTS_KEY = 'medsync_appointments';
      const stored = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
      
      const filterAndCombine = (apts: any[]) => {
        const mergedMap = new Map();
        stored.forEach((a: any) => mergedMap.set(a.id, a));
        apts.forEach((a: any) => mergedMap.set(a.id, a));
        const combined = Array.from(mergedMap.values());
        
        return combined.filter((a: any) => 
          a.doc === profile.name || 
          a.doc === `Dr. ${profile.name}` || 
          a.doctorEmail === profile.email
        );
      };

      setAppointments(filterAndCombine(liveApts));
    });

    return () => unsubscribe();
  }, [profile.name, profile.role, profile.email]);

  const totalRevenue = React.useMemo(() => {
    return appointments
      .filter(a => a.paymentId)
      .reduce((sum, a) => sum + parseInt(a.price?.replace(/[^0-9]/g, '') || '0'), 0);
  }, [appointments]);

  return (
    <div className="p-12">
       {(activeTab === 'dashboard' || activeTab === 'home') && (
         <div className="space-y-12">
           {/* Welcome Header */}
           <div className="relative bg-slate-900 overflow-hidden p-12 lg:p-16 rounded-[4rem] text-white">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
               <div className="max-w-2xl text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                    <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">Dashboard Overview</span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                 </div>
                 <h2 className="text-5xl lg:text-7xl font-display font-black mb-6 tracking-tight leading-[1.1]">
                   Welcome back, <br /><span className="text-primary italic">{profile?.name}</span>
                 </h2>
                 <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg mb-10">
                   Your clinic performance is at a glance. Track appointments, patients, and key metrics in real-time.
                 </p>
                 <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                    <button className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/40 flex items-center gap-3">
                       <Plus size={18} /> Schedule Appointment
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md">
                       View Reports
                    </button>
                 </div>
               </div>
               <div className="lg:w-1/3 bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Today's Visits</p>
                     <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                        <Clock size={20} />
                     </div>
                  </div>
                  <div className="flex flex-col gap-1 mb-8">
                     <h4 className="text-6xl font-display font-black tracking-tight">{appointments.length}</h4>
                     <p className="text-xs font-bold text-slate-400 tracking-wide">Syncing with platform...</p>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                     <div className="w-[45%] h-full bg-primary rounded-full"></div>
                  </div>
               </div>
             </div>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <StatCard 
               title="Active Patients" 
               value={appointments.length + 8} 
               icon={Users} 
               color="bg-blue-600" 
               trend="up" 
               trendValue="+12%" 
               subtitle="Real-time count"
             />
             <StatCard 
               title="Settled Revenue" 
               value={`$${totalRevenue.toLocaleString()}`} 
               icon={DollarSign} 
               color="bg-green-600" 
               trend="up" 
               trendValue="+100%" 
               subtitle="From platform payments"
             />
             <StatCard 
               title="Total Visits" 
               value="48" 
               icon={Calendar} 
               color="bg-orange-500" 
               trend="down" 
               trendValue="-2.4%" 
               subtitle="Across 3 departments"
             />
             <StatCard 
               title="Satisfaction" 
               value="4.9" 
               icon={Star} 
               color="bg-primary" 
               subtitle="Based on 450 reviews"
             />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             <div className="lg:col-span-2 space-y-8">
               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight">Today's Schedule</h3>
                   <p className="text-sm font-semibold text-slate-400 mt-1">12 appointments scheduled for today</p>
                 </div>
                 <button className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2 hover:underline underline-offset-4">
                    View Calendar <ArrowUpRight size={14} />
                 </button>
               </div>
               <div className="space-y-4">
                 <AppointmentRow 
                   time="09:30 AM" 
                   name="John Doe" 
                   type="CONSULTATION" 
                   status="Completed" 
                 />
                 <AppointmentRow 
                   time="10:45 AM" 
                   name="Robert Miller" 
                   type="VACCINATION" 
                   status="In Progress" 
                 />
                 <AppointmentRow 
                   time="11:30 AM" 
                   name="Alice Wright" 
                   type="CHECKUP" 
                   status="Waiting" 
                 />
                 <AppointmentRow 
                   time="02:00 PM" 
                   name="Thomas Shelby" 
                   type="SURGERY FOLLOW-UP" 
                   status="Upcoming" 
                 />
               </div>

               <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm mt-12">
                  <div className="flex items-center justify-between mb-10">
                     <h4 className="text-xl font-display font-black text-slate-900 tracking-tight">Revenue Trends</h4>
                     <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl">Weekly</button>
                        <button className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20">Monthly</button>
                     </div>
                  </div>
                  <RevenueChart />
               </div>
             </div>

             <div className="space-y-12">
               <div className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                        <Zap size={24} />
                     </div>
                     <div>
                       <h4 className="text-xl font-display font-black text-slate-900 tracking-tight">Quick Actions</h4>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Common tasks</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <button className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-[2rem] hover:bg-primary group transition-all">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-all">
                           <Calendar size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest group-hover:text-white">New Apt</span>
                     </button>
                     <button className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-[2rem] hover:bg-blue-600 group transition-all text-center">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-all">
                           <UserPlus size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest group-hover:text-white">Add Patient</span>
                     </button>
                     <button className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-[2rem] hover:bg-slate-900 group transition-all">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:scale-110 transition-all">
                           <FileText size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest group-hover:text-white">Reports</span>
                     </button>
                     <button className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-[2rem] hover:bg-slate-400 group transition-all">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover:scale-110 transition-all">
                           <SettingsIcon size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest group-hover:text-white">Settings</span>
                     </button>
                  </div>
               </div>

               <div className="bg-slate-900 p-10 rounded-[4rem] text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10">
                     <h4 className="text-xl font-display font-black mb-4 tracking-tight">Lab Alerts</h4>
                     <p className="text-xs font-semibold text-slate-400 mb-8">2 critical reviews pending</p>
                     <div className="space-y-4">
                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-xs font-bold text-slate-300">Patient #2944</span>
                           </div>
                           <ChevronRight size={14} className="text-slate-500" />
                        </div>
                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                              <span className="text-xs font-bold text-slate-300">Blood Sample #84</span>
                           </div>
                           <ChevronRight size={14} className="text-slate-500" />
                        </div>
                     </div>
                  </div>
               </div>
             </div>
           </div>
         </div>
       )}
       {(activeTab === 'appointments') && <AppointmentsView appointments={appointments} setAppointments={setAppointments} profile={profile} />}
       {(activeTab === 'messages') && <MessagesView profile={profile} appointments={appointments} />}
       {(activeTab === 'schedule') && <AvailabilityView />}
       {(activeTab === 'patients') && <PatientsView />}
       {(activeTab === 'settings') && (
         <div className="bg-white p-20 rounded-[4rem] text-center border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
               <Calendar size={40} />
            </div>
            <h3 className="text-3xl font-display font-black text-slate-900 mb-4 uppercase tracking-tighter italic">Clinical Module</h3>
            <p className="text-slate-400 font-medium max-w-sm mx-auto">This specialized module is being optimized for clinical workflows. Check back shortly.</p>
         </div>
       )}
    </div>
  );
};
