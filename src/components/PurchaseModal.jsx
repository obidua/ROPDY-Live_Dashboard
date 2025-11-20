import React, { useState, useEffect } from 'react';
import { X, Check, ChevronRight, Wallet, Shield, Zap, ArrowRight } from 'lucide-react';

const PurchaseModal = ({ isOpen, onClose, selectedPackage, onConfirm, isLoading, errorMessage }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [txInProgress, setTxInProgress] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setTxInProgress(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLoading) {
      setTxInProgress(true);
    }
  }, [isLoading]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    setTxInProgress(true);
    onConfirm();
  };

  const steps = [
    { number: 1, title: 'Review' },
    { number: 2, title: 'Balance' },
    { number: 3, title: 'Confirm' },
    { number: 4, title: 'Complete' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-b border-cyan-500/30 p-4 sm:p-6 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-cyan-300">Purchase Package</h2>
            <p className="text-xs sm:text-sm text-cyan-300/70 mt-0.5 sm:mt-1">Step {currentStep} of 4</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors flex-shrink-0 ml-2"
          >
            <X size={20} className="sm:w-6 sm:h-6 text-red-400" />
          </button>
        </div>

        {/* Step Indicator - Mobile Optimized */}
        <div className="px-3 sm:px-6 pt-3 sm:pt-6 pb-4 sm:pb-6 flex-shrink-0">
          <div className="flex items-center justify-between gap-1 sm:gap-0 mb-4">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-1 min-w-0">
                <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all flex-shrink-0 text-xs sm:text-sm ${
                  currentStep >= step.number
                    ? 'bg-gradient-to-br from-cyan-500 to-green-400 text-dark-950'
                    : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                }`}>
                  {currentStep > step.number ? (
                    <Check size={14} className="sm:w-5 sm:h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-1 sm:mx-2 rounded transition-all ${
                    currentStep > step.number
                      ? 'bg-green-400'
                      : 'bg-slate-700/50'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 min-h-0">
          {/* Step 1: Review Package */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-cyan-300">Package Details</h3>
              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-cyan-300/80 text-sm">Package Name:</span>
                  <span className="text-lg font-bold text-green-400 text-right">{selectedPackage?.packageName}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                <div className="flex justify-between items-start gap-2">
                  <span className="text-cyan-300/80 text-sm">Price (USD):</span>
                  <span className="font-semibold text-cyan-300">${selectedPackage?.priceInUSD || '0'}</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-cyan-300/80 text-sm">Package Cost:</span>
                  <span className="font-semibold text-green-400">{parseFloat(selectedPackage?.priceInRAMA).toFixed(5)} RAMA</span>
                </div>
                <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                <div className="flex justify-between items-start gap-2 text-sm">
                  <span className="text-cyan-300/80">Est. Gas Fee:</span>
                  <span className="text-yellow-400">{parseFloat(selectedPackage?.estimatedGasRAMA || 0).toFixed(6)} RAMA</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-green-500/30 rounded-xl p-4">
                <p className="text-xs text-cyan-300/80 mb-1">Total Required:</p>
                <p className="text-2xl font-bold text-green-400">{selectedPackage?.totalRequired} RAMA</p>
              </div>
            </div>
          )}

          {/* Step 2: Verify Balance */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Wallet className="text-green-400" size={20} /> Balance
              </h3>
              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4">
                <div className="text-center py-6">
                  <p className="text-cyan-300/70 text-xs mb-2">Your Balance:</p>
                  <p className="text-3xl font-bold text-green-400 break-words">
                    {parseFloat(selectedPackage?.walletBalance || 0).toFixed(5)}
                  </p>
                  <p className="text-xs text-cyan-300/60 mt-1">RAMA</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mt-4">
                  <div className="flex items-start gap-2">
                    <Check className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                    <div className="min-w-0">
                      <p className="text-green-300 font-semibold text-sm">Sufficient Balance</p>
                      <p className="text-xs text-green-300/70 mt-1">You have enough RAMA for this purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm Details */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Shield className="text-cyan-400" size={20} /> Confirm
              </h3>
              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-start gap-2 text-sm">
                  <span className="text-cyan-300/80">Package:</span>
                  <span className="font-semibold text-cyan-300 text-right">{selectedPackage?.packageName}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                <div className="flex justify-between items-start gap-2 text-sm">
                  <span className="text-cyan-300/80">Amount:</span>
                  <span className="font-semibold text-green-400 text-right">{selectedPackage?.priceInRAMA} RAMA</span>
                </div>
                <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                <div className="flex justify-between items-start gap-2 text-sm">
                  <span className="text-cyan-300/80">Gas:</span>
                  <span className="font-semibold text-yellow-400 text-right">{parseFloat(selectedPackage?.estimatedGasRAMA || 0).toFixed(6)} RAMA</span>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <Zap className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                  <div className="min-w-0">
                    <p className="text-yellow-300 font-semibold text-sm">Review Carefully</p>
                    <p className="text-xs text-yellow-300/70 mt-1">Verify all details before proceeding</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete Purchase */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-cyan-300">Complete Purchase</h3>
              {!txInProgress ? (
                <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4">
                  <div className="text-center py-8">
                    <div className="inline-block bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-full p-3 mb-3">
                      <Check className="text-green-400" size={28} />
                    </div>
                    <h4 className="text-base font-bold text-cyan-300 mb-1">Ready</h4>
                    <p className="text-xs text-cyan-300/70">Click confirm to sign with your wallet</p>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-3 mt-4">
                    <p className="text-xs text-cyan-300/70 mb-1">Total Amount:</p>
                    <p className="text-xl font-bold text-green-400">{selectedPackage?.totalRequired} RAMA</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4">
                  <div className="text-center py-12">
                    <div className="inline-block mb-3">
                      <div className="w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-green-400 animate-spin" />
                    </div>
                    <h4 className="text-base font-bold text-cyan-300 mb-1">Processing</h4>
                    <p className="text-xs text-cyan-300/70">Confirming purchase...</p>
                    <p className="text-xs text-cyan-300/50 mt-2">Please approve in your wallet</p>
                    {errorMessage && (
                      <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <p className="text-xs text-red-400 font-semibold mb-1">❌ Error:</p>
                        <p className="text-xs text-red-300">{errorMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-cyan-500/30 bg-slate-800/50 p-4 flex flex-col sm:flex-row gap-3 sm:gap-0 flex-shrink-0">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1 || txInProgress}
            className="px-4 py-2 rounded-lg font-semibold border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:order-1"
          >
            Previous
          </button>

          <div className="flex-1 hidden sm:block" />

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-green-400 text-dark-950 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 text-sm sm:order-3"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={txInProgress}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-dark-950 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:order-3"
            >
              {txInProgress ? 'Processing...' : 'Confirm'}
              {!txInProgress && <ArrowRight size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
