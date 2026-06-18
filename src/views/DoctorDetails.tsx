import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  MessageSquare, 
  Calendar, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  HeartPulse,
  CreditCard
} from 'lucide-react';
import { Doctor, doctors } from '../data/doctors';
import { PaymentModal } from '../components/common/PaymentModal';

interface DoctorDetailsProps {
  docId: string;
  onBack: () => void;
  onBook: (docId: string, slot: string, date: string, paymentId?: string) => void;
  profile?: any;
  onRequireAuth?: () => void;
}

type Tab = 'About' | 'Schedule' | 'Reviews';

export const DoctorDetails = ({ docId, onBack, onBook, profile, onRequireAuth }: DoctorDetailsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('About');
  const [selectedDate, setSelectedDate] = useState('Mon, May 18');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const doctor = doctors.find(d => d.id === docId) || doctors[0];

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) * 100; // to cents
  };

  const handleInitialBook = () => {
    if (!profile) {
      toast.error('Account Required', {
        description: 'Please sign up or sign in to complete scheduling and book appointments.',
        duration: 5000,
      });
      if (onRequireAuth) {
        onRequireAuth();
      }
      return;
    }
    if (activeTab !== 'Schedule') {
      setActiveTab('Schedule');
      return;
    }
    if (!selectedSlot) return;
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    setIsPaymentModalOpen(false);
    onBook(docId, selectedSlot!, selectedDate, paymentId);
  };

  const dates = [
    { day: 'Mon', date: '18', full: 'Mon, May 18' },
    { day: 'Tue', date: '19', full: 'Tue, May 19' },
    { day: 'Wed', date: '20', full: 'Wed, May 20' },
    { day: 'Thu', date: '21', full: 'Thu, May 21' },
    { day: 'Fri', date: '22', full: 'Fri, May 22' },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', 
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Back Side */}
          <div className="flex-1 flex justify-start items-center gap-3">
            <button 
              onClick={onBack}
              className="w-12 h-12 bg-white rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-3 group cursor-pointer bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-slate-100 shadow-sm transition-all" onClick={onBack}>
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg">
                <HeartPulse size={18} />
              </div>
              <span className="font-display font-black text-xl tracking-tighter text-slate-900 hidden sm:block">HealSync</span>
            </div>
          </div>

          {/* Central Nav Pill */}
          <div className="hidden lg:flex items-center gap-1 bg-white/90 backdrop-blur-md border border-slate-100 rounded-full px-2 py-2 shadow-sm">
            {['Home', 'Services', 'Find Doctors', 'Specialists', 'FAQ'].map((item) => (
              <button 
                key={item} 
                onClick={onBack}
                className="text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all font-sans whitespace-nowrap"
              >
                {item}
              </button>
            ))}
          </div>
          
          {/* Action Side */}
          <div className="flex-1 flex justify-end">
            <button 
              onClick={() => setActiveTab('Schedule')}
              className="bg-slate-900 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 hover:bg-black transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <section className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border border-slate-100 shadow-sm overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 flex-shrink-0 mx-auto md:mx-0">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                  Verified Specialist
                </span>
                <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 px-2.5 py-1 rounded-full text-[10px] font-black">
                  <Star size={10} fill="currentColor" /> {doctor.rating}
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 tracking-tighter">{doctor.name}</h2>
              <p className="text-sm md:text-base text-slate-500 font-bold">{doctor.specialty} • {doctor.location}</p>
              
              <div className="pt-4 md:pt-6 flex gap-3">
                <button 
                  onClick={handleInitialBook}
                  className="flex-1 bg-primary text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                  Book Appointment
                </button>
                <button className="w-14 h-14 bg-slate-50 text-slate-400 border border-slate-100 rounded-2xl flex items-center justify-center hover:text-primary hover:border-primary/20 transition-all shrink-0">
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 border-t border-slate-50 pt-8 sm:pt-10 text-center">
            <div className="space-y-1">
              <p className="text-xl md:text-2xl font-display font-black text-slate-900">{doctor.experience}</p>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Experience</p>
            </div>
            <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-slate-100 py-4 sm:py-0">
              <p className="text-xl md:text-2xl font-display font-black text-slate-900">{doctor.patients}</p>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Patients</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl md:text-2xl font-display font-black text-slate-900">{doctor.reviews}</p>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Reviews</p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex p-1.5 bg-white border border-slate-100 rounded-2xl w-full sm:w-fit max-w-md mx-auto shadow-sm justify-between">
          {(['About', 'Schedule', 'Reviews'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-initial px-4 xs:px-6 sm:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm"
          >
            {activeTab === 'About' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-display font-black text-slate-900 mb-4">About Doctor</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {doctor.about}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-[2rem] flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Education</h4>
                      <p className="text-xs text-slate-500 font-bold">Harvard Medical School</p>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[2rem] flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Awards</h4>
                      <p className="text-xs text-slate-500 font-bold">Top Physician 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Schedule' && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-display font-black text-slate-900 mb-6">Select Date</h3>
                  <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {dates.map((d) => (
                      <button
                        key={d.date}
                        onClick={() => setSelectedDate(d.full)}
                        className={`flex-shrink-0 w-20 h-24 rounded-[1.5rem] flex flex-col items-center justify-center transition-all ${
                          selectedDate === d.full
                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110'
                            : 'bg-white border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest mb-1">{d.day}</span>
                        <span className="text-2xl font-display font-black">{d.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black text-slate-900 mb-6">Available Time</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all uppercase ${
                          selectedSlot === slot
                            ? 'bg-slate-900 text-white shadow-xl'
                            : 'bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Reviews' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-display font-black text-slate-900">{doctor.reviews} Total Reviews</h3>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-display font-black text-slate-900">{doctor.rating}</span>
                  </div>
                </div>
                
                {[1, 2, 3].map((r) => (
                  <div key={r} className="p-8 bg-slate-50 rounded-[2rem] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300">
                          <Users size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">Anonymous Patient</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < 4 ? 'currentColor' : 'none'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      "I had a great experience with {doctor.name}. They were very professional and took the time to explain everything clearly. Highly recommend!"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-50">
        <button 
          disabled={!selectedSlot && activeTab === 'Schedule'}
          onClick={handleInitialBook}
          className={`w-full py-6 rounded-[2rem] font-display font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl transition-all ${
            (!selectedSlot && activeTab === 'Schedule')
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-primary text-white shadow-primary/40 hover:scale-105 active:scale-95'
          }`}
        >
          {activeTab === 'Schedule' ? (selectedSlot ? `Pay ${doctor.price} & Book` : 'Select a Slot') : 'Confirm Appointment'}
          <ChevronRight size={18} />
        </button>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={parsePrice(doctor.price)}
        onSuccess={handlePaymentSuccess}
        metadata={{ doctorName: doctor.name, slot: selectedSlot, date: selectedDate }}
      />
    </div>
  );
};
