// src/components/donation/AmountStep.tsx
import React from 'react';
import { ChevronRight, Check } from 'lucide-react';

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
  // Apple-style tiered options
  const tiers = [
    { amount: 50, label: 'Starter', desc: 'Support one student' },
    { amount: 200, label: 'Impact', desc: 'Support a small class' },
    { amount: 500, label: 'Visionary', desc: 'Transform a whole school' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Apple-style Header */}
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-bold tracking-tight text-slate-900">Choose Amount</h3>
        <p className="text-sm text-slate-500 font-medium">Select your level of contribution</p>
      </div>

      {/* Segmented Control (Currency) */}
      <div className="bg-slate-100 p-1 rounded-2xl flex relative h-12">
        <div 
          className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${currency === 'USD' ? 'translate-x-full' : 'translate-x-0'}`}
        />
        <button 
          onClick={() => setCurrency('GHS')}
          className={`flex-1 relative z-10 text-sm font-semibold transition-colors duration-300 ${currency === 'GHS' ? 'text-slate-900' : 'text-slate-400'}`}
        >
          Ghana Cedi (₵)
        </button>
        <button 
          onClick={() => setCurrency('USD')}
          className={`flex-1 relative z-10 text-sm font-semibold transition-colors duration-300 ${currency === 'USD' ? 'text-slate-900' : 'text-slate-400'}`}
        >
          US Dollar ($)
        </button>
      </div>

      {/* Vertical List Selection (Apple List Style) */}
      <div className="space-y-3">
        {tiers.map((tier) => (
          <button
            key={tier.amount}
            onClick={() => setSelectedAmount(tier.amount)}
            className={`w-full group relative flex items-center justify-between p-5 rounded-3xl border transition-all duration-200 ${
              selectedAmount === tier.amount 
                ? 'bg-white border-slate-900 ring-1 ring-slate-900 shadow-sm' 
                : 'bg-white border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className="text-left">
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${selectedAmount === tier.amount ? 'text-slate-900' : 'text-slate-400'}`}>
                {tier.label}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900">{tier.amount}</span>
                <span className="text-sm font-medium text-slate-500 uppercase">Books</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{tier.desc}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              selectedAmount === tier.amount 
                ? 'bg-slate-900 border-slate-900' 
                : 'border-slate-100'
            }`}>
              {selectedAmount === tier.amount && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
          </button>
        ))}
      </div>

      {/* Summary Area */}
      <div className="pt-4 border-t border-slate-50">
        <div className="flex justify-between items-center px-2">
          <span className="text-sm font-semibold text-slate-500">Total Contribution</span>
          <span className="text-3xl font-bold text-slate-900">
            {currency === 'GHS' ? '₵' : '$'}{totalCost.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Apple-style Primary Button */}
      <button 
        onClick={onNext}
        className="w-full h-16 bg-slate-900 text-white rounded-[2rem] font-bold text-base transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group"
      >
        Continue
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}