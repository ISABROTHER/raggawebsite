// src/components/DonationModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Heart, ChevronRight, CheckCircle2, 
  User, Phone, CreditCard, Loader2, RefreshCw, Minus, Plus 
} from 'lucide-react';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [payMethod, setPayMethod] = useState<'LOCAL' | 'FOREIGN'>('LOCAL');
  
  const pricePerBookGHS = 1.00; 
  const [exchangeRate, setExchangeRate] = useState(15.20); 
  const [isFetchingRate, setIsFetchingRate] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // --- LONG PRESS ADJUSTING ---
  const startAdjusting = (direction: 'up' | 'down') => {
    if (intervalRef.current) return;
    const adjust = () => {
      setSelectedAmount((prev) => {
        if (direction === 'up') return Math.min(200000, prev + 1);
        return Math.max(1, prev - 1);
      });
    };
    adjust();
    intervalRef.current = setInterval(adjust, 70);
  };

  const stopAdjusting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value.replace(/,/g, ''));
    setSelectedAmount(isNaN(val) ? 0 : val);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setPayMethod('LOCAL');
      setSelectedAmount(1);
      setFirstName('');
      setLastName('');
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
        
        {/* --- HEADER --- */}
        <div className="bg-red-800 p-4 md:p-6 text-white flex justify-between items-center shrink-0">
          <div className="pr-4">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight">Support Project</h2>
            <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-white/80 mt-0.5 leading-tight">
              You are about to make a generational impact on our children's future
            </p>
          </div>
          {!isProcessing && (
            <button onClick={handleClose} className="p-1.5 hover:bg-white/10 rounded-full transition-all text-white">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
        </div>

        <div className="p-5 md:p-8 overflow-y-auto">
          {isProcessing ? (
            <div className="py-10 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-10 h-10 text-red-800 animate-spin" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-900">Processing...</p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-800 text-white font-black text-[10px]">1</span>
                    <h3 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-slate-900 text-left">How many books?</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[500, 1000, 5000, 10000].map((num) => (
                      <button 
                        key={num} 
                        onClick={() => setSelectedAmount(num)} 
                        className={`py-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${selectedAmount === num ? 'border-green-600 bg-green-50 shadow-sm' : 'border-slate-100 bg-white'}`}
                      >
                        <span className="text-[9px] font-black tracking-tight">{num.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>

                  {/* --- SAME LEVEL ADJUSTMENT AREA --- */}
                  <div className="space-y-3 px-4 py-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-baseline gap-1.5 flex-1 overflow-hidden">
                        <input 
                          type="text"
                          value={selectedAmount === 0 ? "" : selectedAmount.toLocaleString()}
                          onChange={handleInputChange}
                          className="bg-transparent text-xl md:text-2xl font-black text-slate-900 outline-none w-[45%] shrink-0 p-0 m-0"
                          placeholder="0"
                        />
                        <span className="text-xl md:text-2xl font-black text-slate-900 uppercase truncate">
                          {selectedAmount === 1 ? 'BOOK' : 'BOOKS'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button 
                          onMouseDown={() => startAdjusting('down')} onMouseUp={stopAdjusting} onMouseLeave={stopAdjusting}
                          onTouchStart={() => startAdjusting('down')} onTouchEnd={stopAdjusting}
                          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-red-800 shadow-sm active:scale-90 transition-transform select-none"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <button 
                          onMouseDown={() => startAdjusting('up')} onMouseUp={stopAdjusting} onMouseLeave={stopAdjusting}
                          onTouchStart={() => startAdjusting('up')} onTouchEnd={stopAdjusting}
                          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-red-800 shadow-sm active:scale-90 transition-transform select-none"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <input 
                      type="range" min="1" max="200000" step="1"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-800"
                    />
                  </div>

                  {/* COMPACT CONTRIBUTION BOX */}
                  <div className="bg-green-700 px-4 py-4 rounded-[1.5rem] text-center text-white shadow-lg relative overflow-hidden">
                    <p className="text-[14px] md:text-lg font-black uppercase tracking-tight">
                      {selectedAmount.toLocaleString()} {selectedAmount === 1 ? 'Book' : 'Books'} | ₵{totalGHS.toLocaleString()}
                    </p>
                    <div className="mt-1 flex items-center justify-center gap-1 opacity-80">
                      <span className="text-[9px] font-bold tracking-widest uppercase">
                        ≈ ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                      </span>
                      {isFetchingRate && <RefreshCw className="w-2.5 h-2.5 animate-spin" />}
                    </div>
                  </div>

                  <button 
                    onClick={() => selectedAmount >= 1 && setStep(2)} 
                    disabled={selectedAmount < 1}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl transition-all ${selectedAmount >= 1 ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                  >
                    Proceed to Details
                  </button>
                </div>
              )}

              {/* --- STEP 2: DETAILS --- */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-800 text-white font-black text-[10px]">2</span>
                    <h3 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-slate-900">Sponsor Info</h3>
                  </div>

                  <div className="flex p-1 bg-slate-100 rounded-xl">
                    <button onClick={() => setPayMethod('LOCAL')} className={`flex-1 py-2.5 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${payMethod === 'LOCAL' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Local</button>
                    <button onClick={() => setPayMethod('FOREIGN')} className={`flex-1 py-2.5 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${payMethod === 'FOREIGN' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Foreign</button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-left">
                      <input 
                        type="text" placeholder="First Name" value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:ring-1 focus:ring-red-800/20" 
                      />
                      <input 
                        type="text" placeholder="Surname" value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:ring-1 focus:ring-red-800/20" 
                      />
                    </div>
                    <input type="text" placeholder={payMethod === 'LOCAL' ? "MoMo Number" : "Email Address"} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:ring-1 focus:ring-red-800/20 text-left" />
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button onClick={() => setStep(1)} className="w-1/3 py-4 border-2 border-slate-100 rounded-xl font-black uppercase text-[9px]">Back</button>
                    <button 
                      onClick={handlePay} 
                      disabled={!firstName || !lastName}
                      className={`w-2/3 py-4 rounded-xl font-black uppercase text-xs shadow-xl transition-all ${(!firstName || !lastName) ? 'bg-slate-200 text-slate-400' : 'bg-red-800 text-white'}`}
                    >
                      Confirm ₵{totalGHS.toLocaleString()}
                    </button>
                  </div>
                </div>
              )}

              {/* --- STEP 3: SUCCESS --- */}
              {step === 3 && (
                <div className="text-center py-4 animate-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                    THANK YOU,<br/>{firstName} {lastName}!
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-8 italic">
                    Your sponsorship of {selectedAmount.toLocaleString()} {selectedAmount === 1 ? 'book' : 'books'} is a generational investment in our children's future.
                  </p>
                  <button onClick={handleClose} className="w-full py-4 border-2 border-slate-100 text-slate-900 rounded-xl font-black uppercase text-[10px]">Close Window</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}