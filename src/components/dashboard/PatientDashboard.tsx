import React from 'react';
import { toast } from 'sonner';
import { getSocket } from '../../services/socketService';
import { ChatWindow } from '../common/ChatWindow';
import { syncAppointmentsRealtime, syncMedicationsRealtime } from '../../services/firebase';
import { FileUploader } from '../common/FileUploader';
import { 
  Calendar, 
  Activity, 
  LayoutDashboard, 
  User, 
  ChevronRight, 
  FileText, 
  Clock, 
  MessageSquare, 
  HeartPulse,
  Weight,
  Thermometer,
  ArrowUpRight,
  Plus,
  Bell,
  Pill,
  FileSearch,
  CheckCircle2,
  Upload,
  Download,
  CreditCard,
  Wallet,
  History,
  Trash2,
  Search,
  X
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend, trendColor = 'text-green-500' }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all duration-500">
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-display font-black text-slate-900">{value}</h3>
      {trend && (
         <p className={`mt-2 flex items-center gap-1 text-[10px] font-black ${trendColor} uppercase tracking-tight`}>
            <ArrowUpRight size={10} /> {trend}
         </p>
      )}
    </div>
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon size={28} />
    </div>
  </div>
);

const AppointmentCard = ({ doc, spec, date, time, status }: any) => (
  <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all cursor-pointer group">
    <div className="flex items-center gap-5">
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-50">
        <User size={24} />
      </div>
      <div>
        <p className="text-sm font-black text-slate-900 tracking-tight">{doc}</p>
        <p className="text-xs font-semibold text-slate-400">{spec} • {date} at {time}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
        status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
      }`}>{status}</span>
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors border border-slate-100 shadow-sm">
        <ChevronRight size={18} />
      </div>
    </div>
  </div>
);

const QuickAction = ({ title, icon: Icon, color, onClick }: any) => (
  <button onClick={onClick} className="w-full flex flex-col items-center justify-center p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
      <Icon size={20} />
    </div>
    <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">{title}</span>
  </button>
);

const NotificationItem = ({ title, time, type }: any) => {
  const icons: any = {
    appointment: { icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    report: { icon: FileSearch, color: 'bg-purple-100 text-purple-600' },
    medication: { icon: Pill, color: 'bg-orange-100 text-orange-600' },
    success: { icon: CheckCircle2, color: 'bg-green-100 text-green-600' },
  };
  const { icon: Icon, color } = icons[type] || icons.success;

  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center shrink-0`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-900 line-clamp-1">{title}</p>
        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
};

