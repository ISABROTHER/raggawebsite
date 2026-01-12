// src/components/DonationModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  X, CheckCircle2,
  Minus, Plus, Loader2, CreditCard, Smartphone, Landmark, Apple, Zap, Target, Sparkles
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
  const [payMethod, setPayMethod] = useState<'MOMO' | 'CARD' | 'BANK' | 'APPLE'>('MOMO');
  
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
      const email = payMethod === 'MOMO' 
        ? `${contactInfo.replace(/[^0-9]/g, '') || '0000000000'}@momo.com`
        : contactInfo.trim();

      let channels: string[] = ['card'];
      if (payMethod === 'MOMO') channels = ['mobile_money'];
      if (payMethod === 'BANK') channels = ['bank_transfer'];
      if (payMethod === 'CARD') channels = ['card'];
      if (payMethod === 'APPLE') channels = ['apple_pay'];

      const popup = new Paystack();
      popup.newTransaction({
        key: 'pk_test_0384219b0cda58507d42d42605bf6844211579cb',
        email,
        amount: amountInPesewas,
        currency: 'GHS',
        reference: 'BOOK_' + Date.now() + Math.floor(Math.random() * 1000000),
        channels: channels,
        metadata: {
          custom_fields: [
            { display_name: "Donor", variable_name: "donor", value: `${firstName} ${lastName}` },
            { display_name: "Books", variable_name: "books", value: selectedAmount.toString() }
          ]
        },
        onSuccess: () => {
          setIsProcessing(false);
          setStep(3);
        },
        onCancel: () => setIsProcessing(false),
        onError: () => {
          setIsProcessing(false);
          alert('Payment failed. Please try again.');
        }
      });
    } catch (error) {
      setIsProcessing(false);
      alert('Initialization error.');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setPayMethod('MOMO');
      setSelectedAmount(500);
      setFirstName('');
      setLastName('');
      setContactInfo('');
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/80 backdrop-blur-md transition-all duration-500">
      <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] relative animate-in slide-in-from-bottom-12 duration-500 max-h-[96vh] flex flex-col">
        
        {/* INNOVATIVE HEADER */}
        <div className="bg-gradient-to-br from-red-800 via-red-900 to-black p-6 text-white flex justify-between items-center shrink-0 z-20 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative text-left">
            <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[8px] font-black uppercase tracking-[0.2em] mb-1">Impact Portal</div>
            <h2 className="text-xl font-black uppercase tracking-tighter leading-none">Support Project</h2>
          </div>
          {!isProcessing && (
            <button onClick={handleClose} className="relative z-30 p-3 hover:bg-white/10 rounded-full transition-all text-white active:scale-90">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* HUD SCROLLABLE BODY */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto overscroll-contain bg-white">
          {isProcessing ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-800 blur-2xl opacity-20 animate-pulse" />
                <Loader2 className="w-16 h-16 text-red-800 animate-spin relative" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 animate-pulse">Syncing Secure Gateway</p>
            </div>
          ) : (
            <div className="pb-12 sm:pb-0">
              {/* STEP 1: THE BENTO AMOUNT SELECTOR */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-800">Phase 01</p>
                      <h3 className="text-2xl font-black text-slate-900 leading-none tracking-tighter uppercase italic">Select Impact</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <Target className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  {/* BENTO TIERS */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-3 h-72">
                    {[
                      { val: 500, label: 'Hero', icon: Zap, class: 'col-span-1 row-span-1 border-yellow-400 bg-yellow-50/30' },
                      { val: 1000, label: 'Elite', icon: Sparkles, class: 'col-span-1 row-span-1 border-blue-400 bg-blue-50/30' },
                      { val: 5000, label: 'Visionary', icon: Landmark, class: 'col-span-2 row-span-1 border-red-800 bg-red-50/30' }
                    ].map((tier) => (
                      <button 
                        key={tier.val} 
                        onClick={() => setSelectedAmount(tier.val)} 
                        className={`group relative flex flex-col items-start p-5 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${tier.class} ${selectedAmount === tier.val ? 'ring-4 ring-slate-900/5 scale-[0.98]' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`}
                      >
                        <div className={`p-2 rounded-xl mb-3 transition-all ${selectedAmount === tier.val ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400'}`}>
                          <tier.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{tier.label}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black tracking-tighter text-slate-900">{tier.val.toLocaleString()}</span>
                          <span className="text-[9px] font-black text-slate-400 uppercase">Books</span>
                        </div>
                        {selectedAmount === tier.val && (
                           <div className="absolute top-0 right-0 p-4 animate-in zoom-in duration-300">
                             <div className="w-2 h-2 rounded-full bg-red-800 animate-ping" />
                           </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* DYNAMIC DIGITAL COUNTER HUD */}
                  <div className="relative group p-8 bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-800/10 via-transparent to-green-700/10" />
                    <div className="relative flex flex-col items-center text-center space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Total Contribution</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-black text-green-400 mr-2">₵</span>
                        <span className="text-5xl font-black tracking-tighter text-white tabular-nums">
                          {totalGHS.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                         <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                           <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">≈ ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setStep(2)} className="group relative w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl active:scale-95 transition-all overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    Proceed to Sync
                  </button>
                </div>
              )}

              {/* STEP 2: PAYMENT ROUTING */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="flex items-center gap-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-800">Phase 02</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Payment Method</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setPayMethod('MOMO')} className={`flex flex-col items-center gap-2 p-5 rounded-[2rem] border-2 transition-all ${payMethod === 'MOMO' ? 'border-yellow-400 bg-yellow-50 text-slate-900' : 'border-slate-50 text-slate-400 grayscale opacity-50'}`}>
                      <div className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center text-white"><Smartphone className="w-5 h-5" /></div>
                      <span className="text-[9px] font-black uppercase tracking-widest">MoMo</span>
                    </button>
                    <button onClick={() => setPayMethod('CARD')} className={`flex flex-col items-center gap-2 p-5 rounded-[2rem] border-2 transition-all ${payMethod === 'CARD' ? 'border-blue-600 bg-blue-50 text-slate-900' : 'border-slate-50 text-slate-400 grayscale opacity-50'}`}>
                      <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white"><CreditCard className="w-5 h-5" /></div>
                      <span className="text-[9px] font-black uppercase tracking-widest">Card</span>
                    </button>
                    <button onClick={() => setPayMethod('BANK')} className={`flex flex-col items-center gap-2 p-5 rounded-[2rem] border-2 transition-all ${payMethod === 'BANK' ? 'border-red-600 bg-red-50 text-slate-900' : 'border-slate-50 text-slate-400 grayscale opacity-50'}`}>
                      <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white"><Landmark className="w-5 h-5" /></div>
                      <span className="text-[9px] font-black uppercase tracking-widest">Bank</span>
                    </button>
                    <button onClick={() => setPayMethod('APPLE')} className={`flex flex-col items-center gap-2 p-5 rounded-[2rem] border-2 transition-all ${payMethod === 'APPLE' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-50 text-slate-400 grayscale opacity-50'}`}>
                      <div className="w-10 h-10 rounded-2xl bg-white text-slate-900 flex items-center justify-center border border-slate-200"><Apple className="w-5 h-5" /></div>
                      <span className="text-[9px] font-black uppercase tracking-widest">Apple Pay</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">First Name</label>
                        <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] font-bold text-base outline-none focus:ring-2 focus:ring-red-800/10" style={{ fontSize: '16px' }} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Surname</label>
                        <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] font-bold text-base outline-none focus:ring-2 focus:ring-red-800/10" style={{ fontSize: '16px' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">{payMethod === 'MOMO' ? "Mobile Money Number" : "Email Address"}</label>
                      <input type={payMethod === 'MOMO' ? "tel" : "email"} placeholder={payMethod === 'MOMO' ? "024XXXXXXX" : "receipt@email.com"} value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] font-bold text-base outline-none focus:ring-2 focus:ring-red-800/10" style={{ fontSize: '16px' }} />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button onClick={() => setStep(1)} className="order-2 sm:order-1 w-full sm:w-1/3 py-5 border-2 border-slate-100 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest">Back</button>
                    <button onClick={handlePay} className="order-1 sm:order-2 w-full sm:w-2/3 py-5 bg-red-800 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-[0.3em] shadow-xl active:scale-95 transition-all">Confirm Portal</button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS */}
              {step === 3 && (
                <div className="text-center py-12 animate-in zoom-in-95 duration-700">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                    <div className="absolute inset-0 bg-green-100 animate-ping opacity-20 rounded-full" />
                    <CheckCircle2 className="w-12 h-12 relative" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none mb-4">Transmission<br/>Received</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto mb-10 italic">Your generational impact of {selectedAmount.toLocaleString()} books has been logged into the future.</p>
                  <button onClick={handleClose} className="w-full py-6 border-2 border-slate-100 text-slate-900 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-50 active:scale-95 transition-all">Terminate Portal</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}