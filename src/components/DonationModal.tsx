// src/components/DonationModal.tsx
import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { AmountStep } from './donation/AmountStep';
import { DetailsStep } from './donation/DetailsStep';
import { SuccessStep } from './donation/SuccessStep';

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');

  if (!isOpen) return null;

  const pricePerBook = currency === 'GHS' ? 10 : 1;
  const totalCost = selectedAmount * pricePerBook;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate API Call (MoMo Prompt)
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2500);
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
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        
        <div className="bg-red-800 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Support The Project</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              {isProcessing ? 'Verifying Transaction...' : `Step ${step} of 3 • Building with you`}
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
            <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95">
              <Loader2 className="w-12 h-12 text-red-800 animate-spin" />
              <p className="text-sm font-black uppercase tracking-widest text-slate-900">Awaiting MoMo Prompt...</p>
              <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wide">
                Please check your phone and enter your pin to authorize the transaction.
              </p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <AmountStep 
                  currency={currency} setCurrency={setCurrency} 
                  selectedAmount={selectedAmount} setSelectedAmount={setSelectedAmount} 
                  totalCost={totalCost} onNext={() => setStep(2)} 
                />
              )}
              {step === 2 && (
                <DetailsStep 
                  currency={currency} selectedAmount={selectedAmount} 
                  totalCost={totalCost} onBack={() => setStep(1)} 
                  onPay={handlePay} 
                />
              )}
              {step === 3 && (
                <SuccessStep 
                  currency={currency} selectedAmount={selectedAmount} 
                  totalCost={totalCost} onClose={handleClose} 
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}