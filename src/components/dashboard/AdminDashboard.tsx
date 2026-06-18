import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  ShieldAlert, 
  User, 
  ChevronRight, 
  PieChart as PieChartIcon, 
  Server,
  Download,
  Search,
  Filter,
  Stethoscope,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  MoreVertical,
  Mail,
  ShieldQuestion,
  Star,
  Ban,
  Clock,
  Eye,
  RotateCcw,
  ReceiptText,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Trophy,
  Layout,
  FileText,
  Zap,
  BellRing,
  Send,
  BellPlus,
  Volume2,
  Settings,
  Globe,
  Palette,
  Database,
  Smartphone,
  Cloud
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
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { subscribeToCMS, updateCMS } from '../../services/cmsService';
import { toast } from 'sonner';

const revenueData = [
  { name: 'Mon', revenue: 45000, expenses: 32000 },
  { name: 'Tue', revenue: 52000, expenses: 35000 },
  { name: 'Wed', revenue: 48000, expenses: 33000 },
  { name: 'Thu', revenue: 61000, expenses: 40000 },
  { name: 'Fri', revenue: 58000, expenses: 38000 },
  { name: 'Sat', revenue: 42000, expenses: 30000 },
  { name: 'Sun', revenue: 55000, expenses: 36000 },
];

const demographicData = [
  { name: '18-24', male: 120, female: 140 },
  { name: '25-34', male: 250, female: 280 },
  { name: '35-44', male: 310, female: 350 },
  { name: '45-54', male: 280, female: 310 },
  { name: '55-64', male: 180, female: 220 },
  { name: '65+', male: 140, female: 190 },
];

const healthSummaryData = [
  { name: 'Healthy', value: 68, color: '#10b981' },
  { name: 'Under Review', value: 22, color: '#3b82f6' },
  { name: 'Critical', value: 10, color: '#f43f5e' },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all duration-500">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{title}</p>
        {trend && (
           <span className="flex items-center text-[9px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={10} className="mr-1" /> {trend}
           </span>
        )}
      </div>
      <h3 className="text-4xl font-display font-black text-slate-900 tracking-tight">{value}</h3>
    </div>
    <div className={`w-16 h-16 ${color} rounded-[2rem] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-all duration-500`}>
      <Icon size={32} />
    </div>
  </div>
);

