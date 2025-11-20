import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, ArrowRight, Copy } from 'lucide-react';

const TransactionStatusModal = ({ isOpen, status, transactionHash, onClose, onDashboard, onViewScan }) => {
  const [autoCloseCountdown, setAutoCloseCountdown] = useState(10);
  const [userInteracted, setUserInteracted] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    if (!isOpen || userInteracted) return;

    const timer = setInterval(() => {
      setAutoCloseCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, userInteracted, onClose]);

  const handleInteraction = () => {
    setUserInteracted(true);
  };

  const handleDashboard = () => {
    handleInteraction();
    onDashboard();
  };

  const handleViewScan = () => {
    handleInteraction();
    onViewScan();
  };

  const handleClose = () => {
    handleInteraction();
    onClose();
  };

  const handleCopyHash = async () => {
    if (transactionHash) {
      try {
        await navigator.clipboard.writeText(transactionHash);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      } catch (err) {
        console.error('Failed to copy hash:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30">
        
        {/* Header with Close Button */}
        <div className="relative bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-b border-cyan-500/30 p-6 flex justify-between items-start">
          <div className="flex-1" />
          <button
            onClick={handleClose}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} className="text-red-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {status === 'success' ? (
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                    <Check size={40} className="text-dark-950" />
                  </div>
                </div>
              </div>
            ) : status === 'cancelled' ? (
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
                    <AlertCircle size={40} className="text-dark-950" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-400 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                    <X size={40} className="text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Status Title and Message */}
          <div className="text-center mb-6">
            {status === 'success' && (
              <>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Success! 🎉</h3>
                <p className="text-cyan-300/80 text-sm">Your package purchase was completed successfully</p>
              </>
            )}
            {status === 'cancelled' && (
              <>
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">Transaction Cancelled</h3>
                <p className="text-cyan-300/80 text-sm">You cancelled the transaction in your wallet</p>
              </>
            )}
            {status === 'error' && (
              <>
                <h3 className="text-2xl font-bold text-red-400 mb-2">Transaction Failed</h3>
                <p className="text-cyan-300/80 text-sm">Something went wrong with your transaction</p>
              </>
            )}
          </div>

          {/* Transaction Hash (only for success) */}
          {status === 'success' && transactionHash && (
            <div className="bg-slate-700/50 border border-cyan-500/30 rounded-xl p-4 mb-6">
              <p className="text-xs text-cyan-300/70 mb-2 font-semibold">Transaction Hash</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-cyan-300 font-mono break-all bg-slate-800 p-2 rounded border border-cyan-500/20 flex-1">
                  {transactionHash}
                </p>
                <button
                  onClick={handleCopyHash}
                  className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors flex-shrink-0 border border-cyan-500/30"
                  title="Copy transaction hash"
                >
                  <Copy size={16} className={`${copyFeedback ? 'text-green-400' : 'text-cyan-400'}`} />
                </button>
              </div>
              {copyFeedback && (
                <p className="text-xs text-green-400 mt-2 animate-fade-in">✓ Copied to clipboard</p>
              )}
            </div>
          )}

          {/* Auto Close Timer (only when not interacted) */}
          {!userInteracted && (
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <p className="text-xs text-cyan-300/60">
                Auto-closing in <span className="font-bold text-cyan-300">{autoCloseCountdown}s</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === 'success' ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-dark-950 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={handleViewScan}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-400 text-dark-950 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
                >
                  View on Ramascan
                  <ArrowRight size={16} />
                </button>
              </>
            ) : status === 'cancelled' ? (
              <>
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-dark-950 rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                >
                  Try Again
                </button>
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 border border-cyan-500/30 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all"
                >
                  Close
                </button>
              </>
            ) : (
              <button
                onClick={handleClose}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-rose-400 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatusModal;
