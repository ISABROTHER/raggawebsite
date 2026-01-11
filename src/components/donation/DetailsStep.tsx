// src/components/donation/DetailsStep.tsx
import React, { useState } from 'react';
import { Wallet, User, Phone, ShieldCheck } from 'lucide-react';

interface DetailsStepProps {
  currency: 'GHS' | 'USD';
  selectedAmount: number;
  totalCost: number;
  onBack: () => void;
  onPay: (details: any) => void;
}

export function DetailsStep({ currency, selectedAmount, totalCost, onBack, onPay }: DetailsStepProps) {
  const [provider, setProvider] = useState('MTN');

  const networks = [
    { id: 'MTN', name: 'MTN MoMo', color: 'bg-yellow-400' },
    { id: 'Telecel', name: 'Telecel Cash', color: 'bg-red-600' },
    { id: 'AirtelTigo', name: 'AirtelTigo', color: 'bg-blue-600' }
  ];

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">2</span>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Payment Details</h3>
      </div>

      {/* Summary Badge */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-3xl">
        <div className="flex justify-between items-center">
          <span className="font-black text-green-700 uppercase text-[11px] tracking-widest">Amount to Pay</span>
          <span className="text-xl font-black text-green-700">{currency === 'GHS' ? '₵' : '$'}{totalCost.toLocaleString()}</span>
        </div>
      </div>

      {/* Network Provider Selection */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Select Network</label>
        <div className="grid grid-cols-3 gap-2">
          {networks.map((net) => (
            <button
              key={net.id}
              onClick={() => setProvider(net.id)}
              className={`py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                provider === net.id ? 'border-red-800 bg-red-50' : 'border-slate-100 bg-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${net.color}`} />
              <span className="text-[9px] font-black uppercase tracking-tighter">{net.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Full Name" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800 font-bold text-sm" />
        </div>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="tel" placeholder="Mobile Money Number" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800 font-bold text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-2 px-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
        <ShieldCheck className="w-3 h-3 text-green-600" /> Secure Payment via Paystack/MoMo
      </div>

      <div className="pt-4 flex gap-3">
        <button onClick={onBack} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50">Back</button>
        <button 
          onClick={onPay}
          className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-red-200 hover:bg-red-900 transition-all active:scale-95"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}