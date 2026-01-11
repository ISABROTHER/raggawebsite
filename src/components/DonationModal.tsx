// src/components/DonationModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, Heart, ChevronRight, CheckCircle2, 
  User, Phone, CreditCard, Loader2, RefreshCw, Plus, Minus 
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

  const handleIncrement = () => setSelectedAmount(prev => prev + 10);
  const handleDecrement = () => setSelectedAmount(prev => (prev > 10 ? prev - 10 : 10));

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
      setSelectedAmount(500);
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
          {!isProcessing && <button onClick={handleClose} className="text-white hover:bg-white/10 rounded-full p-1"><X className="w-6 h-6" /></button>}
        </div>

        <div className="p-8">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-red-800 animate-spin" />
              <p className="text-sm font-black uppercase tracking-widest text-slate-900 text-center">Processing Donation...</p>
            </div>
          ) : (
            <>
              {/* --- STEP 1: IMPACT SLIDER --- */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="text-center">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">How many books will you sponsor?</h3>
                    
                    {/* Visual Counter */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <button 
                        onClick={handleDecrement}
                        className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 hover:bg-red-50 hover:border-red-200 transition-all active:scale-90"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      
                      <div className="flex flex-col">
                        <span className="text-6xl font-black tracking-tighter text-slate-900">{selectedAmount.toLocaleString()}</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-800">Books</span>
                      </div>

                      <button 
                        onClick={handleIncrement}
                        className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 hover:bg-green-50 hover:border-green-200 transition-all active:scale-90"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    {/* The Interactive Bar (Slider) */}
                    <div className="relative px-2">
                      <input 
                        type="range"
                        min="10"
                        max="5000"
                        step="10"
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
                        className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-red-800 transition-all"
                      />
                      <div className="flex justify-between mt-3 px-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Min: 10</span>
                        <span>Max: 5,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Value Box maintained for Design Consistency */}
                  <div className="bg-green-700 p-6 rounded-[2rem] text-center text-white shadow-lg shadow-green-100 relative group overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-2">Total Contribution</p>
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

                  <button 
                    onClick={() => setStep(2)} 
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* --- STEP 2: PAYMENT (Maintained Design) --- */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                   <div className="flex p-1 bg-slate-100 rounded-2xl">
                    <button onClick={() => setPayMethod('LOCAL')} className={`flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${payMethod === 'LOCAL' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Local (MoMo)</button>
                    <button onClick={() => setPayMethod('FOREIGN')} className={`flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${payMethod === 'FOREIGN' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Foreign (Card)</button>
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none" />
                    <input type="text" placeholder={payMethod === 'LOCAL' ? "MoMo Number" : "Card Info / Email"} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none" />
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button onClick={() => setStep(1)} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px]">Back</button>
                    <button onClick={handlePay} className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase text-sm shadow-xl">Confirm {payMethod === 'LOCAL' ? `₵${totalGHS}` : `$${totalUSD.toFixed(2)}`}</button>
                  </div>
                </div>
              )}

              {/* --- STEP 3: SUCCESS --- */}
              {step === 3 && (
                <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12" /></div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">GOD BLESS YOU!</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-8 italic">Your gift of {selectedAmount.toLocaleString()} books will change lives today.</p>
                  <button onClick={handleClose} className="w-full py-4 border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase text-xs">Close</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}