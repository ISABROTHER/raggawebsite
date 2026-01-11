// src/components/DonationModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, Heart, ChevronRight, CheckCircle2, 
  User, Phone, CreditCard, Loader2, RefreshCw, Minus, Plus 
} from 'lucide-react';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

  const handlePay = () => {
    if (selectedAmount <= 0) return;
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
      setSelectedAmount(0);
      setFirstName('');
      setLastName('');
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
        
        {/* --- COMPACT EMOTIVE HEADER --- */}
        <div className="bg-red-800 p-4 md:p-6 text-white flex justify-between items-center shrink-0">
          <div className="pr-4">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white leading-tight">Support Project</h2>
            <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-white/80 mt-0.5 leading-tight">
              A generational impact on our children's future
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
              {/* --- STEP 1: COMPACT IMPACT SELECTION --- */}
              {step === 1 && (
                <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-800 text-white font-black text-[10px]">1</span>
                    <h3 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-slate-900">Select Books</h3>
                  </div>

                  {/* Grid layout maintained but tighter */}
                  <div className="grid grid-cols-4 gap-2">
                    {[500, 1000, 5000, 10000].map((num) => (
                      <button 
                        key={num} 
                        onClick={() => setSelectedAmount(num)} 
                        className={`py-2 md:py-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${selectedAmount === num ? 'border-green-600 bg-green-50 shadow-sm' : 'border-slate-100 bg-white'}`}
                      >
                        <span className="text-[9px] font-black tracking-tight">{num.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>

                  {/* ADJUSTMENT AREA (COMPACT) */}
                  <div className="space-y-3 px-4 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[14px] md:text-xl font-black text-slate-900 leading-none">{selectedAmount.toLocaleString()}</span>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">BOOKS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedAmount(Math.max(0, selectedAmount - 100))}
                          className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-red-800 shadow-sm active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setSelectedAmount(Math.min(200000, selectedAmount + 100))}
                          className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-red-800 shadow-sm active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <input 
                      type="range" min="0" max="200000" step="100"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-800"
                    />
                  </div>

                  {/* --- REDUCED CONTRIBUTION BOX --- */}
                  <div className="bg-green-700 px-4 py-4 rounded-[1.5rem] md:rounded-[2rem] text-center text-white shadow-lg relative overflow-hidden">
                    <p className="text-[14px] md:text-lg font-black uppercase tracking-tight">
                      {selectedAmount.toLocaleString()} Books | ₵{totalGHS.toLocaleString()}
                    </p>
                    <div className="mt-1 flex items-center justify-center gap-1 opacity-80">
                      <span className="text-[9px] font-bold tracking-widest uppercase">
                        ≈ ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                      </span>
                      {isFetchingRate && <RefreshCw className="w-2.5 h-2.5 animate-spin" />}
                    </div>
                  </div>

                  <button 
                    onClick={() => selectedAmount > 0 && setStep(2)} 
                    disabled={selectedAmount <= 0}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl transition-all ${selectedAmount > 0 ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                  >
                    Proceed to Details
                  </button>
                </div>
              )}

              {/* --- STEP 2: DETAILS --- */}
              {step === 2 && (
                <div className="space-y-4 md:space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-800 text-white font-black text-[10px]">2</span>
                    <h3 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-slate-900">Sponsor Info</h3>
                  </div>

                  <div className="flex p-1 bg-slate-100 rounded-xl">
                    <button onClick={() => setPayMethod('LOCAL')} className={`flex-1 py-2.5 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${payMethod === 'LOCAL' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Local</button>
                    <button onClick={() => setPayMethod('FOREIGN')} className={`flex-1 py-2.5 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${payMethod === 'FOREIGN' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Foreign</button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" placeholder="First Name" value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none" 
                      />
                      <input 
                        type="text" placeholder="Surname" value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none" 
                      />
                    </div>
                    <input 
                      type="text" placeholder={payMethod === 'LOCAL' ? "MoMo Number" : "Email Address"} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none" 
                    />
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button onClick={() => setStep(1)} className="w-1/3 py-4 border-2 border-slate-100 rounded-xl font-black uppercase text-[9px]">Back</button>
                    <button 
                      onClick={handlePay} 
                      disabled={!firstName || !lastName}
                      className={`w-2/3 py-4 rounded-xl font-black uppercase text-xs shadow-xl transition-all ${(!firstName || !lastName) ? 'bg-slate-200 text-slate-400' : 'bg-red-800 text-white'}`}
                    >
                      Pay ₵{totalGHS.toLocaleString()}
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
                    THANK YOU,<br/>{firstName}!
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-6 italic">
                    You've sponsored {selectedAmount.toLocaleString()} books. A generational investment.
                  </p>
                  <button onClick={handleClose} className="w-full py-4 border-2 border-slate-100 text-slate-900 rounded-xl font-black uppercase text-[10px]">Close</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}