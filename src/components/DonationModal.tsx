import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AmountStep } from './donation/AmountStep';
import { DetailsStep } from './donation/DetailsStep';
import { SuccessStep } from './donation/SuccessStep';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');

  if (!isOpen) return null;

  const pricePerBook = currency === 'GHS' ? 10 : 1;
  const totalCost = selectedAmount * pricePerBook;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setCurrency('GHS');
      setSelectedAmount(50);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="bg-red-800 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Support The Project</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Step {step} of 3 • Building with you</p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {step === 1 && (
            <AmountStep 
              currency={currency} 
              setCurrency={setCurrency} 
              selectedAmount={selectedAmount} 
              setSelectedAmount={setSelectedAmount} 
              totalCost={totalCost} 
              onNext={() => setStep(2)} 
            />
          )}
          {step === 2 && (
            <DetailsStep 
              currency={currency} 
              selectedAmount={selectedAmount} 
              totalCost={totalCost} 
              onBack={() => setStep(1)} 
              onPay={() => setStep(3)} 
            />
          )}
          {step === 3 && (
            <SuccessStep 
              currency={currency} 
              selectedAmount={selectedAmount} 
              totalCost={totalCost} 
              onClose={handleClose} 
            />
          )}
        </div>
      </div>
    </div>
  );
}