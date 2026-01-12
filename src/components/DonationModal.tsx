// src/components/DonationModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  X, ChevronRight, CheckCircle2,
  Minus, Plus, Loader2
} from 'lucide-react';
import Paystack from '@paystack/inline-js';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // --- STATE ---
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [payMethod, setPayMethod] = useState<'LOCAL' | 'FOREIGN'>('LOCAL');
  
  // --- CURRENCY LOGIC ---
  const pricePerBookGHS = 1.00; 
  const [exchangeRate, setExchangeRate] = useState(15.20); 
  const [isFetchingRate, setIsFetchingRate] = useState(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAdjusting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAdjusting = (direction: 'up' | 'down') => {
    stopAdjusting();
    const adjust = () => {
      setSelectedAmount((prev) => {
        if (direction === 'up') return Math.min(200000, prev + 1);
        return Math.max(1, prev - 1);
      });
    };
    adjust();
    intervalRef.current = setInterval(adjust, 70);
  };

  useEffect(() => {
    if (isOpen) {
      setIsFetchingRate(true);
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
          if (data?.rates?.GHS) setExchangeRate(data.rates.GHS);
          setIsFetchingRate(false)
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
        reference: 'BOOK_' + Date.now() + Math.floor(Math.random() * 1000000),
        channels: ['card', 'mobile_money', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: "Donor Name", variable_name: "donor_name", value: `${firstName} ${lastName}` },
            { display_name: "Books Sponsored", variable_name: "books_count", value: selectedAmount.toString() },
            { display_name: "Payment Method", variable_name: "payment_method", value: payMethod },
            { display_name: "Contact", variable_name: "contact", value: contactInfo }
          ]
        },
        onSuccess: (transaction: any) => {
          setIsProcessing(false);
          setStep(3);
        },
        onCancel: () => setIsProcessing(false),
        onError: () => {
          setIsProcessing(false);
          alert('There was an error processing your payment.');
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
      setSelectedAmount(1);
      setFirstName('');
      setLastName('');
      setContactInfo('');
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm font-sans">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col border border-white/20">
        
        {/* Header */}
        <div className="bg-red-800 p-5 md:p-6 text-white flex justify-between items-center shrink-0">
          <div className="pr-4 text-left">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight uppercase">Support Project</h2>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80 mt-1 leading-tight">
              Generational Impact for our Future
            </p>
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
              <Loader2 className="w-12 h-12 text-red-800 animate-spin" />
              <p className="text-sm font-bold uppercase tracking-widest text-slate-900">Connecting to Gateway...</p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-800 text-white font-bold text-[10px]">1</span>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">Select Impact</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[500, 1000, 5000, 10000].map((num) => (
                      <button 
                        key={num} 
                        onClick={() => setSelectedAmount(num)} 
                        className={`py-4 rounded-2xl border-2 font-bold text-xs transition-all ${selectedAmount === num ? 'border-red-800 bg-red-50 text-red-800 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                      >
                        {num.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 px-5 py-7 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-baseline gap-2">
                        <input 
                          type="text"
                          value={selectedAmount === 0 ? "" : selectedAmount.toLocaleString()}
                          onChange={(e) => {
                            const val = parseInt(e.target.value.replace(/,/g, ''));
                            setSelectedAmount(isNaN(val) ? 0 : val);
                          }}
                          className="bg-transparent text-3xl font-bold text-slate-900 outline-none w-24 md:w-32 tracking-tighter"
                          placeholder="0"
                          style={{ fontSize: '16px' }}
                        />
                        <span className="text-2xl font-bold text-slate-900 tracking-tighter uppercase">BOOKS</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onMouseDown={() => startAdjusting('down')} onTouchStart={() => startAdjusting('down')} onMouseUp={stopAdjusting} onTouchEnd={stopAdjusting} className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-red-800 shadow-sm active:scale-90 transition-all"><Minus className="w-5 h-5" /></button>
                        <button onMouseDown={() => startAdjusting('up')} onTouchStart={() => startAdjusting('up')} onMouseUp={stopAdjusting} onTouchEnd={stopAdjusting} className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-red-800 shadow-sm active:scale-90 transition-all"><Plus className="w-5 h-5" /></button>
                      </div>
                    </div>
                    <input type="range" min="1" max="200000" step="1" value={selectedAmount} onChange={(e) => setSelectedAmount(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-800" />
                  </div>

                  <div className="bg-slate-900 px-6 py-6 rounded-[2.5rem] text-center text-white shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-800/10 opacity-50" />
                    <p className="relative z-10 text-lg md:text-xl font-bold uppercase tracking-tight">
                      Total: ₵{totalGHS.toLocaleString()}
                    </p>
                    <div className="relative z-10 mt-1 flex items-center justify-center gap-1 opacity-60">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                        ≈ ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => selectedAmount >= 1 && setStep(2)} 
                    disabled={selectedAmount < 1}
                    className="group relative w-full py-5 bg-red-800 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-sm shadow-xl transition-all duration-300 hover:bg-red-700 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ animation: selectedAmount >= 1 ? 'intense-pulse 2s infinite' : 'none' }}
                  >
                    <div className="absolute inset-0 w-1/3 h-full bg-white/10 skew-x-[-25deg] -translate-x-[200%] group-hover:animate-[shimmer-fast_1.2s_infinite]" />
                    <span className="relative z-10">Proceed to Details</span>
                    <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-800 text-white font-bold text-[10px]">2</span>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">Sponsor Info</h3>
                  </div>

                  <div className="flex p-1 bg-slate-100 rounded-2xl relative">
                    <button onClick={() => setPayMethod('LOCAL')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all z-10 ${payMethod === 'LOCAL' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Local (MoMo)</button>
                    <button onClick={() => setPayMethod('FOREIGN')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all z-10 ${payMethod === 'FOREIGN' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Foreign (Card)</button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-red-800/10" style={{ fontSize: '16px' }} />
                      <input type="text" placeholder="Surname" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-red-800/10" style={{ fontSize: '16px' }} />
                    </div>
                    <input type="text" placeholder={payMethod === 'LOCAL' ? "MoMo Number" : "Email Address"} value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-red-800/10" style={{ fontSize: '16px' }} />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button onClick={() => setStep(1)} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-colors">Back</button>
                    <button 
                      onClick={handlePay} 
                      disabled={!firstName || !lastName || !contactInfo}
                      className={`group relative w-2/3 py-5 rounded-2xl font-bold uppercase text-sm shadow-xl transition-all duration-300 overflow-hidden active:scale-95 ${(!firstName || !lastName || !contactInfo) ? 'bg-slate-200 text-slate-400' : 'bg-red-800 text-white hover:bg-red-700 shadow-red-900/20'}`}
                      style={{ animation: (!firstName || !lastName || !contactInfo) ? 'none' : 'intense-pulse 2s infinite' }}
                    >
                      <div className="absolute inset-0 w-1/3 h-full bg-white/10 skew-x-[-25deg] -translate-x-[200%] group-hover:animate-[shimmer-fast_1.2s_infinite]" />
                      <span className="relative z-10">Confirm ₵{totalGHS.toLocaleString()}</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-2">Thank You,<br/>{firstName} {lastName}!</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto mb-8 italic">Your sponsorship of {selectedAmount.toLocaleString()} books is a generational investment.</p>
                  <button onClick={handleClose} className="w-full py-5 border-2 border-slate-100 text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Close Portal</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes intense-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgb(153 27 27 / 0.1), 0 0 0 0px rgba(153, 27, 27, 0.2); }
          50% { transform: scale(1.02); box-shadow: 0 20px 25px -5px rgb(153 27 27 / 0.2), 0 0 15px 5px rgba(153, 27, 27, 0.15); }
        }
        @keyframes shimmer-fast {
          0% { transform: skewX(-25deg) translateX(-250%); }
          100% { transform: skewX(-25deg) translateX(350%); }
        }
      `}} />
    </div>
  );
}