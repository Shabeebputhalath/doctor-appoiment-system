import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'sonner';
import { 
  HeartPulse, 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Chrome, 
  ArrowLeft,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuthProps {
  onBack: () => void;
  onSuccess: (role: 'patient' | 'doctor' | 'admin', email: string, name?: string) => void;
}

type AuthMode = 'login' | 'signup' | 'forgot-password';

// Persistence for users
const USERS_STORAGE_KEY = 'medicare_registered_users';

const getRegisteredUsers = (): Set<string> => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) {
    const defaults = ['demo@example.com', 'michael@medicare.com', 'sarah@medicare.com', 'aaa@gmail.com'];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaults));
    return new Set(defaults);
  }
  return new Set(JSON.parse(stored));
};

const registerUser = (email: string) => {
  const users = Array.from(getRegisteredUsers());
  if (!users.includes(email)) {
    users.push(email);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

const RoleSelector = ({ selected, onChange }: { selected: string; onChange: (role: 'patient' | 'doctor') => void }) => (
  <div className="flex gap-2 p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-2xl mb-8 border border-slate-100">
    <button
      type="button"
      onClick={() => onChange('patient')}
      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
        selected === 'patient' 
          ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-100' 
          : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <User size={14} className={selected === 'patient' ? 'text-primary' : ''} /> Patient
    </button>
    <button
      type="button"
      onClick={() => onChange('doctor')}
      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
        selected === 'doctor' 
          ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-100' 
          : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <HeartPulse size={14} className={selected === 'doctor' ? 'text-primary' : ''} /> Doctor
    </button>
  </div>
);

export const Auth = ({ onBack, onSuccess }: AuthProps) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to check if account exists
    setTimeout(() => {
      setIsLoading(false);
      const registeredUsers = getRegisteredUsers();
      if (registeredUsers.has(email)) {
        toast.success('Successfully logged in!', {
          description: `Welcome back, ${email}`,
        });
        
        onSuccess(selectedRole, email, fullName || email.split('@')[0]);
      } else {
        toast.error('Account not found', {
          description: 'This email is not registered. Please create an account first.',
          action: {
            label: 'Sign Up',
            onClick: () => setMode('signup')
          }
        });
      }
    }, 1200);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      registerUser(email);
      toast.success('Account created successfully!', {
        description: 'You can now log in with your credentials.'
      });
      setMode('login');
    }, 1500);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.info('Reset link sent', {
        description: `Please check ${email} for further instructions.`
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-primary selection:text-white">
      <Toaster position="top-center" expand={true} richColors />
      {/* Left Side: Illustration & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-5/12 bg-slate-900 relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="relative z-10 space-y-16 max-w-md">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={onBack}>
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/40 group-hover:rotate-6 transition-transform">
              <HeartPulse size={36} />
            </div>
            <span className="font-display font-black text-5xl tracking-tighter text-white">HealSync</span>
          </div>

          <div className="space-y-8">
             <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <ShieldCheck size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Premium Healthcare OS</span>
             </div>
            <h1 className="text-6xl font-display font-black text-white leading-[1.05] tracking-tighter">
              Redefining <br /> the <span className="text-primary">Medical</span> <br /> Experience.
            </h1>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Connect with top specialists worldwide through our high-performance clinical platform.
            </p>
          </div>

          <div className="space-y-6 pt-10">
             {[
               { title: "HIPAA Compliant", desc: "Military-grade data encryption", icon: ShieldCheck },
               { title: "Smart Scheduling", desc: "AI-driven appointment slots", icon: CheckCircle2 }
             ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 group/f">
                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover/f:bg-primary group-hover/f:text-white transition-all">
                      <feature.icon size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white">{feature.title}</p>
                      <p className="text-slate-500 text-xs font-bold leading-relaxed">{feature.desc}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="w-full lg:w-7/12 flex flex-col items-center justify-center p-6 sm:p-20 relative bg-[#fcfcfd] overflow-y-auto">
        {/* Mobile Header / Back Button */}
        <div className="absolute top-8 left-8 right-8 flex items-center justify-between pointer-events-none lg:hidden">
          <button 
            onClick={onBack}
            className="w-12 h-12 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm pointer-events-auto active:scale-90"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-100 shadow-sm pointer-events-auto">
            <HeartPulse size={16} className="text-primary" />
            <span className="font-display font-black text-sm tracking-tighter text-slate-900">HealSync</span>
          </div>
        </div>

        <div className="w-full max-w-md pt-20 lg:pt-0">
          <AnimatePresence mode="wait">
            {mode === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/5">
                    <ShieldCheck size={12} className="text-primary" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary">Biometric Secure</span>
                  </div>
                  <h2 className="text-5xl font-display font-black text-slate-900 tracking-tighter leading-none">Welcome back</h2>
                  <p className="text-slate-500 font-bold text-lg">Your healthcare journey continues here.</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <RoleSelector selected={selectedRole} onChange={setSelectedRole} />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1 leading-none">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Connection</label>
                      <span className="text-[10px] font-bold text-slate-300">Required</span>
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-all duration-300" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="name@healsync.io"
                        className="w-full pl-14 pr-5 py-5 bg-white border border-slate-100 rounded-[1.8rem] text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm hover:border-slate-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1 leading-none">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Secure Access</label>
                      <button 
                        type="button"
                        onClick={() => setMode('forgot-password')}
                        className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4 active:scale-95 transition-transform"
                      >
                        Recovery?
                      </button>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-all duration-300" size={18} />
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        className="w-full pl-14 pr-5 py-5 bg-white border border-slate-100 rounded-[1.8rem] text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm hover:border-slate-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-900 text-white py-5 rounded-[1.8rem] font-black uppercase tracking-[0.22em] text-[10px] shadow-[0_20px_40px_-15px_rgba(15,23,42,0.3)] hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-4 group hover:scale-[1.01] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Sign In Now
                        <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                  <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em]"><span className="bg-[#fcfcfd] px-8 text-slate-300">Third-Party Gateway</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 py-5 bg-white border border-slate-100 rounded-[1.8rem] text-slate-900 hover:bg-slate-50 transition-all font-black uppercase tracking-[0.2em] text-[9px] shadow-sm active:scale-95 group">
                    <Chrome size={18} className="text-blue-500 group-hover:scale-110 transition-transform" /> Google
                  </button>
                  <button className="flex items-center justify-center gap-3 py-5 bg-white border border-slate-100 rounded-[1.8rem] text-slate-900 hover:bg-slate-50 transition-all font-black uppercase tracking-[0.2em] text-[9px] shadow-sm active:scale-95 group">
                    <Github size={18} className="text-slate-900 group-hover:scale-110 transition-transform" /> Github
                  </button>
                </div>

                <div className="flex flex-col items-center gap-4 pt-4">
                  <p className="font-bold text-slate-500">
                    New to the platform?{' '}
                    <button onClick={() => setMode('signup')} className="text-primary hover:underline underline-offset-4 border-b-2 border-transparent hover:border-primary/30 pb-0.5 transition-all">Create Account</button>
                  </p>
                  
                  <div className="h-px w-24 bg-slate-100" />
                  
                  <button 
                    onClick={onBack}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-650 active:scale-95 transition-all flex flex-col items-center gap-1.5 cursor-pointer text-center group"
                  >
                    <span className="group-hover:text-slate-700">← Explore Website as Guest</span>
                    <span className="text-[8px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-md max-w-[240px] leading-normal font-mono shadow-sm">
                      NO BOOKING ACCESS
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {mode === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <button onClick={() => setMode('login')} className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-4 hover:-translate-x-1 transition-transform">
                    <ArrowLeft size={12} /> Portal Access
                  </button>
                  <h2 className="text-5xl font-display font-black text-slate-900 tracking-tighter leading-none">New Journey</h2>
                  <p className="text-slate-500 font-bold text-lg">Initialize your premium medical account.</p>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-6">
                  <RoleSelector selected={selectedRole} onChange={setSelectedRole} />
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Identity Name</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-all duration-300" size={18} />
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Jordan Smith"
                        className="w-full pl-14 pr-5 py-5 bg-white border border-slate-100 rounded-[1.8rem] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm hover:border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Digital Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-all duration-300" size={18} />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="personal@vault.io"
                        className="w-full pl-14 pr-5 py-5 bg-white border border-slate-100 rounded-[1.8rem] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm hover:border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Access Key</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-all duration-300" size={18} />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-14 pr-5 py-5 bg-white border border-slate-100 rounded-[1.8rem] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm hover:border-slate-200"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-primary text-white py-5 rounded-[1.8rem] font-black uppercase tracking-[0.22em] text-[10px] shadow-[0_20px_40px_-15px_rgba(var(--primary-rgb),0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                    Initialize {selectedRole} Account
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </form>

                <div className="flex flex-col items-center gap-4 pt-2">
                  <p className="font-bold text-slate-500">
                    Existing Member?{' '}
                    <button onClick={() => setMode('login')} className="text-primary hover:underline underline-offset-4 border-b-2 border-transparent hover:border-primary/30 pb-0.5 transition-all">Sign In Here</button>
                  </p>
                  
                  <div className="h-px w-24 bg-slate-100" />
                  
                  <button 
                    onClick={onBack}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-650 active:scale-95 transition-all flex flex-col items-center gap-1.5 cursor-pointer text-center group"
                  >
                    <span className="group-hover:text-slate-700">← Explore Website as Guest</span>
                    <span className="text-[8px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-md max-w-[240px] leading-normal font-mono shadow-sm">
                      NO BOOKING ACCESS
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {mode === 'forgot-password' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <button onClick={() => setMode('login')} className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-4 hover:-translate-x-1 transition-transform">
                    <ArrowLeft size={12} /> Security Check
                  </button>
                  <h2 className="text-5xl font-display font-black text-slate-900 tracking-tighter leading-none">Lost Access?</h2>
                  <p className="text-slate-500 font-bold text-lg">We'll help you recover your digital identity.</p>
                </div>

                <form onSubmit={handleResetSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Registration Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-all duration-300" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="registered@vault.io"
                        className="w-full pl-14 pr-5 py-5 bg-white border border-slate-100 rounded-[1.8rem] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm hover:border-slate-200"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-slate-900 text-white py-5 rounded-[1.8rem] font-black uppercase tracking-[0.22em] text-[10px] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 group">
                    Execute Recovery
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-8 text-center sm:text-left">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            © 2024 HealSync. Privacy Policy • Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};
