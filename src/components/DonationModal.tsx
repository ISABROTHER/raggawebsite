// src/components/DonationModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, Heart, ChevronRight, Wallet, CheckCircle2, 
  User, Phone, CreditCard, Apple, Loader2, RefreshCw, Globe2, BookOpen 
} from 'lucide-react';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');
  
  // --- INNOVATIVE PRICING LOGIC ---
  const pricePerBookGHS = 1.00; // ₵1.00 per book as requested
  const [exchangeRate, setExchangeRate] = useState(15.25); // 1 USD to GHS
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

  // Calculation Engine
  const getGHS = (qty: number) => qty * pricePerBookGHS;
  const getUSD = (qty: number) => getGHS(qty) / exchangeRate;

  const currentTotalGHS = getGHS(selectedAmount);
  const currentTotalUSD = getUSD(selectedAmount);

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
      setCurrency('GHS');
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
            <h2 className="text-xl font-black uppercase tracking-tight text-white">THE RAGGA FOUNDATION</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              {isProcessing ? 'Connecting Gateway...' : `Step ${step} of 3 • Global Impact`}
            </p>
          </div>
          {!isProcessing && (
            <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="p-8">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-red-800 animate-spin" />
              <p className="text-sm font-black uppercase tracking-widest text-slate-900">Processing Payment...</p>
            </div>
          ) : (
            <>
              {/* --- STEP 1: INNOVATIVE COMPARISON GRID --- */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">1</span>
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Choose Impact</h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full">
                      <Globe2 className="w-3 h-3 text-slate-400" />
                      <span className="text-[9px] font-black text-slate-500 uppercase">Live Conversion Active</span>
                    </div>
                  </div>
                  
                  {/* Amount Grid with Integrated Comparison */}
                  <div className="grid grid-cols-2 gap-3">
                    {[100, 500, 1000, 5000].map((qty) => (
                      <button 
                        key={qty} 
                        onClick={() => setSelectedAmount(qty)} 
                        className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-start text-left group ${selectedAmount === qty ? 'border-green-600 bg-green-50 shadow-md' : 'border-slate-100 bg-white hover:border-green-200'}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className={`w-3 h-3 ${selectedAmount === qty ? 'text-green-600' : 'text-slate-300'}`} />
                          <span className={`text-lg font-black tracking-tight ${selectedAmount === qty ? 'text-green-700' : 'text-slate-900'}`}>{qty.toLocaleString()} Books</span>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-black text-slate-800 tracking-tight">₵{getGHS(qty).toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">≈ ${getUSD(qty).toFixed(2)} USD</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Impact Context Card (Innovation) */}
                  <div className="bg-slate-900 rounded-[2rem] p-5 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3">The Value of your Support</p>
                      <div className="flex items-center justify-between w-full mb-4 px-4">
                        <div className="text-left">
                          <p className="text-[9px] font-bold text-white/40 uppercase">GHS Total</p>
                          <p className="text-2xl font-black tracking-tighter">₵{currentTotalGHS.toLocaleString()}</p>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="text-right">
                          <p className="text-[9px] font-bold text-white/40 uppercase">USD Equiv.</p>
                          <p className="text-2xl font-black tracking-tighter text-green-400">${currentTotalUSD.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="w-full pt-4 border-t border-white/10 flex items-center justify-center gap-2">
                        <div className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest italic">
                          💡 ${currentTotalUSD.toFixed(0)} sponsors {selectedAmount} students for a term
                        </div>
                      </div>
                    </div>
                    <RefreshCw className={`absolute -bottom-4 -right-4 w-24 h-24 text-white/5 transition-transform duration-1000 ${isFetchingRate ? 'animate-spin' : ''}`} />
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => { setCurrency('GHS'); setStep(2); }}
                      className="flex-1 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all"
                    >
                      Pay in Cedi (₵)
                    </button>
                    <button 
                      onClick={() => { setCurrency('USD'); setStep(2); }}
                      className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-lg"
                    >
                      Pay in Dollar ($)
                    </button>
                  </div>
                </div>
              )}

              {/* --- STEP 2: DYNAMIC PAYMENT DETAILS --- */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">2</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Payment Details</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {currency === 'GHS' ? (
                      ['MTN', 'Telecel', 'Airtel'].map((net) => (
                        <button key={net} className="py-3 rounded-xl border-2 border-red-800 bg-red-50 text-[9px] font-black uppercase">{net}</button>
                      ))
                    ) : (
                      <>
                        <button className="py-3 rounded-xl border-2 border-red-800 bg-red-50 flex flex-col items-center"><CreditCard className="w-4 h-4"/><span className="text-[8px] font-black uppercase">Card</span></button>
                        <button className="py-3 rounded-xl border-2 border-slate-100 flex flex-col items-center opacity-40 cursor-not-allowed"><Apple className="w-4 h-4"/><span className="text-[8px] font-black uppercase">Apple Pay</span></button>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Full Name" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm" /></div>
                    <div className="relative">
                      {currency === 'GHS' ? <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /> : <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
                      <input type="text" placeholder={currency === 'GHS' ? "MoMo Number" : "Email Address / Card Info"} className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm" />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button onClick={() => setStep(1)} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px]">Back</button>
                    <button onClick={handlePay} className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase text-sm shadow-xl shadow-red-200 active:scale-95 transition-all">
                      Confirm {currency === 'GHS' ? `₵${currentTotalGHS.toLocaleString()}` : `$${currentTotalUSD.toFixed(2)}`}
                    </button>
                  </div>
                </div>
              )}

              {/* --- STEP 3: SUCCESS --- */}
              {step === 3 && (
                <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12" /></div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">THANK YOU!</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-8">
                    Your sponsorship of {selectedAmount.toLocaleString()} books for {currency === 'GHS' ? `₵${currentTotalGHS}` : `$${currentTotalUSD.toFixed(2)}`} has been recorded.
                  </p>
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