import React, { useEffect, useState } from 'react';
import usePWAInstall from '../hooks/usePWAInstall';

const PWAInstallPrompt = () => {
  const { showInstallPrompt, isIOSInstallable, handleInstall, dismissPrompt } = usePWAInstall();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Only show if either condition is true
    const shouldShow = showInstallPrompt || isIOSInstallable;
    setIsVisible(shouldShow);
  }, [showInstallPrompt, isIOSInstallable]);

  // Detect dark/light mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleClose = React.useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsVisible(false);
    dismissPrompt();
  }, [dismissPrompt]);

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile View */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] md:hidden animate-slide-up">
        <div
          className={`${
            isDark
              ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 border-t border-purple-400/30'
              : 'bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 border-t border-purple-300/50'
          } p-4 shadow-2xl backdrop-blur-sm transition-all duration-300`}
        >
          <div className="flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="text-base font-bold text-white mb-1">Install ROPDY</h3>
                <p className="text-white/90 text-xs leading-relaxed">
                  {isIOSInstallable
                    ? 'Tap the share icon and select "Add to Home Screen"'
                    : 'Get instant access to ROPDY - Install our app for the best experience!'}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="flex-shrink-0 text-white/70 hover:text-white text-xl transition-colors pt-1"
                aria-label="Close install prompt"
                type="button"
              >
                ✕
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 w-full">
              <button
                onClick={handleClose}
                className="flex-1 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition-colors duration-200 border border-white/30"
                type="button"
              >
                Not Now
              </button>
              {!isIOSInstallable && (
                <button
                  onClick={handleInstall}
                  className="flex-1 px-3 py-2 rounded-lg bg-white text-purple-600 font-bold text-sm hover:bg-white/90 transition-colors duration-200 shadow-lg"
                  type="button"
                >
                  Install
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Webview/Desktop View - Fixed positioning with higher z-index */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-[60] animate-slide-up">
        <div
          className={`${
            isDark
              ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 border-t border-purple-400/30'
              : 'bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 border-t border-purple-300/50'
          } px-6 py-5 shadow-2xl backdrop-blur-sm transition-all duration-300`}
        >
          <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-6">
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg lg:text-xl font-bold text-white mb-1">
                Install ROPDY App
              </h3>
              <p className="text-white/90 text-sm lg:text-base">
                {isIOSInstallable
                  ? 'Tap the share button and select "Add to Home Screen" to install ROPDY'
                  : 'Get instant access to ROPDY - Install our app for the best experience! Works offline, faster loading, and home screen access.'}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold transition-colors duration-200 border border-white/30 whitespace-nowrap text-sm lg:text-base"
                type="button"
              >
                Not Now
              </button>
              {!isIOSInstallable && (
                <button
                  onClick={handleInstall}
                  className="px-8 py-2.5 rounded-lg bg-white text-purple-600 font-bold hover:bg-white/90 transition-colors duration-200 shadow-lg whitespace-nowrap text-sm lg:text-base"
                  type="button"
                >
                  Install Now
                </button>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white text-2xl transition-colors flex-shrink-0"
              aria-label="Close install prompt"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
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
    </>
  );
};

export default PWAInstallPrompt;
