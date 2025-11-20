import React, { useState, useEffect } from 'react';
import { X, Check, ChevronRight, Wallet, Shield, Zap, ArrowRight, Users } from 'lucide-react';

const SignupModal = ({ isOpen, onClose, sponsorAddress, sponsorId, onConfirm, isLoading, referralId }) => {
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
    {
      number: 1,
      title: 'Welcome',
      description: 'Get started with ROPDY',
    },
    {
      number: 2,
      title: 'Sponsor Info',
      description: 'Verify referral details',
    },
    {
      number: 3,
      title: 'Confirm',
      description: 'Review registration',
    },
    {
      number: 4,
      title: 'Register',
      description: 'Sign transaction',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-b border-cyan-500/30 p-4 sm:p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">Create ROPDY Account</h2>
            <p className="text-xs sm:text-sm text-cyan-300/70 mt-1">Step {currentStep} of 4</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} className="text-red-400 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Step Indicator - Responsive */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex justify-between items-center gap-1 sm:gap-2">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-3 mb-2">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all flex-shrink-0 text-xs sm:text-sm ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-br from-cyan-500 to-green-400 text-dark-950'
                        : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check size={16} className="sm:w-5 sm:h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 rounded transition-all hidden sm:block ${
                        currentStep > step.number
                          ? 'bg-gradient-to-r from-cyan-500 to-green-400'
                          : 'bg-slate-700/50'
                      }`}
                    />
                  )}
                </div>
                <p className={`text-xs font-semibold truncate ${currentStep >= step.number ? 'text-cyan-300' : 'text-slate-500'}`}>
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content - Responsive */}
        <div className="p-4 sm:p-6 min-h-64 sm:min-h-72">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-4 sm:mb-6">Welcome to ROPDY</h3>
              
              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4 sm:p-6 space-y-4">
                <div className="text-center py-4 sm:py-6">
                  <div className="inline-block bg-gradient-to-br from-cyan-500/20 to-green-500/20 border border-cyan-500/30 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                    <Users className="text-cyan-400 w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Join Our Community</h4>
                  <p className="text-sm text-cyan-300/70">
                    Start earning passive income with ROPDY's automated circle system
                  </p>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4 space-y-2">
                  <p className="text-xs sm:text-sm font-semibold text-green-300">What You'll Get:</p>
                  <ul className="text-xs sm:text-sm text-cyan-300/80 space-y-1">
                    <li>✨ Automatic circle completion (6 payments)</li>
                    <li>💰 Direct payouts in RAMA Coin</li>
                    <li>🚀 Referral bonuses</li>
                    <li>🔐 100% secure smart contract</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Sponsor Info */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-4 sm:mb-6 flex items-center gap-2">
                <Shield className="text-green-400 w-5 h-5 sm:w-6 sm:h-6" />
                Sponsor Information
              </h3>

              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4 sm:p-6 space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-cyan-300/80 mb-1">Referral ID:</p>
                    <p className="text-lg sm:text-xl font-bold text-cyan-300 break-all">{referralId}</p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />

                  <div>
                    <p className="text-xs sm:text-sm text-cyan-300/80 mb-1">Sponsor Address:</p>
                    <p className="text-xs sm:text-sm font-mono text-green-400 break-all">{sponsorAddress}</p>
                  </div>

                  {sponsorId && (
                    <>
                      <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                      <div>
                        <p className="text-xs sm:text-sm text-cyan-300/80 mb-1">Sponsor ID:</p>
                        <p className="text-lg sm:text-xl font-bold text-green-400">{sponsorId}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Check className="text-green-400 flex-shrink-0 mt-1 w-4 h-4 sm:w-5 sm:h-5" />
                    <div>
                      <p className="text-xs sm:text-sm text-green-300 font-semibold">Sponsor Verified</p>
                      <p className="text-xs text-green-300/70 mt-1">
                        Your sponsor information is valid and ready
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm Registration */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-4 sm:mb-6 flex items-center gap-2">
                <Zap className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
                Confirm Details
              </h3>

              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-cyan-300/80">Network:</span>
                    <span className="font-semibold text-cyan-300">Ramestta Blockchain</span>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                  
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-cyan-300/80">Registration Type:</span>
                    <span className="font-semibold text-green-400">New User</span>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                  
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-cyan-300/80">Minimum Entry:</span>
                    <span className="font-semibold text-green-400">$20 (Starter)</span>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 sm:p-4 mt-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Zap className="text-yellow-400 flex-shrink-0 mt-1 w-4 h-4 sm:w-5 sm:h-5" />
                    <div>
                      <p className="text-xs sm:text-sm text-yellow-300 font-semibold">Important</p>
                      <p className="text-xs text-yellow-300/70 mt-1">
                        You will need to activate a package after registration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete Registration */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-4 sm:mb-6">Complete Registration</h3>

              {!txInProgress ? (
                <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4 sm:p-6 space-y-4">
                  <div className="text-center py-6 sm:py-8">
                    <div className="inline-block bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                      <Check className="text-green-400 w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Ready to Register</h4>
                    <p className="text-xs sm:text-sm text-cyan-300/70">
                      Click confirm to sign the transaction with your wallet
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4">
                    <p className="text-xs text-cyan-300/70 mb-2">You are registering as:</p>
                    <p className="text-lg sm:text-xl font-bold text-green-400 break-all font-mono text-center">{sponsorAddress?.slice(0, 10)}...{sponsorAddress?.slice(-8)}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4 sm:p-6 space-y-4">
                  <div className="text-center py-8 sm:py-12">
                    <div className="inline-block mb-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-cyan-500/30 border-t-green-400 animate-spin" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Processing Registration</h4>
                    <p className="text-xs sm:text-sm text-cyan-300/70">
                      Please wait while we process your registration...
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

        {/* Footer - Responsive */}
        <div className="border-t border-cyan-500/30 bg-slate-800/50 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1 || txInProgress}
            className="px-4 sm:px-6 py-2.5 rounded-lg font-semibold border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Previous
          </button>

          <div className="flex-1 hidden sm:block" />

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-4 sm:px-8 py-2.5 bg-gradient-to-r from-cyan-500 to-green-400 text-dark-950 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Next
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={txInProgress}
              className="px-4 sm:px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-400 text-dark-950 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {txInProgress ? 'Processing...' : 'Confirm Registration'}
              {!txInProgress && <ArrowRight size={16} className="sm:w-5 sm:h-5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
