import React, { useState, useEffect } from 'react';
import { X, Check, ChevronRight, Wallet, Shield, Zap, ArrowRight } from 'lucide-react';

const PurchaseModal = ({ isOpen, onClose, selectedPackage, onConfirm, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [txInProgress, setTxInProgress] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setIsConfirmed(false);
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
    {
      number: 1,
      title: 'Review Package',
      description: 'Confirm package details',
    },
    {
      number: 2,
      title: 'Verify Balance',
      description: 'Check wallet balance',
    },
    {
      number: 3,
      title: 'Confirm Details',
      description: 'Review transaction details',
    },
    {
      number: 4,
      title: 'Complete Purchase',
      description: 'Sign transaction',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-b border-cyan-500/30 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-cyan-300">Purchase Package</h2>
            <p className="text-sm text-cyan-300/70 mt-1">Step {currentStep} of 4</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <X size={24} className="text-red-400" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-6">
          <div className="flex justify-between items-center">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-br from-cyan-500 to-green-400 text-dark-950'
                        : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check size={20} />
                    ) : (
                      step.number
                    )}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-all ${
                        currentStep > step.number
                          ? 'bg-gradient-to-r from-cyan-500 to-green-400'
                          : 'bg-slate-700/50'
                      }`}
                    />
                  )}
                </div>
                <p className={`text-xs font-semibold ${currentStep >= step.number ? 'text-cyan-300' : 'text-slate-500'}`}>
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 min-h-72">
          {/* Step 1: Review Package */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-cyan-300 mb-6">Package Details</h3>
              
              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300/80">Package Name:</span>
                  <span className="text-xl font-bold text-green-400">{selectedPackage?.packageName}</span>
                </div>
                
                <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300/80">Price (USD):</span>
                  <span className="text-lg font-semibold text-cyan-300">${selectedPackage?.priceInUSD || '0'}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300/80">Package Cost (RAMA):</span>
                  <span className="text-lg font-semibold text-green-400">{parseFloat(selectedPackage?.priceInRAMA).toFixed(5)} RAMA</span>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />

                <div className="flex justify-between items-center">
                  <span className="text-cyan-300/80">Est. Gas Fee:</span>
                  <span className="text-sm text-yellow-400">{parseFloat(selectedPackage?.estimatedGasRAMA || 0).toFixed(6)} RAMA</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-green-500/30 rounded-xl p-4">
                <p className="text-sm text-cyan-300/80 mb-2">Total Required:</p>
                <p className="text-3xl font-bold text-green-400">{selectedPackage?.totalRequired} RAMA</p>
              </div>
            </div>
          )}

          {/* Step 2: Verify Balance */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-cyan-300 mb-6 flex items-center gap-2">
                <Wallet className="text-green-400" size={24} />
                Wallet Balance
              </h3>

              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-6 space-y-4">
                <div className="text-center py-4">
                  <p className="text-cyan-300/70 text-sm mb-2">Your Current Balance:</p>
                  <p className="text-4xl font-bold text-green-400">
                    {parseFloat(selectedPackage?.walletBalance || 0).toFixed(5)}
                  </p>
                  <p className="text-xs text-cyan-300/60 mt-2">RAMA</p>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-green-300 font-semibold">Sufficient Balance</p>
                      <p className="text-xs text-green-300/70 mt-1">
                        You have enough RAMA to complete this purchase
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm Details */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-cyan-300 mb-6 flex items-center gap-2">
                <Shield className="text-cyan-400" size={24} />
                Confirm Transaction Details
              </h3>

              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300/80">Package:</span>
                    <span className="font-semibold text-cyan-300">{selectedPackage?.packageName}</span>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300/80">Amount:</span>
                    <span className="font-semibold text-green-400">{selectedPackage?.priceInRAMA} RAMA</span>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300/80">Gas Fee:</span>
                    <span className="font-semibold text-yellow-400">{parseFloat(selectedPackage?.estimatedGasRAMA || 0).toFixed(6)} RAMA</span>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <Zap className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-yellow-300 font-semibold text-sm">Please Review</p>
                      <p className="text-xs text-yellow-300/70 mt-1">
                        Make sure all details are correct before proceeding
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete Purchase */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-cyan-300 mb-6">Complete Purchase</h3>

              {!txInProgress ? (
                <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-6 space-y-4">
                  <div className="text-center py-6">
                    <div className="inline-block bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-full p-4 mb-4">
                      <Check className="text-green-400" size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-cyan-300 mb-2">Ready to Purchase</h4>
                    <p className="text-cyan-300/70 text-sm">
                      Click confirm to sign the transaction with your wallet
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-xs text-cyan-300/70 mb-2">Total Amount:</p>
                    <p className="text-2xl font-bold text-green-400">{selectedPackage?.totalRequired} RAMA</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-6 space-y-4">
                  <div className="text-center py-8">
                    <div className="inline-block mb-4">
                      <div className="w-16 h-16 rounded-full border-4 border-cyan-500/30 border-t-green-400 animate-spin" />
                    </div>
                    <h4 className="text-lg font-bold text-cyan-300 mb-2">Processing Transaction</h4>
                    <p className="text-cyan-300/70 text-sm">
                      Please wait while we process your purchase...
                    </p>
                    <p className="text-xs text-cyan-300/50 mt-4">
                      Do not close this window
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-cyan-500/30 bg-slate-800/50 p-6 flex justify-between items-center gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1 || txInProgress}
            className="px-6 py-2.5 rounded-lg font-semibold border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex-1" />

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-8 py-2.5 bg-gradient-to-r from-cyan-500 to-green-400 text-dark-950 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
            >
              Next
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={txInProgress}
              className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-400 text-dark-950 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {txInProgress ? 'Processing...' : 'Confirm Purchase'}
              {!txInProgress && <ArrowRight size={20} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
