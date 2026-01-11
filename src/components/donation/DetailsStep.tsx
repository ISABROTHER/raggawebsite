import React from 'react';
import { Wallet, User } from 'lucide-react';

interface DetailsStepProps {
  currency: 'GHS' | 'USD';
  selectedAmount: number;
  totalCost: number;
  onBack: () => void;
  onPay: () => void;
}

export function DetailsStep({ currency, selectedAmount, totalCost, onBack, onPay }: DetailsStepProps) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">2</span>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Payment Details</h3>
      </div>

      <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-5 rounded-3xl mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-5 h-5 text-green-600" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Summary</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-slate-600 uppercase text-[10px] tracking-widest">Sponsorship</span>
            <span className="font-black text-slate-900 uppercase tracking-tight">{selectedAmount} Books</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="font-black text-green-700 uppercase text-[11px] tracking-widest">Total</span>
            <span className="text-xl font-black text-green-700">{currency === 'GHS' ? '₵' : '$'}{totalCost.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Full Name" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm" />
        </div>
        <div className="relative">
          <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Phone Number / Email" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm" />
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <button onClick={onBack} className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50">Back</button>
        <button 
          onClick={onPay}
          className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-red-200 hover:bg-red-900 transition-all"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}