const UserRow = ({ id, name, role, status }: any) => (
  <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:border-primary/20 hover:bg-white transition-all duration-300">
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
         <User size={24} />
      </div>
      <div>
        <p className="text-base font-black text-slate-900 leading-tight">{name}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {id} • {role}</p>
      </div>
    </div>
    <div className="flex items-center gap-8">
       <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
         status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
       }`}>{status}</span>
       <button className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline px-4">Manage</button>
    </div>
  </div>
);

const DashboardHome = () => (
  <div className="space-y-12 animate-in fade-in slide-in-from-y-3 duration-500">
    {/* Admin Welcome Header */}
    <div className="relative bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#374151] overflow-hidden p-8 md:p-12 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/10 border border-white/5">
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-500/10 blur-[130px] rounded-full -translate-y-1/2 translate-x-1/3 text-slate-100"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center md:text-left space-y-3">
          <div className="flex items-center justify-center md:justify-start gap-4">
             <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-300 font-mono border border-white/5">Central Headquarters</span>
             <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-none text-white">
            System Core Operational
          </h2>
          <p className="text-slate-300 text-xs md:text-sm font-semibold max-w-lg">
            All nodes are online. Use the central desk control controls to run clinic impersonations, stage database modifications, edit CMS listings, and broadcast automated SMS notifications.
          </p>
        </div>
        
        {/* Diagnostic capsule on right */}
        <div className="shrink-0 flex items-center justify-center p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-inner min-w-[190px]">
           <div className="flex flex-col items-center text-center gap-1.5 google-sans">
             <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-teal-400 shadow-lg border border-teal-500/20">
               <Server size={22} className="text-teal-400 animate-pulse" />
             </div>
             <span className="text-[9px] font-black uppercase text-white/90 tracking-widest block mt-2">API Cluster 101</span>
             <span className="text-[8px] font-bold text-teal-300 uppercase block tracking-wider">● 100% HEALTHY</span>
           </div>
        </div>
      </div>
    </div>

    {/* Admin Widgets */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard title="Total Platform Users" value="2,847" icon={Users} color="bg-blue-500" trend="+12.5%" />
      <StatCard title="Active Doctors" value="48" icon={Stethoscope} color="bg-teal-500" trend="+3" />
      <StatCard title="Today's Appointments" value="126" icon={Calendar} color="bg-amber-500" trend="-8.2%" />
      <StatCard title="Monthly Revenue" value="$284,560" icon={DollarSign} color="bg-green-500" trend="+18.4%" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-12">
        {/* Revenue Graph */}
        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden group">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight leading-tight">Revenue Overview</h3>
              <p className="text-sm font-semibold text-slate-400 mt-1">Monthly comparison of revenue vs expenses.</p>
            </div>
            <div className="flex bg-slate-50 p-2 rounded-2xl items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Revenue</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expenses</span>
               </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Patient Demographics */}
        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight leading-tight">Patient Demographics</h3>
              <p className="text-sm font-semibold text-slate-400 mt-1">Age distribution across platform users.</p>
            </div>
            <div className="flex gap-4">
               <button className="flex items-center gap-2 text-[10px] font-black uppercase text-primary border-b-2 border-primary pb-1">Age Group</button>
               <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">Gender</button>
            </div>
          </div>
          <div className="h-[350px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                   <XAxis 
                     dataKey="name" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                     dy={10}
                   />
                   <YAxis 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                   />
                   <Tooltip 
                     cursor={{ fill: '#f8fafc', radius: 10 }}
                     contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)' }}
                   />
                   <Bar dataKey="male" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={24} />
                   <Bar dataKey="female" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Pie Chart: Health Summary */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-center">
           <h4 className="text-xl font-display font-black text-slate-900 mb-8 tracking-tight italic">Health Summary</h4>
           <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={healthSummaryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={10}
                      dataKey="value"
                    >
                      {healthSummaryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <p className="text-4xl font-display font-black text-slate-900">68%</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Healthy</p>
              </div>
           </div>
           <div className="mt-8 grid grid-cols-3 gap-4">
              {healthSummaryData.map((entry, index) => (
                <div key={index} className="space-y-1">
                   <div className="flex items-center justify-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{entry.name}</span>
                   </div>
                   <p className="text-xs font-black text-slate-900">{entry.value}%</p>
                </div>
              ))}
           </div>
           <button className="w-full mt-10 py-5 bg-primary text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
              View Detailed Analytics
           </button>
        </div>

        {/* Recent Admin Logs */}
        <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-700"></div>
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <ShieldCheck size={24} className="text-primary" />
                 </div>
                 <h4 className="text-xl font-display font-black tracking-tight">Security Center</h4>
              </div>
              <div className="space-y-6 mb-10">
                 {[
                   { msg: 'System integrity verified', time: '2m ago' },
                   { msg: 'Backup completed', time: '1h ago' },
                   { msg: 'Firewall rules updated', time: '5h ago' }
                 ].map((log, i) => (
                   <div key={i} className="flex justify-between items-start">
                      <div>
                         <p className="text-sm font-bold">{log.msg}</p>
                         <p className="text-[10px] font-medium text-slate-400 mt-0.5">{log.time}</p>
                      </div>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2" />
                   </div>
                 ))}
              </div>
              <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                 System Diagnostics
              </button>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminPasswordGate = ({ onAuthorized }: { onAuthorized: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Artificial delay for "neatness" and feel of security
    setTimeout(() => {
      if (password === 'admin890') {
        onAuthorized();
      } else {
        setError(true);
        setIsAuthenticating(false);
        setPassword('');
        setTimeout(() => setError(false), 2000);
      }
    }, 1000);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-slate-900 p-12 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-800 relative overflow-hidden group">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-1000" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] group-hover:bg-teal-500/20 transition-all duration-1000" />
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-slate-800 border border-slate-700 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-primary shadow-2xl relative">
             {isAuthenticating ? (
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
             ) : (
                <ShieldAlert size={40} className={error ? 'text-red-500 animate-pulse' : ''} />
             )}
          </div>
          
          <h2 className="text-3xl font-display font-black text-white tracking-tight leading-tight mb-3 italic">Secure Terminal</h2>
          <p className="text-sm font-semibold text-slate-500 mb-12">Identification required for administrative operations.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600">
                  <Lock size={18} />
               </div>
               <input 
                 type="password" 
                 value={password}
                 disabled={isAuthenticating}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="••••••••"
                 className={`w-full bg-slate-800/50 border ${
                   error ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10'
                 } rounded-3xl pl-16 pr-8 py-6 text-2xl text-white font-black tracking-[0.6em] outline-none transition-all placeholder:text-slate-700 placeholder:tracking-normal disabled:opacity-50`}
               />
               {error && (
                 <p className="absolute -bottom-7 left-0 right-0 text-[10px] font-black text-red-500 uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-2">
                    Invalid Credentials Received
                 </p>
               )}
            </div>
            
            <button 
              disabled={isAuthenticating}
              className="w-full py-6 bg-primary text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isAuthenticating ? 'Decrypting Access Key...' : 'Authorize Login'}
            </button>
          </form>
          
          <div className="mt-12 pt-10 border-t border-slate-800/50">
             <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest">End-to-End Encrypted Session</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorsManagementView = ({ onImpersonate }: { onImpersonate: (role: string, email: string, name?: string) => void }) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [doctors, setDoctors] = React.useState<any[]>([]);

  // Onboard Doctor Modal Input Fields States
  const [newDocName, setNewDocName] = React.useState('');
  const [newDocSpecialty, setNewDocSpecialty] = React.useState('Cardiologist'); // match existing roles
  const [newDocExperience, setNewDocExperience] = React.useState('');
  const [newDocEmail, setNewDocEmail] = React.useState('');

  const fetchDoctors = () => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setDoctors(data);
        }
      })
      .catch(err => {
        console.error('Failed to load doctors from backend, falling back:', err);
        setDoctors([
          { id: 'DR-001', name: 'Dr. Michael Chen', specialty: 'Cardiologist', experience: '12 Yrs', status: 'Verified', rating: 4.9, appointments: 1240, email: 'michael@medicare.com' },
          { id: 'DR-002', name: 'Dr. Sarah Jenkins', specialty: 'Dermatologist', experience: '8 Yrs', status: 'Verified', rating: 4.8, appointments: 850, email: 'sarah@medicare.com' },
          { id: 'DR-003', name: 'Dr. Robert Miller', specialty: 'Dentist', experience: '15 Yrs', status: 'Verified', rating: 4.7, appointments: 210, email: 'robert@medicare.com' },
          { id: 'DR-004', name: 'Dr. Amanda Wright', specialty: 'General Medicine', experience: '10 Yrs', status: 'Verified', rating: 4.9, appointments: 640, email: 'amanda@medicare.com' },
        ]);
      });
  };

  React.useEffect(() => {
    fetchDoctors();
  }, []);

  const toggleVerify = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Verified' ? 'Pending' : 'Verified';
    fetch(`/api/doctors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus })
    })
    .then(res => res.json())
    .then(() => {
      toast.success(`Practitioner is now ${nextStatus}`);
      fetchDoctors();
    })
    .catch(err => {
      console.error(err);
      toast.error('Failed to update verify state on server');
    });
  };

  const deleteDoctor = (id: string) => {
    fetch(`/api/doctors/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      toast.info('Practitioner removed from registry');
      fetchDoctors();
    })
    .catch(err => {
      console.error(err);
      toast.error('Failed to delete doctor profile');
    });
  };

  const handleOnboardDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName || !newDocEmail || !newDocExperience) {
      toast.error('Please fill in all onboarding fields.');
      return;
    }

    const payload = {
      name: newDocName.startsWith('Dr. ') ? newDocName : `Dr. ${newDocName}`,
      specialty: newDocSpecialty,
      experience: newDocExperience.endsWith(' Yrs') || newDocExperience.endsWith(' Years') ? newDocExperience : `${newDocExperience} Yrs`,
      email: newDocEmail,
      status: 'Verified', // Verify them immediately during onboarding to list them to patient frontend!
    };

    fetch('/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      toast.success('Successfully Onboarded!', {
        description: `${payload.name} is now registerd and active on Medicare.`
      });
      setIsAdding(false);
      // Reset state inputs
      setNewDocName('');
      setNewDocExperience('');
      setNewDocEmail('');
      fetchDoctors();
    })
    .catch(err => {
      console.error(err);
      toast.error('Registration failed to upload.');
    });
  };

  const filteredDoctors = doctors.filter(doc => 
    (doc.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (doc.specialty || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight leading-tight italic">Healthcare Practitioners</h2>
          <p className="text-sm font-semibold text-slate-400 mt-2">Oversee medical credentials, performance, and platform status.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
           <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search specialty, name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
              />
           </div>
           <button 
             onClick={() => setIsAdding(true)}
             className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-900/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
           >
              <Plus size={16} /> Onboard Doctor
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
              <div className="flex items-center gap-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-3xl font-black text-slate-200 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {doc.name.split(' ').pop()?.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-9 h-9 rounded-xl border-4 border-white shadow-sm flex items-center justify-center text-white ${
                    doc.status === 'Verified' ? 'bg-green-500' : 'bg-orange-400'
                  }`}>
                    {doc.status === 'Verified' ? <ShieldCheck size={16} /> : <ShieldQuestion size={16} />}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-2xl font-display font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">{doc.name}</h4>
                    <span className="bg-slate-50 text-slate-400 text-[9px] font-black uppercase px-3 py-1 rounded-full">ID: {doc.id}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest leading-none">Specialty</p>
                      <p className="text-xs font-bold text-slate-500">{doc.specialty}</p>
                    </div>
                    <div className="w-px h-6 bg-slate-100 hidden sm:block"></div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest leading-none">Experience</p>
                      <p className="text-xs font-bold text-slate-900">{doc.experience}</p>
                    </div>
                    <div className="w-px h-6 bg-slate-100 hidden sm:block"></div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest leading-none">Rating</p>
                      <div className="flex items-center gap-1">
                         <span className="text-xs font-black text-amber-500">{doc.rating || 5.0}</span>
                         <Star size={10} className="fill-amber-500 text-amber-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 lg:min-w-[450px]">
                <div className="flex-1 w-full bg-slate-50 rounded-[2rem] p-6 flex items-center justify-around">
                   <div className="text-center">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2">Appointments</p>
                      <p className="text-xl font-display font-black text-slate-900 tracking-tight">{(doc.appointments || 0).toLocaleString()}</p>
                   </div>
                   <div className="w-px h-10 bg-slate-200"></div>
                   <div className="text-center">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2">Performance</p>
                      <p className="text-xl font-display font-black text-green-500 tracking-tight">{doc.status === 'Verified' ? 'Top Tier' : 'Pending Review'}</p>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                   <button 
                     onClick={() => onImpersonate('Doctor', doc.email, doc.name)}
                     className="p-4 bg-primary/10 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/view"
                     title="View Clinical Dashboard"
                   >
                      <Layout size={20} className="group-hover/view:scale-110 transition-transform" />
                   </button>
                   <button 
                     onClick={() => toggleVerify(doc.id, doc.status)}
                     className={`p-4 rounded-2xl transition-all shadow-sm ${
                       doc.status === 'Verified' ? 'bg-orange-50 text-orange-500 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100'
                     }`}
                     title={doc.status === 'Verified' ? 'Revoke Verification' : 'Verify Credentials'}
                   >
                      {doc.status === 'Verified' ? <XCircle size={20} /> : <CheckCircle size={20} />}
                   </button>
                   <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                      <Edit size={20} />
                   </button>
                   <button 
                     onClick={() => deleteDoctor(doc.id)}
                     className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                   >
                      <Trash2 size={20} />
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {doctors.length === 0 && (
          <div className="bg-white p-32 rounded-[4rem] text-center border-2 border-dashed border-slate-100">
             <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                <Stethoscope size={40} />
             </div>
             <h3 className="text-2xl font-display font-black text-slate-900 mb-2">No Doctors Found</h3>
             <p className="text-slate-400 font-medium max-w-sm mx-auto">Either search query didn't match or no practitioners are currently listed.</p>
          </div>
        )}
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <form onSubmit={handleOnboardDoctor} className="bg-white w-full max-w-2xl rounded-[4rem] p-12 shadow-2xl relative animate-in slide-in-from-bottom-12 duration-700">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="absolute top-10 right-10 w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-all font-bold"
              >
                <XCircle size={24} />
              </button>
              <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight leading-tight mb-2 italic">Onboard Practitioner</h3>
              <p className="text-sm font-semibold text-slate-400 mb-10">Add a new licensed medical professional to the Medicare ecosystem.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Dr. Jane Cooper" 
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none font-bold text-slate-900" 
                      required
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Specialty</label>
                    <select 
                      value={newDocSpecialty}
                      onChange={(e) => setNewDocSpecialty(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none appearance-none font-bold text-slate-900"
                    >
                       <option value="Cardiologist">Cardiologist</option>
                       <option value="Dermatologist">Dermatologist</option>
                       <option value="Dentist">Dentist</option>
                       <option value="General Medicine">General Medicine</option>
                       <option value="Orthopedic">Orthopedic</option>
                       <option value="Pediatrician">Pediatrician</option>
                    </select>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Experience</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 10 Years" 
                      value={newDocExperience}
                      onChange={(e) => setNewDocExperience(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none font-bold text-slate-900" 
                      required
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane.cooper@medicare.com" 
                      value={newDocEmail}
                      onChange={(e) => setNewDocEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none font-bold text-slate-900" 
                      required
                    />
                 </div>
              </div>
              
              <div className="mt-12 flex justify-end">
                 <button 
                  type="submit"
                  className="bg-primary text-white px-12 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
                 >
                    Confirm Registration
                 </button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

const AppointmentsManagementView = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');
  
  const [appointments, setAppointments] = React.useState<any[]>([]);

  const fetchAppointments = () => {
    const APPOINTMENTS_KEY = 'medsync_appointments';
    const stored = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setAppointments(data);
        } else {
          setAppointments(stored);
        }
      })
      .catch(() => {
        setAppointments(stored);
      });
  };

  React.useEffect(() => {
    fetchAppointments();
  }, []);

  const handleRefund = (id: string) => {
    toast.success('Reversal Authorized', { description: `Payment for ${id} has been refunded.` });
    
    fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentStatus: 'Refunded', bookingStatus: 'Cancelled', status: 'Cancelled' })
    })
    .then(res => res.json())
    .then(() => {
      fetchAppointments();
    })
    .catch(err => {
      console.error(err);
      const updated = appointments.map(app => 
        app.id === id ? { ...app, paymentStatus: 'Refunded', bookingStatus: 'Cancelled', status: 'Cancelled' } : app
      );
      setAppointments(updated);
      localStorage.setItem('medsync_appointments', JSON.stringify(updated));
    });
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = (app.patient || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (app.doctor || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (app.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'All' || app.paymentStatus === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">
             <CreditCard size={10} /> Billing & Finance
          </div>
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight leading-tight italic">Operations Terminal</h2>
          <p className="text-sm font-semibold text-slate-400 mt-3 leading-relaxed tracking-tight">Audit global transaction logs, monitor payment settlements, and process administrative refunds.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
           <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search txid or name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-100 rounded-[2rem] pl-16 pr-6 py-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
              />
           </div>
           <div className="flex bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200">
            {['All', 'Paid', 'Pending', 'Refunded'].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  statusFilter === f 
                    ? 'bg-white text-primary shadow-lg shadow-slate-200' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">TxID ID</th>
                <th className="px-10 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">Stakeholders</th>
                <th className="px-10 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">Timeline</th>
                <th className="px-10 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">Settlement</th>
                <th className="px-10 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">Fulfillment</th>
                <th className="px-10 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100 text-right">Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/20 transition-all group">
                  <td className="px-10 py-10">
                    <span className="text-[11px] font-black text-slate-900 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200/50 font-mono">{app.id}</span>
                  </td>
                  <td className="px-10 py-10">
                    <div className="space-y-1.5">
                      <p className="text-xl font-display font-black text-slate-900 italic tracking-tight">{app.patient || app.userId?.split('@')[0] || 'Unknown Patient'}</p>
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                         <div className="w-1 h-1 bg-primary rounded-full" />
                         Consulting: {app.doctor || app.doc}
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <div className="space-y-1.5">
                      <p className="text-sm font-black text-slate-900">{app.date}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{app.time}</p>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <div className="space-y-1">
                      <p className="text-2xl font-display font-black text-slate-900 tracking-tight italic">{app.amount}</p>
                      <div className={`text-[8px] font-black uppercase tracking-[0.1em] ${
                         app.paymentStatus === 'Paid' ? 'text-emerald-500' : 
                         app.paymentStatus === 'Pending' ? 'text-amber-500' : 'text-rose-500'
                      }`}>{app.paymentStatus} via Stripe</div>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <span className={`px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border-2 ${
                      app.bookingStatus === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100/50' :
                      app.bookingStatus === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100/50' :
                      'bg-rose-50 text-rose-600 border-rose-100/50'
                    }`}>
                      {app.bookingStatus}
                    </span>
                  </td>
                  <td className="px-10 py-10">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <button className="w-14 h-14 bg-white border border-slate-100 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-xl hover:shadow-slate-200 flex items-center justify-center">
                        <ReceiptText size={20} />
                      </button>
                      {app.paymentStatus === 'Paid' && (
                        <button 
                          onClick={() => handleRefund(app.id)}
                          className="w-14 h-14 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-500/10 flex items-center justify-center"
                          title="Authorize Reversal"
                        >
                          <RotateCcw size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAppointments.length === 0 && (
            <div className="py-40 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-200 border border-slate-100/50">
                <Search size={40} />
              </div>
              <h3 className="text-3xl font-display font-black text-slate-900 tracking-tighter">Zero Correlation Detected</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-4">Adjustment of parameters recommended</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
const NotificationsManagementView = ({ onAction }: { onAction: (title: string, message: string) => void }) => {
  const [logs, setLogs] = React.useState([
    { id: 'NT-101', type: 'Booking Confirmation', recipient: 'john.doe@email.com', status: 'Sent', time: '10m ago', channel: 'Email' },
    { id: 'NT-102', type: 'Appointment Reminder', recipient: 'sarah.smith@med.com', status: 'Delivered', time: '45m ago', channel: 'Toast' },
    { id: 'NT-103', type: 'Payment Success', recipient: 'finance@medicare.com', status: 'Sent', time: '2h ago', channel: 'Email' },
    { id: 'NT-104', type: 'Security Alert', recipient: 'admin@medicare.com', status: 'Failed', time: '5h ago', channel: 'Push' },
  ]);

  const [activeChannel, setActiveChannel] = React.useState('All');

  const triggerNotification = (type: string) => {
    const newLog = {
      id: `NT-${Math.floor(100 + Math.random() * 900)}`,
      type,
      recipient: 'demo.user@example.com',
      status: 'Sent',
      time: 'Just now',
      channel: 'Mixed'
    };
    
    setLogs([newLog, ...logs]);
    
    // Trigger real toast
    if (type === 'Booking Confirmation') {
      onAction('Booking Confirmed', 'A confirmation email was dispatched to the patient.');
      toast.success('Booking Confirmed!', {
        description: 'A confirmation email has been dispatched to the patient.',
      });
    } else if (type === 'Appointment Reminder') {
      onAction('Reminder Dispatched', 'The automated appointment reminder is now active.');
      toast.info('Reminder Dispatched', {
        description: 'The automated appointment reminder is now active.',
      });
    } else if (type === 'Payment Success') {
      onAction('Funds Verified', 'Transaction complete. Invoice generated and archived.');
      toast.success('Funds Verified', {
        description: 'Transaction complete. Invoice generated and archived.',
      });
    }
  };

  const filteredLogs = logs.filter(log => activeChannel === 'All' || log.channel === activeChannel);

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">
             <BellRing size={10} /> Communication Suite
          </div>
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight leading-tight italic">Automation Hub</h2>
          <p className="text-sm font-semibold text-slate-400 mt-3 leading-relaxed tracking-tight">Monitor real-time system alerts, manage outbound automated correspondences, and broadcast global updates.</p>
        </div>
        
        <div className="flex gap-4">
           {['Booking Confirmation', 'Appointment Reminder', 'Payment Success'].map((action) => (
             <button
               key={action}
               onClick={() => triggerNotification(action)}
               className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-primary/30 hover:text-primary transition-all shadow-sm"
             >
               <Zap size={14} className="text-amber-400" />
               Test {action.split(' ')[1]}
             </button>
           ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden">
               <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-display font-black text-slate-900 italic tracking-tight">Outbound Registry</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time correspondence logs</p>
                  </div>
                  <div className="flex bg-slate-50 p-1 rounded-xl">
                    {['All', 'Email', 'Toast', 'Push'].map(ch => (
                      <button
                        key={ch}
                        onClick={() => setActiveChannel(ch)}
                        className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                          activeChannel === ch ? 'bg-white text-primary shadow-sm' : 'text-slate-400'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-50/50">
                           <th className="px-10 py-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Trace ID</th>
                           <th className="px-10 py-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Event Type</th>
                           <th className="px-10 py-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Recipient</th>
                           <th className="px-10 py-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                           <th className="px-10 py-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Timeline</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {filteredLogs.map(log => (
                          <tr key={log.id} className="hover:bg-slate-50/30 transition-all group">
                             <td className="px-10 py-6">
                                <span className="text-[10px] font-bold text-slate-400 font-mono">{log.id}</span>
                             </td>
                             <td className="px-10 py-6 border-l-4 border-transparent group-hover:border-primary transition-all">
                                <p className="text-sm font-black text-slate-900 tracking-tight">{log.type}</p>
                                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{log.channel} Channel</span>
                             </td>
                             <td className="px-10 py-6">
                                <p className="text-xs font-semibold text-slate-500">{log.recipient}</p>
                             </td>
                             <td className="px-10 py-6">
                                <span className={`inline-flex items-center gap-1.5 text-[8px] font-black uppercase px-3 py-1 rounded-full ${
                                  log.status === 'Sent' ? 'bg-emerald-50 text-emerald-600' :
                                  log.status === 'Delivered' ? 'bg-blue-50 text-blue-600' :
                                  'bg-rose-50 text-rose-600'
                                }`}>
                                   <div className={`w-1 h-1 rounded-full ${
                                     log.status === 'Sent' ? 'bg-emerald-500' :
                                     log.status === 'Delivered' ? 'bg-blue-500' :
                                     'bg-rose-500'
                                   }`} />
                                   {log.status}
                                </span>
                             </td>
                             <td className="px-10 py-6">
                                <span className="text-[10px] font-bold text-slate-400 italic">{log.time}</span>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-700"></div>
               <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Send size={24} className="text-primary" />
                     </div>
                     <h4 className="text-xl font-display font-black tracking-tight">Manual Dispatch</h4>
                  </div>
                  <div className="space-y-6 mb-10">
                     <div className="space-y-4">
                        <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Broadcast Target</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-primary/20 outline-none appearance-none">
                           <option>All Active Users</option>
                           <option>Medical Staff Only</option>
                           <option>Patient Registry</option>
                        </select>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Notification Payload</label>
                        <textarea 
                           rows={4} 
                           placeholder="Type broadcast message..."
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/20 outline-none resize-none"
                        />
                     </div>
                  </div>
                  <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                     <BellPlus size={16} /> Execute Broadcast
                  </button>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <h4 className="text-lg font-display font-black text-slate-900 mb-6 tracking-tight italic">Performance Metrics</h4>
               <div className="space-y-6">
                  {[
                    { label: 'Overall Delivery Rate', value: '98.4%', trend: '+0.2%' },
                    { label: 'Avg. Open Rate (Email)', value: '42.8%', trend: '+5.4%' },
                    { label: 'Push Conversion', value: '12.1%', trend: '-1.1%' }
                  ].map((m, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                          <p className="text-xl font-display font-black text-slate-900 tracking-tight">{m.value}</p>
                       </div>
                       <span className={`text-[10px] font-black ${m.trend.startsWith('+') ? 'text-green-500' : 'text-rose-500'}`}>{m.trend}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-3">
                  <Volume2 size={14} /> Alert Configuration
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const CMSManagementView = () => {
  const [activeSection, setActiveSection] = React.useState<'hero' | 'testimonials' | 'faq' | 'services'>('hero');
  const [isSaving, setIsSaving] = React.useState(false);
  
  const [hero, setHero] = React.useState({
    heroTitle: '',
    heroSubtitle: '',
    ctaText: ''
  });

  const [testimonials, setTestimonials] = React.useState<any[]>([]);
  const [faqs, setFaqs] = React.useState<any[]>([]);
  const [services, setServices] = React.useState<any[]>([]);

  React.useEffect(() => {
    const unsubHero = subscribeToCMS('hero', (data) => data && setHero(data));
    const unsubTestimonials = subscribeToCMS('testimonials', (data) => data && setTestimonials(data));
    const unsubFaq = subscribeToCMS('faq', (data) => data && setFaqs(data));
    const unsubServices = subscribeToCMS('services', (data) => data && setServices(data));

    return () => {
      unsubHero();
      unsubTestimonials();
      unsubFaq();
      unsubServices();
    };
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (activeSection === 'hero') await updateCMS('hero', hero);
      if (activeSection === 'testimonials') await updateCMS('testimonials', testimonials);
      if (activeSection === 'faq') await updateCMS('faq', faqs);
      if (activeSection === 'services') await updateCMS('services', services);
      
      toast.success('Changes Saved Successfully', {
        description: `The ${activeSection} section has been synchronized with the live platform.`
      });
    } catch (err) {
      console.error(err);
      toast.error('Sync Failed', {
        description: 'An error occurred while updating the global registry.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { id: Date.now(), name: 'New Patient', content: 'Describe here...', rating: 5, role: 'Patient' }]);
  };

  const deleteTestimonial = (id: any) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const updateTestimonial = (id: any, field: string, value: any) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addFaq = () => {
    setFaqs([...faqs, { id: Date.now(), question: 'New Question?', answer: 'New Answer...' }]);
  };

  const deleteFaq = (id: any) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  const updateFaq = (id: any, field: string, value: any) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const addService = () => {
    setServices([...services, { id: Date.now(), title: 'New Service', description: 'Description...', icon: 'HeartPulse', color: 'bg-primary' }]);
  };

  const deleteService = (id: any) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id: any, field: string, value: any) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">
             <FileText size={10} /> Content Management
          </div>
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight leading-tight italic">CMS Global Registry</h2>
          <p className="text-sm font-semibold text-slate-400 mt-3 leading-relaxed tracking-tight">Modify landing page architecture, manage social proof, and orchestrate service descriptions.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200">
           {[
             { id: 'hero', label: 'Landing', icon: Layout },
             { id: 'testimonials', label: 'Social Proof', icon: MessageSquare },
             { id: 'faq', label: 'Support', icon: HelpCircle },
             { id: 'services', label: 'Portfolio', icon: Trophy }
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveSection(tab.id as any)}
               className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeSection === tab.id 
                   ? 'bg-white text-primary shadow-lg shadow-slate-200' 
                   : 'text-slate-400 hover:text-slate-600'
               }`}
             >
               <tab.icon size={14} />
               <span className="hidden sm:inline">{tab.label}</span>
             </button>
           ))}
        </div>
      </motion.div>

      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl p-16 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-40 -mt-40 blur-3xl" />
         
         <div className="relative z-10">
            {activeSection === 'hero' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Main Hero Title</label>
                       <input 
                         type="text" 
                         value={hero.heroTitle}
                         onChange={(e) => setHero({...hero, heroTitle: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-10 py-6 text-2xl font-display font-black text-slate-900 italic tracking-tight focus:ring-4 focus:ring-primary/5 outline-none" 
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Hero Description</label>
                       <textarea 
                         rows={3}
                         value={hero.heroSubtitle}
                         onChange={(e) => setHero({...hero, heroSubtitle: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-10 py-6 text-sm font-semibold text-slate-500 leading-relaxed focus:ring-4 focus:ring-primary/5 outline-none resize-none" 
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Primary CTA Label</label>
                       <input 
                         type="text" 
                         value={hero.ctaText}
                         onChange={(e) => setHero({...hero, ctaText: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-10 py-6 text-sm font-black text-slate-900 tracking-widest focus:ring-4 focus:ring-primary/5 outline-none" 
                       />
                    </div>
                 </div>
              </div>
            )}

            {activeSection === 'testimonials' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-display font-black text-slate-900 italic tracking-tight">Active Testimonials</h4>
                    <button 
                      onClick={addTestimonial}
                      className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all"
                    >
                       <Plus size={14} /> Add New
                    </button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map(t => (
                      <div key={t.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group/card">
                         <div className="space-y-4">
                           <input 
                             type="text"
                             value={t.name}
                             onChange={(e) => updateTestimonial(t.id, 'name', e.target.value)}
                             placeholder="Name"
                             className="w-full bg-transparent border-b border-slate-200 focus:border-primary outline-none font-black text-slate-900 uppercase text-[10px] tracking-widest pb-1"
                           />
                           <textarea 
                             value={t.content}
                             onChange={(e) => updateTestimonial(t.id, 'content', e.target.value)}
                             placeholder="Testimonial content..."
                             className="w-full bg-transparent border-b border-slate-200 focus:border-primary outline-none font-semibold text-slate-600 italic text-sm leading-relaxed pb-1 resize-none"
                           />
                           <div className="flex items-center gap-2">
                             <label className="text-[9px] font-black uppercase text-slate-400">Rating:</label>
                             <input 
                               type="number" 
                               min="1" 
                               max="5" 
                               value={t.rating}
                               onChange={(e) => updateTestimonial(t.id, 'rating', parseInt(e.target.value))}
                               className="w-12 bg-transparent border-b border-slate-200 focus:border-primary outline-none font-bold text-slate-900 text-xs text-center"
                             />
                             <Star size={12} className="fill-amber-400 text-amber-400" />
                           </div>
                         </div>
                         <div className="absolute top-6 right-6 flex gap-2">
                            <button 
                              onClick={() => deleteTestimonial(t.id)}
                              className="p-2 bg-white rounded-lg text-slate-400 hover:text-red-500 shadow-sm"
                            >
                              <Trash2 size={14} />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeSection === 'faq' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-display font-black text-slate-900 italic tracking-tight">Support Registry</h4>
                    <button 
                      onClick={addFaq}
                      className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all"
                    >
                       <Plus size={14} /> New Entry
                    </button>
                 </div>
                 <div className="space-y-4">
                    {faqs.map(faq => (
                      <div key={faq.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative group/faq hover:bg-white hover:border-primary/20 transition-all">
                         <div className="space-y-4 pr-12">
                            <input 
                              type="text"
                              value={faq.question}
                              onChange={(e) => updateFaq(faq.id, 'question', e.target.value)}
                              placeholder="Question"
                              className="w-full bg-transparent border-b border-slate-200 focus:border-primary outline-none font-black text-slate-900 tracking-tight"
                            />
                            <textarea 
                              value={faq.answer}
                              onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)}
                              placeholder="Answer"
                              className="w-full bg-transparent border-b border-slate-200 focus:border-primary outline-none font-medium text-slate-600 text-sm leading-relaxed pb-1 resize-none"
                            />
                         </div>
                         <div className="absolute top-8 right-8">
                            <button 
                              onClick={() => deleteFaq(faq.id)}
                              className="p-3 bg-white rounded-xl text-slate-300 hover:text-red-500 transition-colors shadow-sm"
                            >
                              <Trash2 size={16} />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeSection === 'services' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-display font-black text-slate-900 italic tracking-tight">Clinical Portfolio</h4>
                    <button 
                      onClick={addService}
                      className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all"
                    >
                       <Plus size={14} /> Register Hub
                    </button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map(s => (
                      <div key={s.id} className="p-10 bg-slate-50 rounded-[3.5rem] border border-slate-100 relative group/service hover:bg-white hover:border-primary/20 transition-all duration-300">
                         <div className="space-y-4">
                            <div className="flex items-center gap-4">
                               <div className="w-16 h-16 bg-white shadow-sm rounded-[1.5rem] flex items-center justify-center text-primary group-hover/service:bg-primary group-hover/service:text-white transition-all duration-500">
                                  {s.icon === 'Zap' ? <Zap size={24} /> : <Stethoscope size={24} />}
                               </div>
                               <input 
                                 type="text"
                                 value={s.title}
                                 onChange={(e) => updateService(s.id, 'title', e.target.value)}
                                 className="flex-1 bg-transparent border-b border-slate-200 focus:border-primary outline-none font-display font-black text-slate-900 text-lg italic tracking-tight"
                               />
                            </div>
                            <div className="space-y-1.5 text-left mt-3">
                               <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.12em] block pl-1">Service Description Box</label>
                               <textarea 
                                 value={s.description}
                                 onChange={(e) => updateService(s.id, 'description', e.target.value)}
                                 className="w-full bg-white border border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none font-medium text-slate-600 text-xs leading-relaxed resize-y min-h-[140px] shadow-sm"
                                 rows={5}
                               />
                            </div>
                         </div>
                         <button 
                           onClick={() => deleteService(s.id)}
                           className="absolute top-8 right-8 p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-red-500 transition-all shadow-sm"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            <div className="mt-16 pt-10 border-t border-slate-100 flex justify-end">
               <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary text-white px-12 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 disabled:opacity-50"
               >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ShieldCheck size={16} />
                  )}
                  {isSaving ? 'Synchronizing Registry...' : 'Synchronize All Changes'}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const UsersManagementView = ({ onImpersonate }: { onImpersonate: (role: string, email: string, name?: string) => void }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [viewingBookings, setViewingBookings] = React.useState<string | null>(null);
  
  const [users, setUsers] = React.useState([
    { id: 'USR-001', name: 'John Doe', email: 'john@example.com', role: 'Patient', joined: 'Jan 12, 2026', status: 'Active', bookings: 5, avatar: 'JD', totalSpent: '$1,250', lastActive: '2 hours ago' },
    { id: 'USR-002', name: 'Alina Stark', email: 'alina@stark.com', role: 'Patient', joined: 'Feb 05, 2026', status: 'Active', bookings: 2, avatar: 'AS', totalSpent: '$480', lastActive: '1 day ago' },
    { id: 'USR-003', name: 'Robert Baratheon', email: 'king@westeros.com', role: 'Patient', joined: 'Mar 20, 2026', status: 'Banned', bookings: 0, avatar: 'RB', totalSpent: '$0', lastActive: '2 months ago' },
    { id: 'USR-004', name: 'Arya Smith', email: 'no_one@winterfell.com', role: 'Patient', joined: 'April 10, 2026', status: 'Active', bookings: 8, avatar: 'AS', totalSpent: '$2,100', lastActive: 'Just now' },
  ]);

  const toggleBan = (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: user.status === 'Banned' ? 'Active' : 'Banned' } : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || user.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const selectedUser = users.find(u => u.id === viewingBookings);

  const mockBookings = [
    { id: 'BK-101', doctor: 'Dr. Michael Chen', date: 'May 18, 2026', time: '10:00 AM', status: 'Confirmed', price: '$150', code: 'MC-12A' },
    { id: 'BK-102', doctor: 'Dr. Sarah Smith', date: 'May 20, 2026', time: '02:30 PM', status: 'Pending', price: '$200', code: 'SS-99B' },
    { id: 'BK-103', doctor: 'Dr. David Wilson', date: 'April 12, 2026', time: '11:00 AM', status: 'Completed', price: '$150', code: 'DW-44Z' },
  ];

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">
             <Users size={10} /> Directory Control
          </div>
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight leading-tight italic">User Ecosystem</h2>
          <p className="text-sm font-semibold text-slate-400 mt-3 leading-relaxed tracking-tight">Oversee participation, accessibility, and financial engagement across the healthcare platform.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
           <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search access registry..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-100 rounded-3xl pl-16 pr-6 py-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm group-hover:shadow-md"
              />
           </div>
           <div className="flex bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200">
            {['All', 'Active', 'Banned'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === filter 
                    ? 'bg-white text-primary shadow-lg shadow-slate-200' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredUsers.map((user, idx) => (
            <motion.div 
              key={user.id} 
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm hover:border-primary/20 hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-[2rem] flex items-center justify-center text-2xl font-black group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 overflow-hidden shadow-inner uppercase">
                      {user.avatar}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-9 h-9 rounded-xl border-4 border-white shadow-md flex items-center justify-center text-white z-10 ${
                      user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}>
                      {user.status === 'Active' ? <ShieldCheck size={16} /> : <Ban size={16} />}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-2xl font-display font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors flex items-center gap-3">
                      {user.name}
                      {user.lastActive === 'Just now' && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                       <Mail size={12} className="text-slate-300" />
                       {user.email}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                       <span className="text-[10px] font-black uppercase bg-slate-50 text-slate-400 px-3 py-1 rounded-full tracking-widest border border-slate-100">{user.id}</span>
                       <div className="w-1 h-1 bg-slate-100 rounded-full" />
                       <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Active: {user.lastActive}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row items-center gap-6 xl:gap-10 lg:min-w-[500px]">
                  <div className="flex-1 w-full grid grid-cols-2 gap-4 lg:gap-8 bg-slate-50/50 p-6 rounded-[2.5rem] lg:rounded-[3rem] border border-slate-100/50 backdrop-blur-sm">
                     <div className="text-center group/stat">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2">Bookings</p>
                        <p className="text-xl font-display font-black text-slate-900 group-hover:text-primary transition-colors">{user.bookings}</p>
                     </div>
                     <div className="text-center group/stat border-l border-slate-200/50">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2">Rev. Generated</p>
                        <p className="text-xl font-display font-black text-emerald-500">{user.totalSpent}</p>
                     </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto justify-center xl:justify-end">
                     <button 
                       onClick={() => onImpersonate('Patient', user.email, user.name)}
                       className="flex-1 xl:flex-none h-16 bg-primary/10 text-primary rounded-[1.5rem] lg:rounded-[1.8rem] hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-primary/20 flex items-center justify-center group/view px-6"
                       title="View Patient Dashboard"
                     >
                        <Layout size={24} className="group-hover/view:scale-110 transition-transform" />
                        <span className="xl:hidden ml-3 font-black uppercase tracking-widest text-[10px]">Dashboard</span>
                     </button>
                     <button 
                       onClick={() => setViewingBookings(user.id)}
                       className="w-16 h-16 bg-white border border-slate-100 text-slate-400 rounded-[1.5rem] lg:rounded-[1.8rem] hover:bg-slate-900 hover:text-white transition-all shadow-xl hover:shadow-slate-200 flex items-center justify-center group/btn shrink-0"
                       title="View Engagement History"
                     >
                        <Clock size={24} className="group-hover/btn:scale-110 transition-transform" />
                     </button>
                     <button 
                       onClick={() => toggleBan(user.id)}
                       className={`px-8 py-5 h-16 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest transition-all shadow-2xl flex items-center gap-3 ${
                         user.status === 'Active' 
                           ? 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white shadow-rose-500/10' 
                           : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white shadow-emerald-500/10'
                       }`}
                     >
                        <Ban size={16} /> 
                        {user.status === 'Active' ? 'Sanction Access' : 'Restore Access'}
                     </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredUsers.length === 0 && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-white border-2 border-dashed border-slate-100 p-32 rounded-[4rem] text-center"
           >
              <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-[3rem] flex items-center justify-center mx-auto mb-8 border border-slate-100/50">
                 <Users size={48} />
              </div>
              <h3 className="text-3xl font-display font-black text-slate-900 mb-2">No Matching Entities</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] max-w-sm mx-auto">No records found for the current search or filtering logic.</p>
           </motion.div>
        )}
      </div>

      <AnimatePresence>
        {viewingBookings && selectedUser && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 40 }}
               className="bg-white w-full max-w-4xl rounded-[4rem] p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group border border-slate-100"
             >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -mr-40 -mt-40 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full -ml-20 -mb-20 blur-[100px] pointer-events-none" />
                
                <button 
                  onClick={() => setViewingBookings(null)}
                  className="absolute top-12 right-12 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all z-20 shadow-sm"
                >
                  <XCircle size={28} />
                </button>
                
                <div className="relative z-10">
                   <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
                      <div className="flex items-center gap-8">
                        <div className="w-24 h-24 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center text-4xl font-black shadow-2xl relative overflow-hidden">
                           {selectedUser.avatar}
                           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        </div>
                        <div>
                           <div className="flex items-center gap-3 mb-2">
                              <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-full">Engagement Ledger</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                           </div>
                           <h3 className="text-4xl font-display font-black text-slate-900 tracking-tight leading-tight italic">{selectedUser.name}</h3>
                           <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-1">{selectedUser.email}</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                         <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2 text-center">Total Value</p>
                         <p className="text-3xl font-display font-black text-slate-900">{selectedUser.totalSpent}</p>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-6 custom-scrollbar scroll-smooth">
                      {mockBookings.map((bk, i) => (
                        <motion.div 
                          key={bk.id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 group/item hover:border-primary/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                        >
                           <div className="flex items-center gap-8">
                              <div className="relative">
                                 <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shadow-inner border border-slate-100 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500">
                                    <Calendar size={28} />
                                 </div>
                                 <div className="absolute -top-2 -left-2 bg-slate-900 text-white text-[8px] font-black px-2 py-0.5 rounded-lg border-2 border-white">{bk.code}</div>
                              </div>
                              <div>
                                 <p className="text-xl font-display font-black text-slate-900 italic tracking-tight">{bk.doctor}</p>
                                 <div className="flex items-center gap-3 mt-1.5">
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-2.5 py-1 rounded-full">
                                       <Calendar size={10} /> {bk.date}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-2.5 py-1 rounded-full">
                                       <Clock size={10} /> {bk.time}
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-10">
                              <div className="text-right">
                                 <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Transaction</p>
                                 <p className="text-lg font-black text-slate-900">{bk.price}</p>
                              </div>
                              <span className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 shadow-sm ${
                                 bk.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100 shadow-blue-500/5' : 
                                 bk.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-500/5' : 
                                 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/5'
                              }`}>
                                 {bk.status}
                              </span>
                           </div>
                        </motion.div>
                      ))}
                   </div>
                   
                   <div className="mt-12 flex justify-end gap-6 items-center">
                      <p className="text-[10px] font-bold text-slate-400 tracking-tight">Records verified for terminal session ID_ADMN_92</p>
                      <button 
                       onClick={() => setViewingBookings(null)}
                       className="bg-slate-900 text-white px-12 py-5 rounded-[2.2rem] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-slate-900/40"
                      >
                         Securely Close Report
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SettingsManagementView = ({ profile }: { profile: any }) => {
  const [activeSubTab, setActiveSubTab] = useState('profile');

  const settingsTabs = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'platform', label: 'Platform Config', icon: Layout },
    { id: 'security', label: 'Security & Auth', icon: Lock },
    { id: 'integrations', label: 'Cloud & APIs', icon: Server },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">
             <Settings size={10} /> System Orchestration
          </div>
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight leading-tight italic">Platform Settings</h2>
          <p className="text-sm font-semibold text-slate-400 mt-3 leading-relaxed tracking-tight">Configure global behaviors, management permissions, and technical integrations for the Medicare OS.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-3">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`w-full flex items-center gap-4 px-8 py-6 rounded-[2rem] transition-all duration-300 border ${
                activeSubTab === tab.id 
                  ? 'bg-white border-primary/20 text-primary shadow-xl shadow-slate-200/50 -translate-x-2' 
                  : 'bg-transparent border-transparent text-slate-400 hover:bg-white hover:border-slate-100'
              }`}
            >
              <tab.icon size={20} className={activeSubTab === tab.id ? 'text-primary' : 'text-slate-300'} />
              <span className="text-[11px] font-black uppercase tracking-widest leading-none">{tab.label}</span>
              {activeSubTab === tab.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl p-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {activeSubTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-8 mb-16">
                    <div className="relative group/avatar">
                      <div className="w-32 h-32 rounded-[3.5rem] bg-slate-900 overflow-hidden shadow-2xl relative border-4 border-white">
                        <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <Edit size={24} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white">
                        <ShieldCheck size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight italic">{profile.name}</h3>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Super Administrator • ID: ADMIN_01</p>
                      <button className="mt-4 px-6 py-2 bg-slate-50 text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] rounded-full border border-slate-100 hover:bg-slate-900 hover:text-white transition-all">
                        Update Portrait
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Full Name</label>
                      <input type="text" defaultValue={profile.name} className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-5 text-sm font-semibold outline-none focus:border-primary/20 transition-all shadow-inner" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Email Address</label>
                      <input type="email" defaultValue={profile.email} className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-5 text-sm font-semibold outline-none focus:border-primary/20 transition-all shadow-inner" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">System Role</label>
                      <input type="text" readOnly value="Master Architect (Super Admin)" className="w-full bg-slate-100 border border-slate-100 rounded-[2rem] px-8 py-5 text-sm font-black text-slate-400 outline-none" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Timezone</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-5 text-sm font-semibold outline-none focus:border-primary/20 transition-all shadow-inner appearance-none">
                        <option>UTC-5 (New York)</option>
                        <option>UTC+0 (London)</option>
                        <option>UTC+8 (Singapore)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'platform' && (
                <motion.div
                  key="platform"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-xl font-display font-black text-slate-900 italic tracking-tight mb-6">Visual Environment</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:border-primary/20 transition-all shadow-sm">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                              <Palette size={24} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 tracking-tight">Dark Mode Terminal</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adjust platform luminosity</p>
                            </div>
                          </div>
                          <div className="w-14 h-8 bg-slate-200 rounded-full p-1 cursor-pointer">
                            <div className="w-6 h-6 bg-white rounded-full shadow-sm" />
                          </div>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:border-primary/20 transition-all shadow-sm">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                              <Zap size={24} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 tracking-tight">Eco Performance</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optimize asset delivery</p>
                            </div>
                          </div>
                          <div className="w-14 h-8 bg-emerald-500 rounded-full p-1 cursor-pointer flex justify-end">
                            <div className="w-6 h-6 bg-white rounded-full shadow-sm" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-display font-black text-slate-900 italic tracking-tight mb-6">Communication Vectors</h4>
                      <div className="space-y-4">
                        {[
                          { label: 'Real-time Push Alerts', desc: 'Browser notifications for critical events', active: true, icon: BellRing },
                          { label: 'Email Correspondence', desc: 'Daily digests and transaction receipts', active: true, icon: Mail },
                          { label: 'SMS Gateway', desc: 'Urgent medical alerts via Twilio', active: false, icon: Smartphone }
                        ].map((n, i) => (
                          <div key={i} className="px-10 py-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-primary/20 transition-all">
                             <div className="flex items-center gap-6">
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                  <n.icon size={20} />
                               </div>
                               <div>
                                 <p className="text-sm font-black text-slate-900 tracking-tight">{n.label}</p>
                                 <p className="text-[10px] font-semibold text-slate-400 lowercase tracking-tight">{n.desc}</p>
                               </div>
                             </div>
                             <button className={`w-14 h-8 rounded-full p-1 transition-all ${n.active ? 'bg-primary flex justify-end' : 'bg-slate-200'}`}>
                                <div className="w-6 h-6 bg-white rounded-full shadow-md" />
                             </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                       <div>
                          <div className="flex items-center gap-3 mb-4 text-emerald-400">
                             <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
                             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Perimeter Secure</span>
                          </div>
                          <h4 className="text-2xl font-display font-black tracking-tight leading-tight italic">Multi-Factor Protocol</h4>
                          <p className="text-sm text-slate-400 mt-2 font-medium">Add an extra layer of biometric or token-based authorization to your admin session.</p>
                       </div>
                       <button className="px-10 py-5 bg-white text-slate-900 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                          Initialize Authenticator
                       </button>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <h4 className="text-xl font-display font-black text-slate-900 italic tracking-tight mb-6 ml-4">Credential Management</h4>
                    <div className="space-y-6">
                       <div className="p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:border-primary/20 transition-all group">
                          <div className="flex items-center justify-between mb-8">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                                   <Lock size={20} />
                                </div>
                                <p className="text-base font-black text-slate-900 tracking-tight italic">Change Master Password</p>
                             </div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Last Changed: 12 days ago</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <input type="password" placeholder="Current Secret" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-primary/40" />
                             <input type="password" placeholder="New Terminal Key" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-primary/40" />
                          </div>
                          <button className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all w-full md:w-auto">
                             Update Perimeter Access
                          </button>
                       </div>

                       <div className="p-10 bg-rose-50 border border-rose-100 rounded-[2.5rem] group">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm">
                                   <ShieldAlert size={20} />
                                </div>
                                <div>
                                   <p className="text-base font-black text-slate-900 tracking-tight italic">Emergency Lockdown</p>
                                   <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-0.5">Revoke all active sessions globally</p>
                                </div>
                             </div>
                             <button className="px-8 py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-rose-500/20">
                                Authorize Purge
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'integrations' && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { name: 'Cloudinary Assets', status: 'Optimal', icon: Cloud, key: 'cloud_name: "medsync_prd"', color: 'text-blue-500' },
                      { name: 'Google Maps Platform', status: 'Connected', icon: Globe, key: 'maps_id: "prd_482x9"', color: 'text-emerald-500' },
                      { name: 'E2E Encryption', status: 'AES-256', icon: Database, key: 'iv_vector: "sha512_link"', color: 'text-slate-900' },
                      { name: 'Stripe Gateway', status: 'Live', icon: CreditCard, key: 'pk_live_med_sync_...92k', color: 'text-indigo-500' }
                    ].map((api, i) => (
                      <div key={i} className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] hover:bg-white hover:border-primary/20 transition-all duration-300 group">
                         <div className="flex items-center justify-between mb-8">
                            <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${api.color} shadow-sm group-hover:scale-110 transition-transform`}>
                               <api.icon size={28} />
                            </div>
                            <span className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm" />
                               {api.status}
                            </span>
                         </div>
                         <h4 className="text-xl font-display font-black text-slate-900 tracking-tight italic">{api.name}</h4>
                         <div className="mt-4 px-4 py-3 bg-slate-100 rounded-xl border border-slate-200/50">
                            <code className="text-[10px] font-black text-slate-400 font-mono italic">{api.key}</code>
                         </div>
                         <div className="mt-8 flex justify-end">
                            <button className="text-[9px] font-black uppercase text-primary tracking-widest hover:underline">Rotate Secret Key</button>
                         </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-12 border-2 border-dashed border-slate-100 rounded-[3.5rem] text-center">
                     <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                        <Plus size={32} />
                     </div>
                     <h5 className="text-xl font-display font-black text-slate-900 mb-2">Connect New Provider</h5>
                     <p className="text-xs font-semibold text-slate-400 max-w-xs mx-auto mb-8">Synchronize additional cloud infrastructure or medical API providers.</p>
                     <button className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-slate-900/10">
                        Access Integration Library
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                 <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">All changes staged for current session</span>
              </div>
              <button className="px-12 py-5 bg-primary text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Synchronize Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard = ({ activeTab, onAction, profile, onImpersonate }: { activeTab: string, onAction: (title: string, message: string) => void, profile: any, onImpersonate: (role: string, email: string, name?: string) => void }) => {
  const [isAuthorized, setIsAuthorized] = React.useState(() => {
    return sessionStorage.getItem('admin_authorized') === 'true';
  });

  if (!isAuthorized) {
    return (
      <AdminPasswordGate 
        onAuthorized={() => {
          sessionStorage.setItem('admin_authorized', 'true');
          setIsAuthorized(true);
        }} 
      />
    );
  }

  return (
    <div className="p-4 sm:p-8 lg:p-12 pb-24">
       {(activeTab === 'stats' || activeTab === 'home') && <DashboardHome />}
       {activeTab === 'doctors' && <DoctorsManagementView onImpersonate={onImpersonate} />}
       {activeTab === 'users' && <UsersManagementView onImpersonate={onImpersonate} />}
       {activeTab === 'appointments' && <AppointmentsManagementView />}
       {activeTab === 'cms' && <CMSManagementView />}
       {activeTab === 'notifications' && <NotificationsManagementView onAction={onAction} />}
       {activeTab === 'settings' && <SettingsManagementView profile={profile} />}
    </div>
  );
};

