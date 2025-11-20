import React, { useEffect, useState } from 'react';

const LogoCircle = ({ size = 64, className = '' }) => {
  const [isDark, setIsDark] = useState(true);
  const gradientId = `gradient-circle-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          {isDark ? (
            <>
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="50%" stopColor="#9d4edd" />
              <stop offset="100%" stopColor="#ff006e" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#00cc70" />
              <stop offset="50%" stopColor="#6a0dad" />
              <stop offset="100%" stopColor="#d4006d" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Outer circle */}
      <circle cx="60" cy="60" r="56" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" opacity="0.4" />
      
      {/* Inner circle (subtle) */}
      <circle cx="60" cy="60" r="50" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1" opacity="0.2" />

      {/* Stylized R */}
      <g transform="translate(60, 60)">
        {/* Vertical stem */}
        <rect x="-6" y="-28" width="5" height="56" rx="2.5" fill={`url(#${gradientId})`} />
        
        {/* Top curve (bowl) */}
        <path
          d="M -1 -18 Q 18 -28 18 -8 Q 18 6 -1 6"
          stroke={`url(#${gradientId})`}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Diagonal leg */}
        <line
          x1="2"
          y1="6"
          x2="20"
          y2="28"
          stroke={`url(#${gradientId})`}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default LogoCircle;
