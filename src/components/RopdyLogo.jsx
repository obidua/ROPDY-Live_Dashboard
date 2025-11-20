import React, { useEffect, useState } from 'react';

const RopdyLogo = ({ size = 64, className = '', full = false }) => {
  const [isDark, setIsDark] = useState(true);

  // Detect dark/light mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Full width version for headers/hero sections
  if (full) {
    return (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className={`${className} w-full h-auto max-w-96`}
        style={{
          display: 'block',
        }}
      >
        <defs>
          <linearGradient id={`gradientFull-${isDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" style={{ stopColor: '#00ff88', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#9d4edd', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ff006e', stopOpacity: 1 }} />
              </>
            ) : (
              <>
                <stop offset="0%" style={{ stopColor: '#00cc70', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#6a0dad', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#d4006d', stopOpacity: 1 }} />
              </>
            )}
          </linearGradient>
          <filter id="glowFull">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#glowFull)">
          <rect x="50" y="30" width="12" height="120" fill={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} rx="6" />
          <path d="M 62 30 Q 95 30 95 55 Q 95 75 75 80" fill="none" stroke={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 62 95 Q 85 98 95 115 Q 100 130 80 140" fill="none" stroke={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="75" y1="95" x2="130" y2="150" stroke={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} strokeWidth="10" strokeLinecap="round" />
        </g>

        <g filter="url(#glowFull)" opacity="0.75">
          <rect x="145" y="35" width="25" height="8" fill={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} rx="4" />
          <rect x="145" y="52" width="25" height="8" fill={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} rx="4" />
          <rect x="145" y="69" width="25" height="8" fill={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} rx="4" />
          <rect x="145" y="86" width="25" height="8" fill={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} rx="4" />
          <rect x="145" y="103" width="25" height="8" fill={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} rx="4" />
          <rect x="145" y="120" width="25" height="8" fill={`url(#gradientFull-${isDark ? 'dark' : 'light'})`} rx="4" />
        </g>
      </svg>
    );
  }

  // Compact version for sidebars/headers
  return (
    <img
      src="/logo.svg"
      alt="ROPDY Logo"
      width={size}
      height={size}
      className={`${className} object-contain`}
      style={{
        display: 'inline-block',
      }}
    />
  );
};

export default RopdyLogo;
