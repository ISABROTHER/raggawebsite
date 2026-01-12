// src/components/donation/AmountStep.tsx
import React from 'react';
import { ChevronRight } from 'lucide-react';

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
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-black text-sm">1</span>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Select Amount</h3>
      </div>

      <div className="flex justify-center p-1 bg-slate-100 rounded-2xl">
        <button 
          onClick={() => setCurrency('GHS')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'GHS' ? 'bg-white text-green-700 shadow-sm scale-[1.02]' : 'text-slate-400'}`}
        >
          Ghana Cedi (₵)
        </button>
        <button 
          onClick={() => setCurrency('USD')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currency === 'USD' ? 'bg-white text-green-700 shadow-sm scale-[1.02]' : 'text-slate-400'}`}
        >
          US Dollar ($)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[10, 50, 100, 200].map((num) => (
          <button
            key={num}
            onClick={() => setSelectedAmount(num)}
            className={`py-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center active:scale-95 ${
              selectedAmount === num 
                ? 'border-green-600 bg-green-50 shadow-md ring-1 ring-green-600/10' 
                : 'border-slate-100 bg-slate-50 hover:border-green-300 hover:shadow-sm'
            }`}
          >
            <span className={`text-xl font-black transition-colors ${selectedAmount === num ? 'text-green-700' : 'text-slate-900'}`}>{num}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Books</span>
          </button>
        ))}
      </div>

      <div className="bg-green-700 p-5 rounded-2xl text-center text-white shadow-lg shadow-green-100">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-100 mb-1">Estimated Contribution</p>
        <p className="text-3xl font-black tracking-tighter text-white">
          {currency === 'GHS' ? '₵' : '$'}{totalCost.toLocaleString()}
        </p>
      </div>

      {/* INTENSE BREATHING NEXT BUTTON */}
      <button 
        onClick={onNext}
        className="group relative w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all duration-300 hover:bg-slate-800 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
        style={{ animation: 'intense-pulse-light 2s ease-in-out infinite' }}
      >
        {/* Rapid Shimmer Effect */}
        <div className="absolute inset-0 w-1/3 h-full bg-white/10 skew-x-[-25deg] -translate-x-[200%] group-hover:animate-[shimmer-fast_1.5s_infinite]" />
        
        <span className="relative z-10">Next: Your Details</span>
        <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes intense-pulse-light {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
          50% { transform: scale(1.025); box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.15), 0 0 12px 2px rgba(15, 23, 42, 0.1); }
        }
        @keyframes shimmer-fast {
          0% { transform: skewX(-25deg) translateX(-200%); }
          100% { transform: skewX(-25deg) translateX(300%); }
        }
      `}} />
    </div>
  );
}