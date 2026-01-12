// src/components/donation/DetailsStep.tsx
import React, { useState } from 'react';
import { User, Phone, ShieldCheck, CreditCard, Apple } from 'lucide-react';

interface DetailsStepProps {
  currency: 'GHS' | 'USD';
  selectedAmount: number;
  totalCost: number;
  onBack: () => void;
  onPay: () => void;
}

export function DetailsStep({ currency, selectedAmount, totalCost, onBack, onPay }: DetailsStepProps) {
  const [paymentMethod, setPaymentMethod] = useState(currency === 'GHS' ? 'MTN' : 'CARD');

  // Payment Option Configurations
  const momoNetworks = [
    { id: 'MTN', name: 'MTN', color: 'bg-yellow-400' },
    { id: 'Telecel', name: 'Telecel', color: 'bg-red-600' },
    { id: 'AirtelTigo', name: 'AirtelTigo', color: 'bg-blue-600' }
  ];

  const internationalMethods = [
    { id: 'CARD', name: 'Visa / Master', icon: CreditCard, color: 'text-slate-700' },
    { id: 'APPLE', name: 'Apple Pay', icon: Apple, color: 'text-black' }
  ];

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">2</span>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Payment Method</h3>
      </div>

      {/* Summary Summary */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-3xl">
        <div className="flex justify-between items-center">
          <span className="font-black text-green-700 uppercase text-[11px] tracking-widest">Amount to Pay</span>
          <span className="text-xl font-black text-green-700">{currency === 'GHS' ? '₵' : '$'}{totalCost.toLocaleString()}</span>
        </div>
      </div>

      {/* Conditional Payment Selection */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          {currency === 'GHS' ? 'Select Network' : 'Select Method'}
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {currency === 'GHS' ? (
            momoNetworks.map((net) => (
              <button
                key={net.id}
                onClick={() => setPaymentMethod(net.id)}
                className={`py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === net.id ? 'border-red-800 bg-red-50' : 'border-slate-100 bg-white'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${net.color}`} />
                <span className="text-[9px] font-black uppercase tracking-tighter">{net.name}</span>
              </button>
            ))
          ) : (
            internationalMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`py-3 px-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === method.id ? 'border-red-800 bg-red-50' : 'border-slate-100 bg-white'
                }`}
              >
                <method.icon className={`w-4 h-4 ${method.color}`} />
                <span className="text-[9px] font-black uppercase tracking-tighter">{method.name}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Inputs - Fixed at 16px to prevent iOS zoom */}
      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800 font-bold text-base" 
            style={{ fontSize: '16px' }}
          />
        </div>
        
        <div className="relative">
          {currency === 'GHS' ? (
            <>
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="tel" 
                placeholder="MoMo Number" 
                className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800 font-bold text-base" 
                style={{ fontSize: '16px' }}
              />
            </>
          ) : (
            <>
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Card Number or Email" 
                className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800 font-bold text-base" 
                style={{ fontSize: '16px' }}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 px-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
        <ShieldCheck className="w-3 h-3 text-green-600" /> 
        {currency === 'GHS' ? 'Verified Gateway' : 'Secure Processing'}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-3">
        <button onClick={onBack} className="order-2 sm:order-1 w-full sm:w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50">Back</button>
        <button 
          onClick={onPay}
          className="order-1 sm:order-2 w-full sm:w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-red-200 hover:bg-red-900 transition-all active:scale-95"
        >
          {currency === 'GHS' ? 'Donate Now' : 'Donate Now'}
        </button>
      </div>
    </div>
  );
}