// src/components/DonationModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, Heart, ChevronRight, Wallet, CheckCircle2, 
  User, Phone, ShieldCheck, CreditCard, Apple, Loader2, BarChart3, RefreshCw 
} from 'lucide-react';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');
  
  // --- CURRENCY LOGIC ---
  const pricePerBookGHS = 1.35; // One book = 1 Cedi 35 Pesewas
  const exchangeRate = 14.50; // Manual rate (1 USD = 14.50 GHS) - update this as needed
  
  if (!isOpen) return null;

  // Calculate total in GHS first
  const totalGHS = selectedAmount * pricePerBookGHS;
  // Convert to USD if needed
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
        
        {/* Header */}
        <div className="bg-red-800 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Support The Project</h2>
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
              <p className="text-sm font-black uppercase tracking-widest text-slate-900">
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
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Sponsorship Amount</h3>
                  </div>
                  
                  <div className="flex justify-center p-1 bg-slate-100 rounded-2xl">
                    <button onClick={() => setCurrency('GHS')} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'GHS' ? 'bg-white text-green-700 shadow-sm scale-[1.02]' : 'text-slate-400'}`}>Ghana Cedi (₵)</button>
                    <button onClick={() => setCurrency('USD')} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'USD' ? 'bg-white text-green-700 shadow-sm scale-[1.02]' : 'text-slate-400'}`}>US Dollar ($)</button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[50, 100, 500, 1000].map((num) => (
                      <button key={num} onClick={() => setSelectedAmount(num)} className={`py-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${selectedAmount === num ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-slate-50 hover:border-green-300'}`}>
                        <span className={`text-xl font-black ${selectedAmount === num ? 'text-green-700' : 'text-slate-900'}`}>{num}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Books</span>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Cost Box */}
                  <div className="bg-green-700 p-5 rounded-2xl text-center text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      <RefreshCw className="w-12 h-12" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-1">Total Contribution</p>
                    <p className="text-3xl font-black text-white">{displayTotal}</p>
                    {currency === 'USD' && (
                      <p className="text-[9px] font-bold mt-2 text-white/60 uppercase">
                        Rate: 1 USD = {exchangeRate} GHS
                      </p>
                    )}
                  </div>

                  <button onClick={() => setStep(2)} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-slate-800 transition-all">
                    Next Step <ChevronRight className="w-4 h-4 ml-2 inline"/>
                  </button>
                </div>
              )}

              {/* --- STEP 2: PAYMENT METHOD (UNCHANGED LOGIC) --- */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">2</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Payment Details</h3>
                  </div>
                  
                  {/* Summary for Donor */}
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-3xl flex justify-between items-center">
                    <span className="font-black text-green-700 uppercase text-[10px] tracking-widest">{selectedAmount} Books</span>
                    <span className="text-xl font-black text-green-700">{displayTotal}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {currency === 'GHS' ? (
                      ['MTN', 'Telecel', 'Airtel'].map((net) => (
                        <button key={net} className="py-3 rounded-xl border-2 border-red-800 bg-red-50 text-[9px] font-black uppercase">{net}</button>
                      ))
                    ) : (
                      <>
                        <button className="py-3 rounded-xl border-2 border-red-800 bg-red-50 flex flex-col items-center"><CreditCard className="w-4 h-4"/><span className="text-[8px] font-black uppercase">Card</span></button>
                        <button className="py-3 rounded-xl border-2 border-slate-100 flex flex-col items-center"><Apple className="w-4 h-4"/><span className="text-[8px] font-black uppercase">Apple Pay</span></button>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Full Name" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm" /></div>
                    <div className="relative">
                      {currency === 'GHS' ? <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /> : <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}