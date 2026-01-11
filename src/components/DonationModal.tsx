// src/components/DonationModal.tsx
// ... existing imports ...

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2800);
  };

  // ... handleClose logic ...

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="bg-red-800 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Support The Project</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              {isProcessing ? 'Connecting Gateway...' : `Step ${step} of 3 • Building with you`}
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
              <p className="text-sm font-black uppercase tracking-widest text-slate-900">
                {currency === 'GHS' ? 'Awaiting MoMo Prompt...' : 'Verifying Card Payment...'}
              </p>
              <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wide px-6">
                {currency === 'GHS' 
                  ? 'Please check your phone to authorize the transaction.' 
                  : 'Please do not refresh the page while we secure your payment.'}
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
                  currency={currency} 
                  selectedAmount={selectedAmount} 
                  totalCost={totalCost} 
                  onBack={() => setStep(1)} 
                  onPay={handlePay} 
                />
              )}
              {/* ... SuccessStep ... */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}