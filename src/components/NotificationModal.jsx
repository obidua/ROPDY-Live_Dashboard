import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const NotificationModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info',
  autoClose = true,
  autoCloseDuration = 4000,
  actions = [] // Array of { label, onClick, variant }
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(onClose, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDuration, onClose]);

  if (!isOpen) return null;

  const typeConfig = {
    success: {
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      titleColor: 'text-green-400',
      iconColor: 'text-green-400',
      icon: '✓',
    },
    error: {
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      titleColor: 'text-red-400',
      iconColor: 'text-red-400',
      icon: '✕',
    },
    warning: {
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      titleColor: 'text-yellow-400',
      iconColor: 'text-yellow-400',
      icon: '⚠',
    },
    info: {
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      titleColor: 'text-blue-400',
      iconColor: 'text-blue-400',
      icon: 'ℹ',
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative ${config.bgColor} ${config.borderColor} border rounded-lg shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-400 hover:text-white" />
        </button>

        {/* Content */}
        <div className="flex gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${config.bgColor} ${config.titleColor}`}>
            {config.icon}
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h3 className={`${config.titleColor} font-semibold text-lg mb-1`}>
              {title}
            </h3>
            <p className="text-gray-300 text-sm">
              {message}
            </p>
          </div>
        </div>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex gap-3 mt-6">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  action.onClick?.();
                  onClose();
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  action.variant === 'primary'
                    ? 'bg-admin-new-green text-black hover:bg-admin-new-green/80'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {autoClose && (
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-admin-new-green/50 to-admin-new-green/20 rounded-b-lg animate-pulse"
            style={{
              animation: `shrink ${autoCloseDuration}ms linear`,
              transformOrigin: 'left'
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0; }
        }
      `}</style>
    </div>
  );
};

export default NotificationModal;
