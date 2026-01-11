// src/components/DonationModal.tsx
import React, { useState } from 'react';
import { 
  X, Heart, ChevronRight, Wallet, CheckCircle2, 
  User, Phone, ShieldCheck, CreditCard, Apple, Loader2 
} from 'lucide-react';

// --- STEP 1: AMOUNT SELECTION ---
function AmountStep({ currency, setCurrency, selectedAmount, setSelectedAmount, totalCost, onNext }: any) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">1</span>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Select Amount</h3>
      </div>
      <div className="flex justify-center p-1 bg-slate-100 rounded-2xl">
        <button onClick={() => setCurrency('GHS')} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'GHS' ? 'bg-white text-green-700 shadow-sm scale-[1.02]' : 'text-slate-400'}`}>Ghana Cedi (₵)</button>
        <button onClick={() => setCurrency('USD')} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'USD' ? 'bg-white text-green-700 shadow-sm scale-[1.02]' : 'text-slate-400'}`}>US Dollar ($)</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[10, 50, 100, 200].map((num) => (
          <button key={num} onClick={() => setSelectedAmount(num)} className={`py-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${selectedAmount === num ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-slate-50 hover:border-green-300'}`}>
            <span className={`text-xl font-black ${selectedAmount === num ? 'text-green-700' : 'text-slate-900'}`}>{num}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Books</span>
          </button>
        ))}
      </div>
      <div className="bg-green-700 p-5 rounded-2xl text-center text-white shadow-lg shadow-green-100">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-100 mb-1">Estimated Contribution</p>
        <p className="text-3xl font-black tracking-tighter text-white">{currency === 'GHS' ? '₵' : '$'}{totalCost.toLocaleString()}</p>
      </div>
      <button onClick={onNext} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">Next: Details <ChevronRight className="w-4 h-4" /></button>
    </div>
  );
}

// --- STEP 2: PAYMENT DETAILS ---
function DetailsStep({ currency, selectedAmount, totalCost, onBack, onPay }: any) {
  const [method, setMethod] = useState(currency === 'GHS' ? 'MTN' : 'CARD');
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">2</span>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Payment Method</h3>
      </div>
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-3xl flex justify-between items-center">
        <span className="font-black text-green-700 uppercase text-[11px] tracking-widest">Amount</span>
        <span className="text-xl font-black text-green-700">{currency === 'GHS' ? '₵' : '$'}{totalCost.toLocaleString()}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {currency === 'GHS' ? (
          ['MTN', 'Telecel', 'Airtel'].map((net) => (
            <button key={net} onClick={() => setMethod(net)} className={`py-3 rounded-xl border-2 text-[9px] font-black uppercase ${method === net ? 'border-red-800 bg-red-50' : 'border-slate-100 bg-white'}`}>{net}</button>
          ))
        ) : (
          ['CARD', 'APPLE'].map((m) => (
            <button key={m} onClick={() => setMethod(m)} className={`py-3 rounded-xl border-2 text-[9px] font-black uppercase ${method === m ? 'border-red-800 bg-red-50' : 'border-slate-100 bg-white'}`}>{m === 'CARD' ? <CreditCard className="w-4 h-4 mx-auto"/> : <Apple className="w-4 h-4 mx-auto"/>}</button>
          ))
        )}
      </div>
      <div className="space-y-3">
        <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Full Name" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm" /></div>
        <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="tel" placeholder={currency === 'GHS' ? "MoMo Number" : "Email/Phone"} className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm" /></div>
      </div>
      <div className="pt-4 flex gap-3">
        <button onClick={onBack} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase tracking-widest text-[10px]">Back</button>
        <button onClick={onPay} className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-red-200">Pay Now</button>
      </div>
    </div>
  );
}

// --- STEP 3: SUCCESS ---
function SuccessStep({ currency, totalCost, onClose }: any) {
  return (
    <div className="text-center py-6 animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12" /></div>
      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">THANK YOU!</h3>
      <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-8">Your contribution of <span className="font-black text-green-700">{currency === 'GHS' ? '₵' : '$'}{totalCost}</span> has been received.</p>
      <button onClick={onClose} className="w-full py-4 border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs">Close</button>
    </div>
  );
}

// --- MAIN ORCHESTRATOR ---
export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');

  if (!isOpen) return null;
  const totalCost = selectedAmount * (currency === 'GHS' ? 10 : 1);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => { setIsProcessing(false); setStep(3); }, 2500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(1); setIsProcessing(false); }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="bg-red-800 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Support Project</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{isProcessing ? 'Verifying...' : `Step ${step} of 3`}</p>
          </div>
          {!isProcessing && <button onClick={handleClose} className="text-white"><X className="w-6 h-6" /></button>}
        </div>
        <div className="p-8">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-red-800 animate-spin" />
              <p className="text-sm font-black uppercase tracking-widest text-slate-900">Awaiting Auth...</p>
            </div>
          ) : (
            <>
              {step === 1 && <AmountStep currency={currency} setCurrency={setCurrency} selectedAmount={selectedAmount} setSelectedAmount={setSelectedAmount} totalCost={totalCost} onNext={() => setStep(2)} />}
              {step === 2 && <DetailsStep currency={currency} selectedAmount={selectedAmount} totalCost={totalCost} onBack={() => setStep(1)} onPay={handlePay} />}
              {step === 3 && <SuccessStep currency={currency} totalCost={totalCost} onClose={handleClose} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}