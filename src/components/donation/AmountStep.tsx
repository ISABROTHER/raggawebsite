// src/components/donation/AmountStep.tsx
import React from 'react';
import { ChevronRight, Zap, Sparkles, Box, Target } from 'lucide-react';

interface AmountStepProps {
  currency: 'GHS' | 'USD';
  setCurrency: (val: 'GHS' | 'USD') => void;
  selectedAmount: number;
  setSelectedAmount: (val: number) => void;
  totalCost: number;
  onNext: () => void;
}

export function AmountStep({ 
  currency, setCurrency, selectedAmount, setSelectedAmount, totalCost, onNext 
}: AmountStepProps) {
  // Innovative Tiers
  const tiers = [
    { amount: 50, label: 'Patron', desc: 'Light Support', icon: Box, grid: 'col-span-1 row-span-1' },
    { amount: 200, label: 'Guardian', desc: 'Class Impact', icon: Zap, grid: 'col-span-1 row-span-1' },
    { amount: 500, label: 'Hero', desc: 'Village Impact', icon: Sparkles, grid: 'col-span-2 row-span-1' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* 01. INNOVATIVE HUD HEADER */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="inline-flex items-center px-2 py-1 rounded-md bg-red-800/10 text-red-800 text-[9px] font-black uppercase tracking-[0.2em] mb-2 border border-red-800/20">
            Step 01 / 03
          </div>
          <h3 className="text-2xl font-black text-slate-900 leading-none uppercase italic tracking-tighter">
            Choose Your <br/>Impact Phase
          </h3>
        </div>
        <div className="flex flex-col items-end">
           <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center mb-1">
             <Target className="w-5 h-5 text-white" />
           </div>
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">HUD ACTIVE</span>
        </div>
      </div>

      {/* 02. CAPSULE CURRENCY SWITCH */}
      <div className="relative p-1.5 bg-slate-100 rounded-[2rem] flex items-center h-16 overflow-hidden border border-slate-200/50">
        <div 
          className={`absolute h-[calc(100%-12px)] w-[calc(50%-6px)] bg-white rounded-[1.75rem] shadow-xl shadow-slate-200 transition-all duration-500 ease-out z-0 ${currency === 'USD' ? 'translate-x-full' : 'translate-x-0'}`}
        />
        <button 
          onClick={() => setCurrency('GHS')}
          className={`relative z-10 flex-1 h-full font-black text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${currency === 'GHS' ? 'text-green-700' : 'text-slate-400'}`}
        >
          Local (₵)
        </button>
        <button 
          onClick={() => setCurrency('USD')}
          className={`relative z-10 flex-1 h-full font-black text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${currency === 'USD' ? 'text-green-700' : 'text-slate-400'}`}
        >
          Global ($)
        </button>
      </div>

      {/* 03. BENTO GRID AMOUNT SELECTION */}
      <div className="grid grid-cols-2 grid-rows-2 gap-3 h-64">
        {tiers.map((tier) => (
          <button
            key={tier.amount}
            onClick={() => setSelectedAmount(tier.amount)}
            className={`relative overflow-hidden group transition-all duration-500 rounded-[2.5rem] border-2 flex flex-col items-start p-6 ${tier.grid} ${
              selectedAmount === tier.amount 
                ? 'border-slate-900 bg-slate-900 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] scale-[0.98]' 
                : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 grayscale hover:grayscale-0 opacity-80 hover:opacity-100'
            }`}
          >
            <div className={`p-2 rounded-xl mb-3 transition-all ${selectedAmount === tier.amount ? 'bg-white text-slate-900 shadow-lg' : 'bg-white text-slate-300'}`}>
              <tier.icon className="w-4 h-4" />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest mb-1 ${selectedAmount === tier.amount ? 'text-white/40' : 'text-slate-400'}`}>
              {tier.label}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tighter">{tier.amount}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Books</span>
            </div>
          </button>
        ))}
      </div>

      {/* 04. THE GLOW-HUD COUNTER DISPLAY */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-800 to-green-600 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-slate-900 border border-white/5 p-8 rounded-[3rem] flex items-center justify-between overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
          <div className="relative space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Aggregated Support</p>
            <div className="flex items-center">
              <span className="text-2xl font-black text-green-400 mr-2">{currency === 'GHS' ? '₵' : '$'}</span>
              <p className="text-5xl font-black tracking-tighter text-white tabular-nums animate-in zoom-in-50 duration-500">
                {totalCost.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="relative h-14 w-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-[10px] text-white/60 tracking-tighter">
            {selectedAmount}B
          </div>
        </div>
      </div>

      {/* 05. HIGH-IMPACT BUTTON */}
      <button 
        onClick={onNext}
        className="group relative w-full h-20 bg-red-800 rounded-[2.25rem] overflow-hidden transition-all duration-500 active:scale-95 shadow-[0_20px_40px_-10px_rgba(153,27,27,0.3)]"
      >
        <div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000" />
        <div className="flex items-center justify-center gap-3 relative z-10">
          <span className="text-xs font-black uppercase tracking-[0.5em] text-white">Proceed to Details</span>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">
            <ChevronRight className="w-4 h-4 text-red-800" />
          </div>
        </div>
      </button>
    </div>
  );
}