// src/components/DonationModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, Heart, ChevronRight, Wallet, CheckCircle2, 
  User, Phone, ShieldCheck, CreditCard, Apple, Loader2, RefreshCw, Info 
} from 'lucide-react';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');
  
  // --- LIVE CURRENCY STATE ---
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
  
  const displayTotal = currency === 'GHS' 
    ? `₵${totalGHS.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
    : `$${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  // --- INNOVATIVE IDEA: COMPARISON VALUE ---
  const comparisonValue = currency === 'GHS'
    ? `≈ $${totalUSD.toFixed(2)} USD`
    : `≈ ₵${totalGHS.toFixed(2)} GHS`;

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
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Step {step} of 3</p>
          </div>
          {!isProcessing && <button onClick={handleClose} className="text-white"><X className="w-6 h-6" /></button>}
        </div>

        <div className="p-8">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-red-800 animate-spin" />
              <p className="text-sm font-black uppercase tracking-widest text-slate-900">Processing Payment...</p>
            </div>
          ) : (
            <>
              {/* --- STEP 1: AMOUNT & INNOVATIVE COMPARISON --- */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">1</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Select Amount</h3>
                  </div>
                  
                  <div className="flex justify-center p-1 bg-slate-100 rounded-2xl">
                    <button onClick={() => setCurrency('GHS')} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'GHS' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-400'}`}>Ghana Cedi</button>
                    <button onClick={() => setCurrency('USD')} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'USD' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-400'}`}>US Dollar</button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[100, 500, 1000, 5000].map((num) => (
                      <button key={num} onClick={() => setSelectedAmount(num)} className={`py-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${selectedAmount === num ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-white'}`}>
                        <span className="text-xl font-black">{num.toLocaleString()}</span>
                        <span className="text-[9px] font-black uppercase text-slate-400">Books</span>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Cost Box with Comparison */}
                  <div className="bg-green-700 p-5 rounded-2xl text-center text-white shadow-lg relative group">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Your Total Gift</p>
                    <div className="flex flex-col items-center">
                       <p className="text-3xl font-black">{displayTotal}</p>
                       {/* INNOVATIVE COMPARISON TEXT */}
                       <div className="mt-1 flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
                           {comparisonValue}
                         </span>
                         {isFetchingRate && <RefreshCw className="w-2.5 h-2.5 animate-spin text-white/50" />}
                       </div>
                    </div>
                  </div>

                  <button onClick={() => setStep(2)} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm">Proceed to Details</button>
                </div>
              )}

              {/* --- STEP 2: DETAILS --- */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">2</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Confirm Summary</h3>
                  </div>
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-3xl flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sponsoring</span>
                      <span className="font-black text-slate-900">{selectedAmount.toLocaleString()} Books</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Pay</span>
                      <span className="text-xl font-black text-green-700 block leading-none">{displayTotal}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm" />
                    <input type="text" placeholder={currency === 'GHS' ? "MoMo Number" : "Email Address"} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm" />
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button onClick={() => setStep(1)} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px]">Back</button>
                    <button onClick={handlePay} className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase text-sm shadow-xl">Confirm & Pay</button>
                  </div>
                </div>
              )}

              {/* --- STEP 3: SUCCESS --- */}
              {step === 3 && (
                <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12" /></div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">THANK YOU!</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-8">Your sponsorship of {selectedAmount.toLocaleString()} books for {displayTotal} is complete.</p>
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