const DashboardHome = () => (
  <div className="space-y-12">
    {/* Top Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard title="Upcoming Visits" value="2" icon={Calendar} color="bg-blue-600" trend="Next: May 18" />
      <StatCard title="Total Bookings" value="24" icon={CheckCircle2} color="bg-primary" trend="+12% this month" />
      <StatCard title="Health Score" value="94%" icon={Activity} color="bg-green-600" trend="+2% from last check" />
      <StatCard title="Medical Reports" value="12" icon={FileText} color="bg-purple-600" trend="2 new" />
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Appointments & Quick Actions */}
      <div className="xl:col-span-2 space-y-8">
        {/* Appointments Section */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">Active Appointments</h3>
              <p className="text-xs font-semibold text-slate-400 mt-1">You have 2 appointments scheduled for this week.</p>
            </div>
            <button className="text-xs font-black uppercase text-primary tracking-widest hover:underline">View Schedule</button>
          </div>
          <div className="space-y-4">
            <AppointmentCard doc="Dr. Michael Chen" spec="Cardiology" date="May 18, 2026" time="10:00 AM" status="Confirmed" />
            <AppointmentCard doc="Dr. Sarah Jenkins" spec="General Medicine" date="June 02, 2026" time="02:30 PM" status="Pending" />
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
          <h3 className="text-xl font-display font-black text-slate-900 mb-8 tracking-tight">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <QuickAction title="Book Now" icon={Plus} color="bg-primary" />
            <QuickAction title="Tele-Health" icon={Activity} color="bg-blue-600" />
            <QuickAction title="Refill RX" icon={Pill} color="bg-orange-500" />
            <QuickAction title="My Reports" icon={FileSearch} color="bg-purple-600" />
          </div>
        </div>
      </div>

      {/* Notifications & Emergency */}
      <div className="space-y-8">
        {/* Notifications Widget */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">Notifications</h3>
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <Bell size={18} />
            </button>
          </div>
          <div className="space-y-2">
            <NotificationItem title="Appointment Confirmed" time="2 hours ago" type="appointment" />
            <NotificationItem title="New Lab Result Available" time="5 hours ago" type="report" />
            <NotificationItem title="Refill Reminder: Vitamin D" time="Yesterday" type="medication" />
            <NotificationItem title="Security: Password Changed" time="2 days ago" type="success" />
          </div>
          <button className="w-full mt-6 py-4 rounded-xl text-[10px] font-black uppercase text-slate-400 tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all border border-dashed border-slate-200">
            View All Activity
          </button>
        </div>

        {/* Emergency Card */}
        <div className="bg-primary text-white p-10 rounded-[3rem] shadow-xl shadow-primary/20 flex flex-col justify-between h-auto min-h-[300px]">
          <div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
               <HeartPulse size={24} className="text-white" />
            </div>
            <h4 className="text-2xl font-display font-black mb-4 tracking-tight">Emergency <br />Consultation</h4>
            <p className="text-white/60 text-sm font-medium leading-relaxed mb-8">
              Fast-track your connection to an available doctor in under 60 seconds.
            </p>
          </div>
          <button className="w-full bg-white text-primary py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-transform active:scale-95">
            Start Live Call
          </button>
        </div>
      </div>
    </div>
  </div>
);

const HealthProfile = () => (
  <div className="space-y-12">
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Weight', value: '72kg', sub: 'Normal', icon: Weight, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Blood Pressure', value: '120/80', sub: 'Healthy', icon: Activity, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Body Temp', value: '36.6°C', sub: 'Stable', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Heart Rate', value: '72bpm', sub: 'Resting', icon: HeartPulse, color: 'text-red-500', bg: 'bg-red-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
             <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                <item.icon size={24} />
             </div>
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{item.label}</p>
             <h4 className="text-2xl font-display font-black text-slate-900">{item.value}</h4>
             <span className="mt-2 text-[10px] font-black uppercase text-green-500 tracking-widest">{item.sub}</span>
          </div>
        ))}
     </div>

     <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <h3 className="text-2xl font-display font-black text-slate-900 mb-10 tracking-tight">Medical History</h3>
        <div className="space-y-0 text-sm">
           {[
             { year: '2026', title: 'Cardiology Follow-up', desc: 'Routine heart checkup with Dr. Chen. Status: Healthy', color: 'bg-blue-500' },
             { year: '2025', title: 'General Physical Exam', desc: 'Full body checkup. No significant findings.', color: 'bg-slate-200' },
             { year: '2024', title: 'Dental Surgery', desc: 'Wisdom tooth extraction. Recovered fully.', color: 'bg-slate-200' },
           ].map((item, i) => (
             <div key={i} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                   <div className={`w-4 h-4 rounded-full ${item.color} border-4 border-white shadow-sm z-10`} />
                   {i !== 2 && <div className="w-0.5 flex-1 bg-slate-100 -mt-1 mb-1" />}
                </div>
                <div className="pb-12">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{item.year}</span>
                   <h4 className="text-lg font-display font-black text-slate-900 mb-2">{item.title}</h4>
                   <p className="text-slate-500 font-medium leading-relaxed max-w-xl">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
     </div>
  </div>
);

const AppointmentsView = ({ profile }: { profile: any }) => {
  const [activeFilter, setActiveFilter] = React.useState('All');
  
  const [appointments, setAppointments] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!profile?.email) return;

    // Utilize our Firestore helper to establish an active, real-time sync subscription
    const unsubscribe = syncAppointmentsRealtime({ userId: profile.email }, (liveApts) => {
      const APPOINTMENTS_KEY = 'medsync_appointments';
      const stored = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
      const userAptsLocal = stored.filter((a: any) => a.userId === profile.email);

      // Consolidate data, ensuring we always prioritize newly updated Firestore appointments
      const mergedMap = new Map();

      // Start with beautiful local placeholder data so the screen is never blank
      const defaults = [
        { id: 'd1', doc: 'Dr. Michael Chen', spec: 'Cardiology', date: 'May 18, 2026', time: '10:00 AM', status: 'Approved', price: '$120.00', userId: profile.email },
        { id: 'd2', doc: 'Dr. Sarah Jenkins', spec: 'General Medicine', date: 'June 02, 2026', time: '02:30 PM', status: 'Pending', price: '$80.00', userId: profile.email },
      ];

      defaults.forEach(a => mergedMap.set(a.id, a));
      userAptsLocal.forEach(a => mergedMap.set(a.id, a));
      liveApts.forEach(a => mergedMap.set(a.id, a));

      setAppointments(Array.from(mergedMap.values()));
    });

    return () => unsubscribe();
  }, [profile.email]);

  const filteredAppointments = activeFilter === 'All' 
    ? appointments 
    : appointments.filter(a => a.status === activeFilter);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-600 border-green-200';
      case 'Pending': return 'bg-amber-100 text-amber-600 border-amber-200';
      case 'Completed': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">My Appointments</h2>
          <p className="text-sm font-semibold text-slate-400 mt-1">Manage your healthcare schedule and medical history.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          {['All', 'Approved', 'Pending', 'Completed'].map((filter) => (
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
          <div key={apt.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:border-primary/20 transition-all duration-500">
            <div className="flex items-center gap-6">
              <div className="relative group-hover:scale-105 transition-transform duration-500">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-primary overflow-hidden">
                  <User size={32} />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-xl border-4 border-white flex items-center justify-center text-white text-[10px] shadow-sm ${
                  apt.status === 'Approved' ? 'bg-green-500' : apt.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-400'
                }`}>
                   {apt.status === 'Approved' ? <CheckCircle2 size={12} /> : apt.status === 'Pending' ? <Clock size={12} /> : <FileText size={12} />}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-xl font-display font-black text-slate-900 group-hover:text-primary transition-colors">{apt.doc}</h4>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{apt.spec}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} className="text-primary" />
                    <span className="text-xs font-bold">{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={14} className="text-primary" />
                    <span className="text-xs font-bold">{apt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText size={14} className="text-primary" />
                    <span className="text-xs font-bold">{apt.price}</span>
                  </div>
                </div>

                {/* Display clinician notes and prescription files from the database in raw real-time */}
                {(apt.notes || apt.prescriptionUrl) && (
                  <div className="mt-6 p-6 rounded-[2rem] bg-indigo-50/40 border border-indigo-100/50 text-left space-y-3 max-w-xl animate-in fade-in duration-300">
                    {apt.notes && (
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase text-indigo-500 tracking-widest font-mono">Clinician Advice & Notes</span>
                        <p className="text-xs font-bold text-slate-700 leading-relaxed bg-white/50 p-4 rounded-xl border border-indigo-100/20">{apt.notes}</p>
                      </div>
                    )}
                    {apt.prescriptionUrl && (
                      <div className="pt-2 flex items-center justify-between gap-4 border-t border-indigo-100/20">
                        <div className="flex items-center gap-2 text-indigo-600">
                          <Pill size={14} />
                          <span className="text-[10px] font-black uppercase tracking-wider font-sans">Signed Digital Prescription Active</span>
                        </div>
                        <a 
                          href={apt.prescriptionUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          referrerPolicy="no-referrer"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 inline-flex items-center gap-2"
                        >
                          View rx
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {apt.status !== 'Completed' && (
                <>
                  <button className="flex-1 lg:flex-none px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-600 hover:bg-primary hover:text-white transition-all">
                    Reschedule
                  </button>
                  <button className="flex-1 lg:flex-none px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    Cancel
                  </button>
                </>
              )}
              {apt.status === 'Approved' && (
                <button 
                  onClick={() => toast.success('Invoice Generated', { description: `Invoice for ${apt.doc} has been downloaded to your local storage.` })}
                  className="flex-1 lg:flex-none px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                   <FileText size={14} /> Get Invoice
                </button>
              )}
              <button className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-primary transition-all group-hover:border-primary/20">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold">No {activeFilter.toLowerCase()} appointments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ReportsView = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  
  const [reports, setReports] = React.useState([
    { id: '1', title: 'Cardiology Report.pdf', category: 'Lab Results', date: 'May 12, 2026', size: '2.4 MB', doctor: 'Dr. Michael Chen' },
    { id: '2', title: 'Blood Work - Complete.pdf', category: 'Prescriptions', date: 'May 05, 2026', size: '1.1 MB', doctor: 'Dr. Sarah Jenkins' },
    { id: '3', title: 'MRI Scan - Lumbar.png', category: 'Scans', date: 'April 28, 2026', size: '15.8 MB', doctor: 'Dr. Emily Blunt' },
    { id: '4', title: 'Annual Vaccination.pdf', category: 'Certificates', date: 'March 15, 2026', size: '0.8 MB', doctor: 'General Medicine' },
  ]);

  const handleUploadSuccess = (url: string) => {
    const newReport = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Newly Uploaded Report',
      category: activeCategory === 'All' ? 'Lab Results' : activeCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      size: 'Auto',
      doctor: 'Me (Uploaded)'
    };
    setReports([newReport, ...reports]);
    setShowUploadModal(false);
  };

  const filteredReports = activeCategory === 'All' 
    ? reports 
    : reports.filter(r => r.category === activeCategory);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">Medical Reports</h2>
          <p className="text-sm font-semibold text-slate-400 mt-1">Access and manage all your medical documentation safely.</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-105 transition-all"
        >
          <Upload size={16} /> Upload New Report
        </button>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white rounded-[3.5rem] w-full max-w-xl p-12 shadow-2xl relative">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="text-3xl font-display font-black text-slate-900 mb-8 tracking-tight italic">Secure File Ingress</h3>
              <FileUploader 
                label="Scan or Report" 
                onUploadSuccess={handleUploadSuccess} 
              />
              <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed text-center">
                 Files are encrypted and stored in HIPAA compliant bunkers. <br />Maximum individual file size: 10MB.
              </p>
           </div>
        </div>
      )}

      <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
        {['All', 'Lab Results', 'Prescriptions', 'Scans', 'Certificates'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeCategory === cat 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-primary/20 transition-all duration-500 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-all">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="text-lg font-display font-black text-slate-900 mb-1 leading-tight group-hover:text-primary transition-colors">{report.title}</h4>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{report.category} • {report.size}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[10px] font-bold text-slate-500">By {report.doctor}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span className="text-[10px] font-bold text-slate-400">{report.date}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-10 h-10 bg-slate-50 text-slate-400 hover:bg-primary hover:text-white rounded-xl flex items-center justify-center transition-all">
                <Download size={18} />
              </button>
              <button className="w-10 h-10 bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
              <Plus size={28} className="text-primary" />
            </div>
            <h3 className="text-3xl font-display font-black mb-4 tracking-tight leading-tight">Your health data is <span className="text-primary italic">end-to-end</span> encrypted.</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              MediCare Pro uses hospital-grade security protocols to ensure your medical history and reports remain private and accessible only to you and authorized clinical staff.
            </p>
          </div>
          <button className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-2xl shadow-white/10">
            View Security Logs
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentsView = ({ profile }: { profile: any }) => {
  const [transactions, setTransactions] = React.useState<any[]>([]);

  React.useEffect(() => {
    const APPOINTMENTS_KEY = 'medsync_appointments';
    const stored = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
    const userAptsLocal = stored.filter((a: any) => a.userId === profile.email && a.paymentId);

    const formatTxs = (apts: any[]) => {
      const paymentTxs = apts.map((a: any) => ({
        id: `TX-${(a.paymentId || 'TX001').slice(-6).toUpperCase()}`,
        service: `${a.spec} Consultation`,
        amount: a.price,
        date: a.date,
        method: 'Stripe •••• 4242',
        status: 'Success'
      }));

      const defaults = [
        { id: 'TX-1002', service: 'MRI Scan - Full Body', amount: '$450.00', date: 'May 10, 2026', method: 'Stripe', status: 'Success' },
        { id: 'TX-1004', service: 'GP Visit - Routine', amount: '$80.00', date: 'April 25, 2026', method: 'Stripe', status: 'Refunded' },
      ];

      setTransactions([...paymentTxs, ...defaults]);
    };

    fetch(`/api/appointments?userId=${profile.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          formatTxs(data.filter((a: any) => a.paymentId));
        } else {
          formatTxs(userAptsLocal);
        }
      })
      .catch(() => {
        formatTxs(userAptsLocal);
      });
  }, [profile.email]);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">Billing & Payments</h2>
              <p className="text-sm font-semibold text-slate-400 mt-1">Manage your health expenses and invoices.</p>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">Recent Transactions</h3>
              <button className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2 hover:underline">
                 <History size={14} /> Full History
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Transaction ID</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Service</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-10 py-6 font-mono text-[10px] text-slate-400">{tx.id}</td>
                      <td className="px-10 py-6">
                         <p className="text-sm font-bold text-slate-900 mb-1">{tx.service}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">{tx.method} • {tx.status}</p>
                      </td>
                      <td className="px-10 py-6 text-xs font-bold text-slate-500">{tx.date}</td>
                      <td className="px-10 py-6 text-right">
                         <span className="text-sm font-black text-slate-900">{tx.amount}</span>
                         <button className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:scale-110">
                            <Download size={14} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-900/20">
              <div className="flex items-center justify-between mb-8">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Wallet size={24} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Active Balance</span>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Med-Credits</p>
              <h3 className="text-5xl font-display font-black tracking-tight mb-8">$2,450.00</h3>
              <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-all shadow-xl shadow-primary/20">
                 Top Up Credits
              </button>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-display font-black text-slate-900 mb-6 tracking-tight">Saved Methods</h3>
              <div className="space-y-4">
                 <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary/20">
                    <div className="flex items-center gap-4">
                       <CreditCard size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                       <span className="text-sm font-bold text-slate-900 tracking-tight">Visa •••• 4242</span>
                    </div>
                    <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center">
                       <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                    </div>
                 </div>
                 <div className="p-5 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                       <Plus size={20} className="text-slate-400" />
                       <span className="text-sm font-bold text-slate-400 tracking-tight">Add New Method</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const MessagesView = ({ profile }: { profile: any }) => {
  const [conversations, setConversations] = React.useState<any[]>([]);
  const [selectedRecipient, setSelectedRecipient] = React.useState<any | null>(null);

  React.useEffect(() => {
    const APPOINTMENTS_KEY = 'medsync_appointments';
    const stored = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
    const userAptsLocal = stored.filter((a: any) => a.userId === profile.email);

    // Fetch doctors list first to accurately map bookings to emails
    fetch('/api/doctors')
      .then(res => res.json())
      .then(doctorsList => {
        const getDocEmailByName = (docName?: string) => {
          if (!docName) return 'michael@medicare.com';
          const cleanName = docName.toLowerCase().replace('dr. ', '').trim();
          const found = doctorsList.find((d: any) => 
            d.name && (d.name.toLowerCase().includes(cleanName) || 
            cleanName.includes(d.name.toLowerCase().replace('dr. ', '').trim()))
          );
          if (found) return found.email;
          
          if (docName.toLowerCase().includes('sarah')) return 'sarah@medicare.com';
          if (docName.toLowerCase().includes('robert')) return 'robert@medicare.com';
          if (docName.toLowerCase().includes('amanda')) return 'amanda@medicare.com';
          return 'michael@medicare.com';
        };

        const setupDocs = (userApts: any[]) => {
          const computedDocs = userApts.map((a: any) => {
            const email = a.docEmail || getDocEmailByName(a.doc);
            return {
              email,
              name: a.doc || 'Dr. Michael Chen',
              spec: a.spec || 'General Specialist'
            };
          });

          // Unique array of conversing doctors
          const uniqueDocsMap = new Map();
          computedDocs.forEach(d => {
            if (!uniqueDocsMap.has(d.email)) {
              uniqueDocsMap.set(d.email, d);
            }
          });

          const docs = Array.from(uniqueDocsMap.values());
          setConversations(docs);
          if (docs.length > 0) setSelectedRecipient(docs[0]);
        };

        fetch(`/api/appointments?userId=${profile.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && Array.isArray(data) && data.length > 0) {
              setupDocs(data);
            } else {
              setupDocs(userAptsLocal);
            }
          })
          .catch(() => setupDocs(userAptsLocal));
      })
      .catch(() => {
        const setupDocsFallback = (userApts: any[]) => {
          const uniqueDocsMap = new Map();
          userApts.forEach((a: any) => {
            let email = 'michael@medicare.com';
            const docName = a.doc || '';
            if (docName.toLowerCase().includes('sarah')) email = 'sarah@medicare.com';
            else if (docName.toLowerCase().includes('robert')) email = 'robert@medicare.com';
            else if (docName.toLowerCase().includes('amanda')) email = 'amanda@medicare.com';
            
            uniqueDocsMap.set(email, {
              email,
              name: a.doc || 'Dr. Michael Chen',
              spec: a.spec || 'General Specialist'
            });
          });
          const docs = Array.from(uniqueDocsMap.values());
          setConversations(docs);
          if (docs.length > 0) setSelectedRecipient(docs[0]);
        };
        setupDocsFallback(userAptsLocal);
      });
  }, [profile.email]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">Messages</h2>
          <p className="text-sm font-semibold text-slate-400 mt-1">Connect with your clinical team.</p>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search conversations..."
                className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
            {conversations.map((doc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRecipient(doc)}
                className={`w-full p-6 text-left flex items-center gap-4 transition-all ${
                  selectedRecipient?.email === doc.email ? 'bg-slate-50' : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <User size={20} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-black text-slate-900 tracking-tight truncate">{doc.name}</p>
                    <span className="text-[9px] font-black text-slate-300 uppercase">12:45 PM</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{doc.spec}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <ChatWindow 
          currentUser={profile} 
          recipient={selectedRecipient} 
        />
      </div>
    </div>
  );
};

export const PatientDashboard = ({ activeTab, profile, onTabChange, onFindDoctors }: { activeTab: string, profile: any, onTabChange?: (tab: string) => void, onFindDoctors?: () => void }) => {
  const [activeModal, setActiveModal] = React.useState<string | null>(null);
  const [medications, setMedications] = React.useState([
    { id: '1', name: 'Vitamin D3 (Cholecalciferol)', dosage: '50,000 IU Capsule', refills: 3, doctor: 'Dr. Sarah Jenkins', status: 'Active' },
    { id: '2', name: 'Metformin Hydrochloride', dosage: '500mg Tablet', refills: 1, doctor: 'Dr. Michael Chen', status: 'Active' },
    { id: '3', name: 'Lisinopril', dosage: '10mg Oral Syrup', refills: 0, doctor: 'Dr. Sarah Jenkins', status: 'Needs Renewal' },
  ]);

  // Sync real-time prescriptions from firestore
  React.useEffect(() => {
    if (!profile?.email) return;
    const unsubscribe = syncMedicationsRealtime(profile.email, (liveMeds) => {
      if (liveMeds && liveMeds.length > 0) {
        setMedications(prev => {
          const defaults = [
            { id: '1', name: 'Vitamin D3 (Cholecalciferol)', dosage: '50,000 IU Capsule', refills: 3, doctor: 'Dr. Sarah Jenkins', status: 'Active' },
            { id: '2', name: 'Metformin Hydrochloride', dosage: '500mg Tablet', refills: 1, doctor: 'Dr. Michael Chen', status: 'Active' },
            { id: '3', name: 'Lisinopril', dosage: '10mg Oral Syrup', refills: 0, doctor: 'Dr. Sarah Jenkins', status: 'Needs Renewal' },
          ];
          // Filter default prescriptions with similar name
          const defaultFiltered = defaults.filter(d => !liveMeds.some(lm => lm.name.toLowerCase() === d.name.toLowerCase()));
          return [...liveMeds, ...defaultFiltered];
        });
      }
    });

    return () => unsubscribe();
  }, [profile?.email]);
  const [isCalling, setIsCalling] = React.useState(false);
  const [callTimer, setCallTimer] = React.useState(0);
  const [callStatus, setCallStatus] = React.useState('Connecting...');

  React.useEffect(() => {
    let timer: any;
    if (activeModal === 'telehealth' || activeModal === 'emergency') {
      setIsCalling(true);
      setCallTimer(0);
      setCallStatus('Connecting with available triage doctor...');
      
      const statusChanges = [
        { time: 3, status: 'Ringing clinician...' },
        { time: 6, status: 'Connected! Patient Record transmitted.' },
        { time: 9, status: 'Dr. Michael Chen is joining the session...' },
        { time: 11, status: 'Live consultation active • 1080p HD Secure Stream' },
      ];

      timer = setInterval(() => {
        setCallTimer(prev => {
          const nextVal = prev + 1;
          const statusUpdate = statusChanges.find(s => s.time === nextVal);
          if (statusUpdate) {
            setCallStatus(statusUpdate.status);
          }
          return nextVal;
        });
      }, 1000);
    } else {
      setIsCalling(false);
      setCallTimer(0);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeModal]);

  React.useEffect(() => {
    const socket = getSocket(profile.email);
    
    socket.on('notification:new', (notif: any) => {
      toast.info(notif.message, {
        description: `Source: Clinic Platform`,
        duration: 5000,
      });
    });

    return () => {
      socket.off('notification:new');
    };
  }, [profile.email]);

  return (
    <div className="p-4 sm:p-8 lg:p-12">
       {activeTab === 'home' && (

         <div className="space-y-12">
           {/* Gorgeous greeting banner matching mockup 1 & 2 */}
           <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E5597] bg-gradient-to-r from-[#2A5193] via-[#3561AA] to-[#4071C0] p-8 md:p-12 text-white shadow-xl shadow-blue-900/10 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/15 group animate-in fade-in slide-in-from-y-4 duration-500">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
             <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/20 rounded-full blur-3xl pointer-events-none" />
             
             <div className="space-y-3 z-10 text-left">
               <span className="inline-block px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/15 text-white/90 font-mono border border-white/5">
                 Clinical Portal Active
               </span>
               <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white leading-none">
                 Good Day, {profile?.name || 'Patient'}!
               </h2>
               <p className="text-xs md:text-sm font-semibold text-blue-50/80 leading-relaxed max-w-md">
                 Secure connection is live. Your medical logs are encrypted under compliant shields. Schedule new bookings or consult clinicians of choice below.
               </p>
             </div>

             <div className="shrink-0 z-10 flex items-center justify-center p-4 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm shadow-inner group-hover:scale-105 transition-all duration-500">
               <div className="flex flex-col items-center text-center gap-1.5 px-4">
                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#2A5193] shadow-lg shadow-black/10">
                   <HeartPulse size={24} className="animate-pulse" />
                 </div>
                 <span className="text-[10px] font-black uppercase text-white/90 tracking-widest block mt-2">HealSync OS</span>
                 <span className="text-[9px] font-bold text-blue-100 uppercase block tracking-wider">v2.4.1 Secure</span>
               </div>
             </div>
           </div>

           {/* Top Stats */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <StatCard title="Upcoming Visits" value="2" icon={Calendar} color="bg-blue-600" trend="Next: May 18" />
             <StatCard title="Total Bookings" value="24" icon={CheckCircle2} color="bg-primary" trend="+12% this month" />
             <StatCard title="Health Score" value="94%" icon={Activity} color="bg-green-600" trend="+2% from last check" />
             <StatCard title="Medical Reports" value="12" icon={FileText} color="bg-purple-600" trend="2 new" />
           </div>

           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
             {/* Appointments & Quick Actions */}
             <div className="xl:col-span-2 space-y-8">
               {/* Appointments Section */}
               <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                 <div className="flex items-center justify-between mb-10">
                   <div>
                     <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">Active Appointments</h3>
                     <p className="text-xs font-semibold text-slate-400 mt-1">You have 2 appointments scheduled for this week.</p>
                   </div>
                   <button className="text-xs font-black uppercase text-primary tracking-widest hover:underline">View Schedule</button>
                 </div>
                 <div className="space-y-4">
                   <AppointmentCard doc="Dr. Michael Chen" spec="Cardiology" date="May 18, 2026" time="10:00 AM" status="Confirmed" />
                   <AppointmentCard doc="Dr. Sarah Jenkins" spec="General Medicine" date="June 02, 2026" time="02:30 PM" status="Pending" />
                 </div>
               </div>

               {/* Quick Actions Grid */}
               <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                 <h3 className="text-xl font-display font-black text-slate-900 mb-8 tracking-tight">Quick Actions</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                   <QuickAction 
                     title="Book Now" 
                     icon={Plus} 
                     color="bg-primary" 
                     onClick={() => {
                       if (onFindDoctors) {
                         onFindDoctors();
                       } else if (onTabChange) {
                         onTabChange('appointments');
                       }
                     }}
                   />
                   <QuickAction 
                     title="Tele-Health" 
                     icon={Activity} 
                     color="bg-blue-600" 
                     onClick={() => setActiveModal('telehealth')}
                   />
                   <QuickAction 
                     title="Refill RX" 
                     icon={Pill} 
                     color="bg-orange-500" 
                     onClick={() => setActiveModal('refill')}
                   />
                   <QuickAction 
                     title="My Reports" 
                     icon={FileSearch} 
                     color="bg-purple-600" 
                     onClick={() => onTabChange && onTabChange('reports')}
                   />
                 </div>
               </div>
             </div>

             {/* Notifications & Emergency */}
             <div className="space-y-8">
               {/* Notifications Widget */}
               <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">Recent Alerts</h3>
                   <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                     <Bell size={18} />
                   </button>
                 </div>
                 <div className="space-y-2">
                   <NotificationItem title="Appointment Confirmed" time="2 hours ago" type="appointment" />
                   <NotificationItem title="New Lab Result Available" time="5 hours ago" type="report" />
                   <NotificationItem title="Refill Reminder" time="Yesterday" type="medication" />
                 </div>
                 <button className="w-full mt-6 py-4 rounded-xl text-[10px] font-black uppercase text-slate-400 tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all border border-dashed border-slate-200">
                   View All Activity
                 </button>
               </div>

               {/* Emergency Card */}
               <div className="bg-primary text-white p-10 rounded-[3rem] shadow-xl shadow-primary/20 flex flex-col justify-between h-auto min-h-[300px]">
                 <div>
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                      <HeartPulse size={24} className="text-white" />
                   </div>
                   <h4 className="text-2xl font-display font-black mb-4 tracking-tight">Emergency <br />Consultation</h4>
                   <p className="text-white/60 text-sm font-medium leading-relaxed mb-8">
                     Fast-track your connection to an available doctor in under 60 seconds.
                   </p>
                 </div>
                 <button onClick={() => setActiveModal('emergency')} className="w-full bg-white text-primary py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-transform active:scale-95">
                   Start Live Call
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}
       {activeTab === 'health' && <HealthProfile />}
       {activeTab === 'appointments' && <AppointmentsView profile={profile} />}
       {activeTab === 'messages' && <MessagesView profile={profile} />}
       {activeTab === 'reports' && <ReportsView />}
       {activeTab === 'billing' && <PaymentsView profile={profile} />}
       {activeTab === 'settings' && (
         <div className="bg-white p-20 rounded-[4rem] text-center border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
               <LayoutDashboard size={40} />
            </div>
            <h3 className="text-3xl font-display font-black text-slate-900 mb-4 uppercase tracking-tighter italic">Coming Soon</h3>
            <p className="text-slate-400 font-medium max-w-sm mx-auto">We are currently fine-tuning this section to provide the best healthcare experience.</p>
          </div>
        )}

        {/* Refill RX Modal */}
        {activeModal === 'refill' && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-[3.5rem] w-full max-w-2xl p-12 shadow-2xl relative border border-slate-100 overflow-hidden text-left text-slate-900">
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                id="close-refill-modal-btn"
              >
                <X size={18} />
              </button>
              <div className="mb-8">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                  <Pill size={28} />
                </div>
                <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight">Prescription Refills</h3>
                <p className="text-sm font-semibold text-slate-400 mt-1">Select an active prescription to instantly authorize a pharmacy refill.</p>
              </div>
              
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {medications.map((med) => (
                  <div key={med.id} className="p-6 rounded-3xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-6 hover:border-orange-200 transition-all font-sans">
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm shrink-0 mt-1">
                        <Pill size={18} />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900 leading-tight">{med.name}</h4>
                        <p className="text-xs font-semibold text-slate-400 mt-0.5">{med.dosage}</p>
                        <p className="text-xs font-semibold text-slate-400 mt-1">Prescribed by: <span className="text-slate-600 font-bold">{med.doctor}</span></p>
                      </div>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border mb-3 ${
                        med.refills > 0 ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-red-50 text-red-500 border-red-100'
                      }`}>
                        {med.refills} refills left
                      </span>
                      <button
                        disabled={med.refills === 0}
                        id={`refill-med-btn-${med.id}`}
                        onClick={() => {
                          const originalTxt = 'Processing authorization for refill...';
                          toast.info(originalTxt, { id: med.id });
                          setTimeout(() => {
                            setMedications(prev => 
                              prev.map(m => m.id === med.id ? { ...m, refills: m.refills - 1 } : m)
                            );
                            toast.success('Refill Authorized', { 
                              id: med.id, 
                              description: `${med.name} refill sent to pharmacy.` 
                            });
                          }, 1500);
                        }}
                        className={`block w-full px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                          med.refills > 0 
                            ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20 hover:scale-105' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Refill Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all"
                  id="close-refill-modal-footer-btn"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Telehealth & Emergency Call Simulator Modal */}
        {(activeModal === 'telehealth' || activeModal === 'emergency') && (
          <div className="fixed inset-0 bg-slate-950/95 z-[110] flex flex-col p-8 md:p-12 animate-in fade-in duration-300 text-white font-sans">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-red-400/10 text-red-400 rounded-2xl flex items-center justify-center animate-pulse shrink-0">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black tracking-tight flex items-center gap-3">
                    {activeModal === 'emergency' ? 'Emergency Command Line' : 'Secure Telehealth Portal'}
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest bg-emerald-500 text-white animate-pulse font-mono">
                      Live
                    </span>
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">{callStatus}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 shrink-0">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-xs font-mono font-bold">
                  {Math.floor(callTimer / 60)}:{(callTimer % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            
            {/* Main Video Arena */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0 min-w-0">
              {/* Main Video Feed (Doctor) */}
              <div className="lg:col-span-2 relative bg-slate-900 rounded-[2.5rem] border border-white/5 overflow-hidden group shadow-2xl flex items-center justify-center">
                {callTimer < 9 ? (
                  <div className="text-center p-8 max-w-sm">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 animate-spin">
                      <Activity size={24} className="text-primary" />
                    </div>
                    <h4 className="text-lg font-display font-black tracking-tight">Establishing Connection</h4>
                    <p className="text-xs font-semibold text-slate-400 mt-2 leading-relaxed">Routing request through the secure triage network to locate the nearest cardiac/general consult physician.</p>
                  </div>
                ) : (
                  <>
                    <img 
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&fit=crop" 
                      alt="Doctor Feed" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black tracking-wide border border-white/10 font-mono">
                      Dr. Michael Chen (Clinician Feed)
                    </div>
                    {/* Subtle video stream overlays */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-2">
                      <span className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">1080P HD</span>
                      <span className="bg-white/10 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg backdrop-blur-sm">Secure Peer-to-Peer</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Side Column: Self Feed & Diagnostics */}
              <div className="space-y-8 flex flex-col min-h-0 min-w-0">
                {/* Self Video View */}
                <div className="h-48 relative bg-slate-900 rounded-[2rem] border border-white/5 overflow-hidden shrink-0 shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&fit=crop" 
                    alt="Self Feed" 
                    className="w-full h-full object-cover filter brightness-95" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wide border border-white/5 font-mono font-semibold">
                    You (Patient Feed)
                  </div>
                </div>
                
                {/* Audio/Video Wave Visualizer */}
                <div className="flex-1 bg-white/5 rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between min-h-0">
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wider text-slate-405 mb-6 font-mono text-left">Stream Diagnostic Wave</h4>
                    <div className="flex items-end justify-center gap-1.5 h-32 mb-6">
                      {[30, 45, 20, 80, 50, 90, 65, 30, 85, 40, 60, 25, 75, 52, 35, 90, 48, 20, 60, 40].map((h, i) => (
                        <div 
                          key={i} 
                          style={{ height: `${callTimer < 2 ? 4 : (h * (0.8 + Math.sin(callTimer + i) * 0.2))}%` }} 
                          className={`w-1.5 rounded-full transition-all duration-300 ${isCalling ? 'bg-primary animate-pulse' : 'bg-white/10'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-left font-mono">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                      <span>Latency</span>
                      <span className="text-emerald-400 font-bold">14ms (Optimal)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                      <span>Signal Strength</span>
                      <span className="text-emerald-400 font-bold">Excellent</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Encryption</span>
                      <span className="text-slate-200">256-Bit TLS v1.3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Controls Bar */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button 
                className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105"
                id="mic-mute-btn"
                onClick={() => toast.info('Microphone settings adjusted')}
              >
                <Activity size={24} />
              </button>
              <button 
                className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105"
                id="camera-mute-btn"
                onClick={() => toast.info('Camera output minimized')}
              >
                <Bell size={24} />
              </button>
              <button 
                onClick={() => {
                  setActiveModal(null);
                  toast.success('Consultation Session Ended', { description: 'The telehealth session has been securely closed and recorded.' });
                }}
                className="px-10 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all hover:scale-105 shadow-xl shadow-red-600/20 font-black text-xs uppercase tracking-widest flex items-center gap-3 font-sans"
                id="disconnect-telehealth-btn"
              >
                <X size={18} /> Disconnect Call
              </button>
            </div>
          </div>
        )}
    </div>
  );
};
