// src/components/DonationModal.tsx
import React, { useState } from 'react';
import { 
  X, Heart, ChevronRight, Wallet, CheckCircle2, 
  User, Phone, ShieldCheck, CreditCard, Apple, Loader2 
} from 'lucide-react';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');

  // --- PRICING LOGIC ---
  const pricePerBookGHS = 1.35; // ₵1.35 per book
  const exchangeRate = 14.50;   // 1 USD = 14.50 GHS
  
  if (!isOpen) return null;

  const totalGHS = selectedAmount * pricePerBookGHS;
  const totalUSD = totalGHS / exchangeRate;
  
  const displayTotal = currency === 'GHS' 
    ? `₵${totalGHS.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `$${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
      setSelectedAmount(50);
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
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              {isProcessing ? 'Connecting Gateway...' : `Step ${step} of 3 • Building with you`}
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
              <p className="text-sm font-black uppercase tracking-widest text-slate-900 text-center">
                {currency === 'GHS' ? 'Awaiting MoMo Prompt...' : 'Verifying Card Payment...'}
              </p>
            </div>
          ) : (
            <>
              {/* --- STEP 1: AMOUNT & CURRENCY --- */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">1</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Select Amount</h3>
                  </div>
                  
                  <div className="flex justify-center p-1 bg-slate-100 rounded-2xl">
                    <button 
                      onClick={() => setCurrency('GHS')} 
                      className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'GHS' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-400'}`}
                    >
                      Ghana Cedi (₵)
                    </button>
                    <button 
                      onClick={() => setCurrency('USD')} 
                      className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'USD' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-400'}`}
                    >
                      US Dollar ($)
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[50, 100, 500, 1000].map((num) => (
                      <button 
                        key={num} 
                        onClick={() => setSelectedAmount(num)} 
                        className={`py-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${selectedAmount === num ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-slate-50'}`}
                      >
                        <span className="text-xl font-black">{num}</span>
                        <span className="text-[9px] font-black uppercase text-slate-400">Books</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-green-700 p-5 rounded-2xl text-center text-white shadow-lg">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Contribution Total</p>
                    <p className="text-3xl font-black">{displayTotal}</p>
                  </div>

                  <button 
                    onClick={() => setStep(2)} 
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm"
                  >
                    Next Step <ChevronRight className="w-4 h-4 ml-2 inline"/>
                  </button>
                </div>
              )}

              {/* --- STEP 2: PAYMENT METHOD --- */}
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
                        <button className="py-3 rounded-xl border-2 border-red-800 bg-red-50 flex flex-col items-center">
                          <CreditCard className="w-4 h-4"/><span className="text-[8px] font-black uppercase">Card</span>
                        </button>
                        <button className="py-3 rounded-xl border-2 border-slate-100 flex flex-col items-center">
                          <Apple className="w-4 h-4"/><span className="text-[8px] font-black uppercase">Apple Pay</span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="Full Name" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm" />
                    </div>
                    <div className="relative">
                      {currency === 'GHS' ? (
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      ) : (
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      )}
                      <input 
                        type="text" 
                        placeholder={currency === 'GHS' ? "MoMo Number" : "Card No. / Email"} 
                        className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm" 
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button onClick={() => setStep(1)} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px]">Back</button>
                    <button onClick={handlePay} className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase text-sm shadow-xl hover:bg-red-900">Confirm {displayTotal}</button>
                  </div>
                </div>
              )}

              {/* --- STEP 3: SUCCESS --- */}
              {step === 3 && (
                <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">THANK YOU!</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-8">
                    Your sponsorship of {selectedAmount} books for {displayTotal} has been recorded.
                  </p>
                  <button onClick={handleClose} className="w-full py-4 border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase text-xs">Close Window</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}