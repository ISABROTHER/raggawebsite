// src/components/DonationModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, Heart, ChevronRight, Wallet, CheckCircle2, 
  User, Phone, ShieldCheck, CreditCard, Apple, Loader2, 
  RefreshCw, Plus, Minus, Sparkles
} from 'lucide-react';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [payMethod, setPayMethod] = useState<'LOCAL' | 'FOREIGN'>('LOCAL');
  
  const pricePerBookGHS = 1.00; 
  const [exchangeRate, setExchangeRate] = useState(15.20); 
  const [isFetchingRate, setIsFetchingRate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsFetchingRate(true);
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
          if (data.rates && data.rates.GHS) setExchangeRate(data.rates.GHS);
          setIsFetchingRate(false);
        })
        .catch(() => setIsFetchingRate(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalGHS = selectedAmount * pricePerBookGHS;
  const totalUSD = totalGHS / exchangeRate;

  const handleAdjust = (type: 'plus' | 'minus') => {
    if (type === 'plus') setSelectedAmount(prev => prev + 10);
    else if (type === 'minus' && selectedAmount > 10) setSelectedAmount(prev => prev - 10);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setPayMethod('LOCAL');
      setSelectedAmount(500);
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 border border-white/20">
        
        {/* --- HEADER --- */}
        <div className="bg-red-800 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl"><Sparkles className="w-5 h-5 text-amber-400" /></div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Support Ragga</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 italic">Obiara Ka Ho</p>
            </div>
          </div>
          {!isProcessing && <button onClick={handleClose} className="hover:bg-white/10 p-2 rounded-full transition-all"><X className="w-6 h-6" /></button>}
        </div>

        <div className="p-8">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-red-800 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center"><Heart className="w-6 h-6 text-red-800/20" /></div>
              </div>
              <p className="text-sm font-black uppercase tracking-widest text-slate-900 animate-pulse">Processing...</p>
            </div>
          ) : (
            <>
              {/* --- STEP 1: INNOVATIVE IMPACT DIAL --- */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Presets - Minimalist Bubbles */}
                  <div className="flex justify-between gap-2">
                    {[100, 500, 1000, 2000].map((num) => (
                      <button 
                        key={num} 
                        onClick={() => setSelectedAmount(num)}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all border-2 ${selectedAmount === num ? 'bg-red-800 border-red-800 text-white shadow-md' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  {/* Tactile Manual Counter */}
                  <div className="relative flex flex-col items-center">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Adjust Book Count</label>
                    <div className="flex items-center gap-8">
                      <button 
                        onClick={() => handleAdjust('minus')}
                        className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-800 transition-all active:scale-90"
                      >
                        <Minus className="w-6 h-6" strokeWidth={3} />
                      </button>
                      
                      <div className="flex flex-col items-center">
                        <input 
                          type="number"
                          value={selectedAmount}
                          onChange={(e) => setSelectedAmount(Number(e.target.value))}
                          className="w-32 text-center text-5xl font-black text-slate-900 bg-transparent outline-none tracking-tighter"
                        />
                        <div className="h-1 w-12 bg-red-800 rounded-full mt-2" />
                      </div>

                      <button 
                        onClick={() => handleAdjust('plus')}
                        className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-green-100 hover:text-green-700 transition-all active:scale-90"
                      >
                        <Plus className="w-6 h-6" strokeWidth={3} />
                      </button>
                    </div>
                  </div>

                  {/* High-Impact Value Box */}
                  <div className="bg-green-700 p-6 rounded-[2.5rem] text-center text-white shadow-xl shadow-green-900/10 relative overflow-hidden group">
                    <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">Total Contribution</p>
                      <p className="text-4xl font-black mb-2">₵{totalGHS.toLocaleString()}</p>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/20 rounded-full border border-white/5">
                        <span className="text-[11px] font-bold text-white/90">
                          Equiv. ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                        </span>
                        {isFetchingRate && <RefreshCw className="w-3 h-3 animate-spin text-white/30" />}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(2)} 
                    className="group w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Payment <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* --- STEP 2: PAYMENT MODE --- */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                    <button 
                      onClick={() => setPayMethod('LOCAL')}
                      className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${payMethod === 'LOCAL' ? 'bg-white text-red-800 shadow-md' : 'text-slate-400'}`}
                    >
                      <Phone className="w-4 h-4" /> MoMo (₵)
                    </button>
                    <button 
                      onClick={() => setPayMethod('FOREIGN')}
                      className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${payMethod === 'FOREIGN' ? 'bg-white text-red-800 shadow-md' : 'text-slate-400'}`}
                    >
                      <CreditCard className="w-4 h-4" /> Card ($)
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="group relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-800 transition-colors" />
                      <input type="text" placeholder="Your Name" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:bg-white focus:ring-4 focus:ring-red-800/5 outline-none" />
                    </div>
                    <div className="group relative">
                      {payMethod === 'LOCAL' ? <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /> : <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
                      <input type="text" placeholder={payMethod === 'LOCAL' ? "MoMo Number" : "Email or Card Number"} className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:bg-white focus:ring-4 focus:ring-red-800/5" />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button onClick={() => setStep(1)} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px] text-slate-400 hover:bg-slate-50 transition-all">Back</button>
                    <button 
                      onClick={() => setIsProcessing(true) || setTimeout(() => {setIsProcessing(false); setStep(3)}, 2500)}
                      className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase text-sm shadow-xl shadow-red-900/20 active:scale-95 transition-all"
                    >
                      Pay {payMethod === 'LOCAL' ? `₵${totalGHS}` : `$${totalUSD.toFixed(2)}`}
                    </button>
                  </div>
                </div>
              )}

              {/* --- STEP 3: SUCCESS --- */}
              {step === 3 && (
                <div className="text-center py-8 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 rotate-12 group-hover:rotate-0 transition-transform">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Great Impact!</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto mb-8">
                    You've successfully sponsored <span className="text-green-700 font-black">{selectedAmount.toLocaleString()} books</span>. You are changing lives today!
                  </p>
                  <button onClick={handleClose} className="w-full py-4 bg-slate-100 text-slate-900 rounded-2xl font-black uppercase text-xs hover:bg-slate-200 transition-all">Close Window</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}