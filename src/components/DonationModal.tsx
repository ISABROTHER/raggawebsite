// src/components/DonationModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, Heart, ChevronRight, Wallet, CheckCircle2, 
  User, Phone, ShieldCheck, CreditCard, Apple, Loader2, RefreshCw 
} from 'lucide-react';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [payMethod, setPayMethod] = useState<'LOCAL' | 'FOREIGN'>('LOCAL');
  
  // --- PRICE & RATE LOGIC ---
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

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2800);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setPayMethod('LOCAL');
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        
        {/* Header Block */}
        <div className="bg-red-800 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Support Project</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 italic">Obiara Ka Ho</p>
          </div>
          {!isProcessing && <button onClick={handleClose} className="text-white hover:rotate-90 transition-transform"><X className="w-6 h-6" /></button>}
        </div>

        <div className="p-8">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-red-800 animate-spin" />
              <p className="text-sm font-black uppercase tracking-widest text-slate-900">
                {payMethod === 'LOCAL' ? 'Awaiting MoMo Prompt...' : 'Securing Card Payment...'}
              </p>
            </div>
          ) : (
            <>
              {/* --- STEP 1: IMPACT SELECTION (CURRENCY SELECTOR REMOVED) --- */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">1</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">How many books?</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[100, 500, 1000, 5000].map((num) => (
                      <button key={num} onClick={() => setSelectedAmount(num)} className={`py-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${selectedAmount === num ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-white'}`}>
                        <span className="text-xl font-black">{num.toLocaleString()}</span>
                        <span className="text-[9px] font-black uppercase text-slate-400">Books</span>
                      </button>
                    ))}
                  </div>

                  {/* Dual Value Green Box */}
                  <div className="bg-green-700 p-6 rounded-[2rem] text-center text-white shadow-lg relative group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-2">Contribution Value</p>
                    <div className="flex flex-col items-center gap-1">
                       <p className="text-4xl font-black tracking-tighter">₵{totalGHS.toLocaleString()}</p>
                       <div className="flex items-center gap-2 px-4 py-1.5 bg-black/20 rounded-full border border-white/10">
                         <span className="text-xs font-bold text-white/90">
                           Equiv. ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                         </span>
                         {isFetchingRate && <RefreshCw className="w-3 h-3 animate-spin text-white/40" />}
                       </div>
                    </div>
                  </div>

                  <button onClick={() => setStep(2)} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    Next: Choose Payment Mode <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* --- STEP 2: CHOOSE PAYMENT MODE & DETAILS --- */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">2</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Payment Selection</h3>
                  </div>

                  {/* Local vs Foreign Switcher */}
                  <div className="flex p-1 bg-slate-100 rounded-2xl">
                    <button 
                      onClick={() => setPayMethod('LOCAL')}
                      className={`flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${payMethod === 'LOCAL' ? 'bg-white text-red-800 shadow-sm scale-[1.02]' : 'text-slate-400'}`}
                    >
                      <Phone className="w-3.5 h-3.5" /> Local (MoMo)
                    </button>
                    <button 
                      onClick={() => setPayMethod('FOREIGN')}
                      className={`flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${payMethod === 'FOREIGN' ? 'bg-white text-red-800 shadow-sm scale-[1.02]' : 'text-slate-400'}`}
                    >
                      <CreditCard className="w-3.5 h-3.5" /> Foreign (Card)
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="Full Name" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-red-800/20 outline-none" />
                    </div>
                    
                    <div className="relative">
                      {payMethod === 'LOCAL' ? (
                        <>
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="tel" placeholder="Mobile Money Number" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none" />
                        </>
                      ) : (
                        <>
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" placeholder="Card Number or Apple Pay Email" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none" />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button onClick={() => setStep(1)} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px] hover:bg-slate-50">Back</button>
                    <button onClick={handlePay} className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase text-sm shadow-xl hover:shadow-red-200 active:scale-95 transition-all">
                      Confirm {payMethod === 'LOCAL' ? `₵${totalGHS}` : `$${totalUSD.toFixed(2)}`}
                    </button>
                  </div>
                </div>
              )}

              {/* --- STEP 3: SUCCESS --- */}
              {step === 3 && (
                <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12" /></div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">THANK YOU!</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-8 italic">
                    You have sponsored {selectedAmount.toLocaleString()} books for students in Cape Coast North. God bless you!
                  </p>
                  <button onClick={handleClose} className="w-full py-4 border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase text-xs hover:bg-slate-50">Close</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}