import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Activity, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const PaymentModal = ({ isOpen, onClose, amount, onSuccess, metadata }: any) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) {
      toast.error('Cardholder Name required');
      return;
    }
    if (cardNumber.replace(/\s/g, '').length < 16) {
      toast.error('Please enter a valid 16-digit card number');
      return;
    }
    if (cardExpiry.length < 5) {
      toast.error('Please enter a valid expiry date (MM/YY)');
      return;
    }
    if (cardCvv.length < 3) {
      toast.error('Please enter a valid 3-digit CVV');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      
      toast.success('payment successfully completed', {
        description: `Booking confirmed with transaction code.`,
        duration: 4000
      });

      // Confirm success soon after showing success UI
      setTimeout(() => {
        onSuccess(`pay_normal_${Math.random().toString(36).substring(2, 12)}`);
        setStep('form');
        setCardName('');
        setCardNumber('');
        setCardExpiry('');
        setCardCvv('');
      }, 1800);

    }, 600); // Small fluid delay to feel natural
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-[0_25px_60px_rgba(15,23,42,0.15)] overflow-hidden border border-slate-100"
          >
            <div className="p-8 sm:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight leading-none">
                    Complete Payment
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 font-medium">Please enter your payment details below to finalize booking</p>
                </div>
                <button 
                  onClick={onClose} 
                  disabled={isProcessing}
                  className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {step === 'form' && !isProcessing && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Doctor Info Brief */}
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100/60 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">Booking Appointment with</p>
                      <p className="text-xs font-black text-slate-800">{metadata?.doctorName || 'Medical Expert'}</p>
                      <p className="text-[10px] text-slate-500 font-medium font-mono">{metadata?.date} • {metadata?.slot}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">Grand Total</p>
                      <p className="text-lg font-black text-blue-600 font-mono">${(amount / 100).toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Standard Form inputs */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-mono">Cardholder Name</label>
                      <input 
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50/50 text-slate-800 px-4 py-3 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none border border-slate-200/60 focus:border-blue-500/40 transition-all font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-mono">Card Number</label>
                      <div className="relative flex items-center">
                        <CreditCard size={14} className="absolute left-4 text-slate-400" />
                        <input 
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="4111 2222 3333 4444"
                          className="w-full bg-slate-50/50 text-slate-800 pl-11 pr-4 py-3 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none border border-slate-200/60 focus:border-blue-500/40 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-mono">Expiry MM / YY</label>
                        <input 
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="12/28"
                          className="w-full bg-slate-50/50 text-slate-800 px-4 py-3 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none border border-slate-200/60 focus:border-blue-500/40 transition-all font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-mono">CVV code</label>
                        <input 
                          type="password"
                          required
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="123"
                          className="w-full bg-slate-50/50 text-slate-800 px-4 py-3 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none border border-slate-200/60 focus:border-blue-500/40 transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      Complete Payment
                    </button>
                  </div>
                </form>
              )}

              {isProcessing && (
                <div className="py-16 text-center space-y-6">
                  <Activity size={36} className="mx-auto text-blue-600 animate-spin" />
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-800 font-sans max-w-sm mx-auto leading-relaxed">Processing payment...</p>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-sm border border-emerald-100">
                    <CheckCircle2 size={32} className="animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-display font-black text-slate-900 tracking-tight">payment successfully completed</h4>
                    <p className="text-xs text-slate-400 font-bold leading-relaxed max-w-xs mx-auto font-sans">
                      Your booking has been successfully simulated and confirmed. Welcome on board!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
