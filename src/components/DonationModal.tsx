// src/components/DonationModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  X, Heart, ChevronRight, CheckCircle2,
  User, Phone, CreditCard, Loader2, RefreshCw, Minus, Plus
} from 'lucide-react';
import Paystack from '@paystack/inline-js';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // --- STATE ---
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [payMethod, setPayMethod] = useState<'LOCAL' | 'FOREIGN'>('LOCAL');
  
  // --- CURRENCY LOGIC ---
  const pricePerBookGHS = 1.00; 
  const [exchangeRate, setExchangeRate] = useState(15.20); 
  const [isFetchingRate, setIsFetchingRate] = useState(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- REFINED INCREMENT LOGIC ---
  const adjust = (direction: 'up' | 'down') => {
    setSelectedAmount((prev) => {
      if (direction === 'up') return Math.min(200,000, prev + 1);
      return Math.max(1, prev - 1);
    });
  };

  const stopAdjusting = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  };

  const startAdjusting = (direction: 'up' | 'down') => {
    stopAdjusting();
    // Immediate single tap increment
    adjust(direction);
    // Start fast auto-scroll only after 400ms hold
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => adjust(direction), 60);
    }, 400);
  };

  useEffect(() => {
    if (isOpen) {
      setIsFetchingRate(true);
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
          if (data?.rates?.GHS) setExchangeRate(data.rates.GHS);
          setIsFetchingRate(false);
        })
        .catch(() => setIsFetchingRate(false));
    }
    return () => stopAdjusting();
  }, [isOpen]);

  if (!isOpen) return null;

  const totalGHS = selectedAmount * pricePerBookGHS;
  const totalUSD = totalGHS / (exchangeRate || 15.20);

  const handlePay = () => {
    if (selectedAmount < 1 || !firstName || !lastName || !contactInfo) {
      alert('Please fill in all required fields');
      return;
    }
    setIsProcessing(true);
    try {
      const amountInPesewas = Math.round(totalGHS * 100);
      const email = payMethod === 'FOREIGN' 
        ? contactInfo.trim() 
        : `${contactInfo.replace(/[^0-9]/g, '') || '0000000000'}@momo.com`;

      const popup = new Paystack();
      popup.newTransaction({
        key: 'pk_test_0384219b0cda58507d42d42605bf6844211579cb',
        email,
        amount: amountInPesewas,
        currency: 'GHS',
        reference: 'BOOK_' + Date.now(),
        channels: ['card', 'mobile_money', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: "Donor Name", variable_name: "donor_name", value: `${firstName} ${lastName}` },
            { display_name: "Books Sponsored", variable_name: "books_count", value: selectedAmount.toString() }
          ]
        },
        onSuccess: () => {
          setIsProcessing(false);
          setStep(3);
        },
        onCancel: () => setIsProcessing(false),
        onError: () => {
          setIsProcessing(false);
          alert('Error processing payment.');
        }
      });
    } catch (error) {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setPayMethod('LOCAL');
      setSelectedAmount(500);
      setFirstName('');
      setLastName('');
      setContactInfo('');
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm font-sans tracking-tight">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col border border-white/20">
        
        {/* NDC GREEN HEADER */}
        <div className="bg-green-700 p-5 md:p-6 text-white flex justify-between items-center shrink-0">
          <div className="text-left">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter">Support Project</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mt-1">Generational Impact • Obiara Ka Ho</p>
          </div>
          {!isProcessing && (
            <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-all text-white active:scale-90">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-10 h-10 text-green-700 animate-spin" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 italic">Syncing Gateway...</p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-700 text-white font-black text-[10px]">1</span>
                    <h3 className="text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-slate-900 via-green-700 to-slate-900 bg-clip-text text-transparent">Select Number of Books</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[500, 1000, 5000, 10000].map((num) => (
                      <button 
                        key={num} 
                        onClick={() => setSelectedAmount(num)} 
                        className={`py-3 rounded-xl border-2 font-black text-[10px] transition-all ${selectedAmount === num ? 'border-green-700 bg-green-50 text-green-700 shadow-sm' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100'}`}
                      >
                        {num.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 px-5 py-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <div className="flex justify-between items-center">
                      {/* TIGHT TYPOGRAPHY: Number & Books together */}
                      <div className="flex items-center gap-1.5">
                        <input 
                          type="text"
                          inputMode="numeric"
                          value={selectedAmount === 0 ? "" : selectedAmount.toLocaleString()}
                          onChange={(e) => {
                            const val = parseInt(e.target.value.replace(/,/g, ''));
                            setSelectedAmount(isNaN(val) ? 0 : val);
                          }}
                          className="bg-transparent text-3xl font-black text-slate-900 outline-none w-[110px] tracking-tighter"
                          style={{ fontSize: '32px' }}
                        />
                        <span className="text-3xl font-black text-slate-900 tracking-tighter">BOOKS</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onMouseDown={() => startAdjusting('down')} onTouchStart={() => startAdjusting('down')}
                          onMouseUp={stopAdjusting} onMouseLeave={stopAdjusting} onTouchEnd={stopAdjusting}
                          className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm active:scale-90 transition-transform"
                        >
                          <Minus className="w-5 h-5" strokeWidth={3} />
                        </button>
                        <button 
                          onMouseDown={() => startAdjusting('up')} onTouchStart={() => startAdjusting('up')}
                          onMouseUp={stopAdjusting} onMouseLeave={stopAdjusting} onTouchEnd={stopAdjusting}
                          className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm active:scale-90 transition-transform"
                        >
                          <Plus className="w-5 h-5" strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                    <input type="range" min="1" max="200000" step="1" value={selectedAmount} onChange={(e) => setSelectedAmount(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-700" />
                  </div>

                  {/* NDC GREEN ESTIMATION CARD */}
                  <div className="bg-green-700 p-6 rounded-[2rem] text-center text-white shadow-xl shadow-green-100 relative overflow-hidden">
                    <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">Estimated Contribution</p>
                    <p className="relative z-10 text-3xl font-black tracking-tight">₵{totalGHS.toLocaleString()}</p>
                    <p className="relative z-10 text-[9px] font-bold tracking-widest text-white/40 uppercase mt-1">≈ ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</p>
                  </div>

                  {/* NDC RED PROCEED BUTTON */}
                  <button 
                    onClick={() => setStep(2)} 
                    className="group relative w-full py-4.5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl transition-all duration-300 hover:bg-red-700 active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
                    style={{ animation: 'breathing-red 2.5s infinite ease-in-out' }}
                  >
                    <div className="absolute inset-0 w-1/3 h-full bg-white/10 skew-x-[-25deg] -translate-x-[250%] group-hover:animate-[shimmer-btn_1.5s_infinite]" />
                    <span className="relative z-10">Proceed to Payment</span>
                    <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              )}

              {/* STEP 2: DONOR INFO */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-700 text-white font-black text-[10px]">2</span>
                    <h3 className="text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-slate-900 via-green-700 to-slate-900 bg-clip-text text-transparent">Sponsor Identity</h3>
                  </div>

                  <div className="flex p-1 bg-slate-100 rounded-2xl">
                    <button onClick={() => setPayMethod('LOCAL')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${payMethod === 'LOCAL' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-400'}`}>Local (MoMo)</button>
                    <button onClick={() => setPayMethod('FOREIGN')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${payMethod === 'FOREIGN' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-400'}`}>Foreign (Card)</button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full h-14 px-5 bg-slate-50 border-none rounded-2xl font-black text-base outline-none focus:ring-2 focus:ring-green-700/10 transition-all" style={{ fontSize: '16px' }} />
                      <input type="text" placeholder="Surname" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full h-14 px-5 bg-slate-50 border-none rounded-2xl font-black text-base outline-none focus:ring-2 focus:ring-green-700/10 transition-all" style={{ fontSize: '16px' }} />
                    </div>
                    <input type="text" placeholder={payMethod === 'LOCAL' ? "Phone Number" : "Email Address"} value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full h-14 px-5 bg-slate-50 border-none rounded-2xl font-black text-base outline-none focus:ring-2 focus:ring-green-700/10 transition-all" style={{ fontSize: '16px' }} />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button onClick={() => setStep(1)} className="w-1/3 py-5 border border-slate-100 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-400 active:scale-95 transition-all">Back</button>
                    <button 
                      onClick={handlePay} 
                      disabled={!firstName || !lastName || !contactInfo}
                      className={`group relative w-2/3 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all duration-300 active:scale-95 overflow-hidden ${(!firstName || !lastName || !contactInfo) ? 'bg-slate-100 text-slate-300' : 'bg-red-600 text-white shadow-red-100'}`}
                      style={{ animation: (!firstName || !lastName || !contactInfo) ? 'none' : 'breathing-red 2s infinite ease-in-out' }}
                    >
                      <div className="absolute inset-0 w-1/3 h-full bg-white/10 skew-x-[-25deg] -translate-x-[250%] group-hover:animate-[shimmer-btn_1.5s_infinite]" />
                      <span className="relative z-10">Confirm Donation</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS */}
              {step === 3 && (
                <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">Success</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto mb-10 italic">Your sponsorship is a generational investment recorded for the future.</p>
                  <button onClick={handleClose} className="w-full py-5 border border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all hover:bg-slate-50">Close Portal</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathing-red {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgb(206 17 38 / 0.1); }
          50% { transform: scale(1.02); box-shadow: 0 20px 25px -5px rgb(206 17 38 / 0.2); }
        }
        @keyframes shimmer-btn {
          0% { transform: skewX(-25deg) translateX(-200%); }
          100% { transform: skewX(-25deg) translateX(300%); }
        }
      `}} />
    </div>
  );
}