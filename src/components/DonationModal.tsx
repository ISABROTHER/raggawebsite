// src/components/DonationModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  X, CheckCircle2,
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
  
  // Ref for the long-press interval
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- BUTTON LOGIC ---
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

  // Fetch Rate & Cleanup Interval
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
    return () => stopAdjusting(); // Safety cleanup
  }, [isOpen]);

  if (!isOpen) return null;

  // Constants for display
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
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: `${firstName} ${lastName}`
            },
            {
              display_name: "Books Sponsored",
              variable_name: "books_count",
              value: selectedAmount.toString()
            },
            {
              display_name: "Payment Method",
              variable_name: "payment_method",
              value: payMethod
            },
            {
              display_name: "Contact",
              variable_name: "contact",
              value: contactInfo
            }
          ]
        },
        onSuccess: (transaction) => {
          console.log('Payment successful:', transaction);
          setIsProcessing(false);
          setStep(3);
        },
        onCancel: () => {
          console.log('Payment cancelled');
          setIsProcessing(false);
        },
        onError: (error) => {
          console.error('Payment error:', error);
          setIsProcessing(false);
          alert('There was an error processing your payment. Please try again.');
        }
      });
    } catch (error) {
      setIsProcessing(false);
      console.error('Payment initialization error:', error);
      alert('There was an error initializing payment. Please try again.');
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-red-800 p-5 md:p-6 text-white flex justify-between items-center shrink-0">
          <div className="pr-4 text-left">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight">Support Project</h2>
            <p className="text-[9px] font-bold uppercase tracking-wider text-white/80 mt-1 leading-tight">
              Impact a generational future
            </p>
          </div>
          {!isProcessing && (
            <button onClick={handleClose} className="p-1.5 hover:bg-white/10 rounded-full transition-all text-white">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="p-5 md:p-8 overflow-y-auto">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-red-800 animate-spin" />
              <p className="text-sm font-black uppercase tracking-widest text-slate-900">Processing Payment...</p>
            </div>
          ) : (
            <>
              {/* STEP 1: QUANTITY */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-800 text-white font-black text-[10px]">1</span>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Select Number of Books</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[500, 1000, 5000, 10000].map((num) => (
                      <button 
                        key={num} 
                        onClick={() => setSelectedAmount(num)} 
                        className={`py-3 rounded-xl border-2 font-black text-[10px] transition-all ${selectedAmount === num ? 'border-green-600 bg-green-50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                      >
                        {num.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 px-4 py-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-baseline gap-2 overflow-hidden w-full sm:w-auto justify-center sm:justify-start">
                        <input 
                          type="text"
                          value={selectedAmount === 0 ? "" : selectedAmount.toLocaleString()}
                          onChange={(e) => {
                            const val = parseInt(e.target.value.replace(/,/g, ''));
                            setSelectedAmount(isNaN(val) ? 0 : val);
                          }}
                          className="bg-transparent text-2xl font-black text-slate-900 outline-none w-20 md:w-32 text-center sm:text-left"
                          placeholder="0"
                        />
                        <span className="text-2xl font-black text-slate-900 uppercase">
                          {selectedAmount === 1 ? 'BOOK' : 'BOOKS'}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <button 
                          onMouseDown={() => startAdjusting('down')} onMouseUp={stopAdjusting} onMouseLeave={stopAdjusting}
                          onTouchStart={() => startAdjusting('down')} onTouchEnd={stopAdjusting}
                          className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-red-800 shadow-sm active:scale-90"
                        >
                          <Minus className="w-6 h-6" />
                        </button>
                        <button 
                          onMouseDown={() => startAdjusting('up')} onMouseUp={stopAdjusting} onMouseLeave={stopAdjusting}
                          onTouchStart={() => startAdjusting('up')} onTouchEnd={stopAdjusting}
                          className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-red-800 shadow-sm active:scale-90"
                        >
                          <Plus className="w-6 h-6" />
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

                  <div className="bg-green-700 px-4 py-5 rounded-2xl sm:rounded-[2rem] text-center text-white shadow-lg">
                    <p className="text-base md:text-lg font-black uppercase tracking-tight">
                      {selectedAmount.toLocaleString()} {selectedAmount === 1 ? 'Book' : 'Books'} | ₵{totalGHS.toLocaleString()}
                    </p>
                    {isFetchingRate ? (
                      <div className="mt-1 flex justify-center items-center gap-1 opacity-70">
                        <Loader2 className="w-2 h-2 animate-spin" />
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center justify-center gap-1 opacity-70">
                        <span className="text-[9px] font-bold tracking-widest uppercase">
                          ≈ ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                        </span>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => selectedAmount >= 1 && setStep(2)} 
                    disabled={selectedAmount < 1}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-[0.98] transition-transform"
                  >
                    Proceed to Details
                  </button>
                </div>
              )}

              {/* STEP 2: DONOR INFO */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-800 text-white font-black text-[10px]">2</span>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Sponsor Info</h3>
                  </div>

                  <div className="flex p-1 bg-slate-100 rounded-xl">
                    <button onClick={() => setPayMethod('LOCAL')} className={`flex-1 py-3 rounded-lg font-black text-[10px] uppercase transition-all ${payMethod === 'LOCAL' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Local (MoMo)</button>
                    <button onClick={() => setPayMethod('FOREIGN')} className={`flex-1 py-3 rounded-lg font-black text-[10px] uppercase transition-all ${payMethod === 'FOREIGN' ? 'bg-white text-red-800 shadow-sm' : 'text-slate-400'}`}>Foreign (Card)</button>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input 
                        type="text" placeholder="First Name" value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-red-800/20" 
                      />
                      <input 
                        type="text" placeholder="Surname" value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-red-800/20" 
                      />
                    </div>
                    <input 
                      type="text" 
                      placeholder={payMethod === 'LOCAL' ? "MoMo Number" : "Email Address"} 
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-red-800/20" 
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button onClick={() => setStep(1)} className="order-2 sm:order-1 w-full sm:w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px]">Back</button>
                    <button 
                      onClick={handlePay} 
                      disabled={!firstName || !lastName || !contactInfo}
                      className={`order-1 sm:order-2 w-full sm:w-2/3 py-5 rounded-2xl font-black uppercase text-sm shadow-xl transition-all ${(!firstName || !lastName || !contactInfo) ? 'bg-slate-200 text-slate-400' : 'bg-red-800 text-white active:scale-[0.98]'}`}
                    >
                      Confirm ₵{totalGHS.toLocaleString()}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS */}
              {step === 3 && (
                <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                    THANK YOU,<br/>{firstName} {lastName}!
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-8 italic">
                    Your sponsorship of {selectedAmount.toLocaleString()} {selectedAmount === 1 ? 'book' : 'books'} is a generational investment.
                  </p>
                  <button onClick={handleClose} className="w-full py-5 border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase text-xs hover:bg-slate-50">Close Window</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}