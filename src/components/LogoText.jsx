import React, { useEffect, useState } from 'react';

const LogoText = ({ size = 'md', className = '' }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
  };

  const gradientId = `gradient-text-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      viewBox="0 0 300 80"
      className={`${className} w-full h-auto`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
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

      {/* ROPDY Text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="48"
        fontWeight="700"
        fill={`url(#${gradientId})`}
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="2"
      >
        ROPDY
      </text>
    </svg>
  );
};

export default LogoText;
