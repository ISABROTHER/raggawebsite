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
  currency,
  setCurrency,
  selectedAmount,
  setSelectedAmount,
  totalCost,
  onNext,
}: AmountStepProps) {
  const TARGET_BOOKS = 200000;
  const progressPercent = Math.min((selectedAmount / TARGET_BOOKS) * 100, 100);

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-right-4 duration-300">

      {/* Step Header */}
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-red-800 text-white font-black text-sm shadow">
          1
        </span>
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
            Select Amount
          </h3>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Every contribution provides exercise books for students in Cape Coast North
          </p>
        </div>
      </div>

      {/* Currency Toggle */}
      <div className="flex justify-center p-1.5 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setCurrency('GHS')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-200 focus:outline-none ${
            currency === 'GHS'
              ? 'bg-white text-green-700 shadow-md scale-[1.02]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Ghana Cedi (₵)
        </button>

        <button
          onClick={() => setCurrency('USD')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-200 focus:outline-none ${
            currency === 'USD'
              ? 'bg-white text-green-700 shadow-md scale-[1.02]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          US Dollar ($)
        </button>
      </div>

      {/* Amount Selection */}
      <div>
        <p className="text-[11px] text-center text-slate-500 font-medium mb-3">
          One book means one child can write, learn, and participate fully in class
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[10, 50, 100, 200].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedAmount(num)}
              className={`py-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center focus:outline-none ${
                selectedAmount === num
                  ? 'border-green-600 bg-green-50 shadow-sm scale-[1.02]'
                  : 'border-slate-100 bg-slate-50 hover:border-green-300 hover:bg-slate-100'
              }`}
            >
              <span
                className={`text-2xl font-black leading-none ${
                  selectedAmount === num ? 'text-green-700' : 'text-slate-900'
                }`}
              >
                {num}
              </span>
              <span className="mt-1 text-[9px] font-black uppercase tracking-widest text-slate-400">
                Books
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Contribution */}
      <div className="bg-green-700 p-6 rounded-2xl text-center text-white shadow-xl shadow-green-100">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-100 mb-1">
          Estimated Contribution
        </p>
        <p className="text-3xl font-black tracking-tight mb-3">
          {currency === 'GHS' ? '₵' : '$'}
          {totalCost.toLocaleString()}
        </p>

        {/* Impact Progress */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-green-900/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] uppercase tracking-widest text-green-100 font-bold">
            Helping reach 200,000 books
          </p>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.25em] text-sm transition-all duration-200 hover:bg-slate-800 active:scale-[0.99] flex items-center justify-center gap-2"
      >
        Continue to Make Impact
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
