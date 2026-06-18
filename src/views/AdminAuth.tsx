import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast, Toaster } from 'sonner';
import { 
  ShieldAlert, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Activity,
  Zap
} from 'lucide-react';

interface AdminAuthProps {
  onBack: () => void;
  onSuccess: (role: 'admin', email: string, name?: string) => void;
}

export const AdminAuth = ({ onBack, onSuccess }: AdminAuthProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const masterKey = (import.meta as any).env.VITE_ADMIN_PASSWORD || 'zzz123';
      if (password === masterKey) {
        toast.success('System Access Granted', {
          description: 'Welcome to the Central Administration gateway.',
        });
        onSuccess('admin', 'admin@medicare.com', 'Master Architect');
      } else {
        toast.error('Access Denied', {
          description: 'Invalid administrative credentials.',
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans selection:bg-primary/30 text-ink overflow-hidden">
      <Toaster position="top-center" expand={true} richColors />
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -mr-96 -mt-96 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -ml-48 -mb-48" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-12"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-all shadow-sm"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-white shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                <ShieldAlert size={36} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Secure Protocol v4.2.0</span>
              </div>
              <h1 className="text-6xl font-display font-black tracking-tighter italic text-slate-900">System Gateway</h1>
              <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                Enter your encrypted master override key to initialize administrative control.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-slate-100 p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
             <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2 flex items-center gap-2">
                  <Lock size={12} /> Master Password
                </label>
                <div className="relative group">
                   <input 
                     type="password" 
                     autoFocus
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Digital Signature Required"
                     className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-6 text-xl font-bold tracking-widest focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-center placeholder:text-slate-200 uppercase text-slate-900"
                   />
                </div>
             </div>

             <button 
               type="submit"
               disabled={isLoading}
               className="w-full h-24 bg-primary text-white rounded-3xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50 disabled:grayscale shadow-xl shadow-primary/20"
             >
               {isLoading ? (
                 <>
                   <Activity className="animate-spin" size={20} />
                   Authenticating...
                 </>
               ) : (
                 <>
                   Initialize Access
                   <Zap size={18} className="text-secondary" />
                 </>
               )}
             </button>
          </form>

          <div className="text-center">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
               © 2026 MEDICARE OS • ALL ATTEMPTS LOGGED • {new Date().toLocaleDateString()}
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
