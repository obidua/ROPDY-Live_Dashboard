import React, { useEffect } from 'react';
import usePWAInstall from '../hooks/usePWAInstall';

const PWAInstallPrompt = () => {
  const { showInstallPrompt, isIOSInstallable, handleInstall, dismissPrompt } = usePWAInstall();
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    setIsVisible(showInstallPrompt || isIOSInstallable);
  }, [showInstallPrompt, isIOSInstallable]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
      <div className="bg-gradient-to-r from-admin-purple via-admin-blue to-admin-pink p-4 md:p-6 shadow-2xl border-t border-admin-gold-600/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              Install ROPDY App
            </h3>
            <p className="text-white/90 text-sm md:text-base">
              {isIOSInstallable
                ? 'Tap the share button and select "Add to Home Screen" to install ROPDY'
                : 'Get instant access to ROPDY - Install our app for the best experience!'}
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={dismissPrompt}
              className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold transition-colors duration-200 border border-white/30"
            >
              Not Now
            </button>
            {!isIOSInstallable && (
              <button
                onClick={handleInstall}
                className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-white text-admin-purple font-bold hover:bg-white/90 transition-colors duration-200 shadow-lg"
              >
                Install
              </button>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={dismissPrompt}
          className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl transition-colors"
          aria-label="Close install prompt"
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PWAInstallPrompt;
