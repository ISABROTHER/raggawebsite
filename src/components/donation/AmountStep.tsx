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
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 font-sans">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-bold text-sm">1</span>
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Select Impact Level</h3>
      </div>

      {/* Apple-style Segmented Control */}
      <div className="bg-slate-100 p-1 rounded-2xl flex relative h-14 border border-slate-200/50">
        <div 
          className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${currency === 'USD' ? 'translate-x-full' : 'translate-x-0'}`}
        />
        <button 
          onClick={() => setCurrency('GHS')}
          className={`flex-1 relative z-10 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${currency === 'GHS' ? 'text-red-800' : 'text-slate-400'}`}
        >
          Ghana Cedi (₵)
        </button>
        <button 
          onClick={() => setCurrency('USD')}
          className={`flex-1 relative z-10 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${currency === 'USD' ? 'text-red-800' : 'text-slate-400'}`}
        >
          US Dollar ($)
        </button>
      </div>

      {/* Apple-style Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[10, 50, 100, 200].map((num) => (
          <button
            key={num}
            onClick={() => setSelectedAmount(num)}
            className={`py-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center active:scale-95 ${
              selectedAmount === num 
                ? 'border-red-800 bg-red-50 shadow-md ring-1 ring-red-800/10' 
                : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
            }`}
          >
            <span className={`text-2xl font-bold tracking-tighter transition-colors ${selectedAmount === num ? 'text-red-800' : 'text-slate-900'}`}>{num}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Books</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-900 p-7 rounded-[2.5rem] text-center text-white shadow-xl shadow-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-800/5" />
        <p className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-1">Estimated Contribution</p>
        <p className="relative z-10 text-4xl font-bold tracking-tighter text-white">
          {currency === 'GHS' ? '₵' : '$'}{totalCost.toLocaleString()}
        </p>
      </div>

      {/* Breathing Animated Button */}
      <button 
        onClick={onNext}
        className="group relative w-full py-5 bg-red-800 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-sm shadow-xl transition-all duration-300 hover:bg-red-700 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
        style={{ animation: 'intense-pulse-light 2s ease-in-out infinite' }}
      >
        <div className="absolute inset-0 w-1/3 h-full bg-white/10 skew-x-[-25deg] -translate-x-[200%] group-hover:animate-[shimmer-fast_1.5s_infinite]" />
        <span className="relative z-10">Next: Details</span>
        <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes intense-pulse-light {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgb(153 27 27 / 0.15); }
          50% { transform: scale(1.02); box-shadow: 0 20px 25px -5px rgb(153 27 27 / 0.2), 0 0 12px 2px rgba(153, 27, 27, 0.1); }
        }
        @keyframes shimmer-fast {
          0% { transform: skewX(-25deg) translateX(-200%); }
          100% { transform: skewX(-25deg) translateX(300%); }
        }
      `}} />
    </div>
  );
}