import React from 'react';

const RopdyLogo = ({ size = 64, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Main gradient: Dark Green to Purple to Pink */}
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a5c3a" stopOpacity="1" />
          <stop offset="25%" stopColor="#2d7a52" stopOpacity="1" />
          <stop offset="50%" stopColor="#6b2d8f" stopOpacity="1" />
          <stop offset="75%" stopColor="#c23b7e" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff1493" stopOpacity="1" />
        </linearGradient>

        {/* Radial gradient for glow effect */}
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
        </radialGradient>

        {/* Shadow filter */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.4" />
        </filter>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle with glow */}
      <circle cx="100" cy="100" r="95" fill="url(#glowGradient)" opacity="0.3" />

      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#mainGradient)" strokeWidth="3" opacity="0.8" />

      {/* Inner circle background */}
      <circle cx="100" cy="100" r="85" fill="#0a0e27" opacity="0.9" />

      {/* The letter R with gradient and effects */}
      <text
        x="100"
        y="130"
        fontSize="120"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        textAnchor="middle"
        fill="url(#mainGradient)"
        filter="url(#shadow)"
        style={{
          letterSpacing: '-2px',
          paintOrder: 'stroke',
          stroke: '#1a5c3a',
          strokeWidth: '2',
        }}
      >
        R
      </text>

      {/* Decorative elements - numerology inspired circles */}
      {/* Top circle */}
      <circle cx="100" cy="30" r="6" fill="#00ff88" opacity="0.7" />
      
      {/* Right circle */}
      <circle cx="160" cy="100" r="6" fill="#c23b7e" opacity="0.7" />
      
      {/* Bottom circle */}
      <circle cx="100" cy="170" r="6" fill="#ff1493" opacity="0.7" />
      
      {/* Left circle */}
      <circle cx="40" cy="100" r="6" fill="#6b2d8f" opacity="0.7" />

      {/* Connecting lines (subtle) */}
      <line x1="100" y1="36" x2="100" y2="50" stroke="url(#mainGradient)" strokeWidth="1" opacity="0.3" />
      <line x1="154" y1="100" x2="140" y2="100" stroke="url(#mainGradient)" strokeWidth="1" opacity="0.3" />
      <line x1="100" y1="164" x2="100" y2="150" stroke="url(#mainGradient)" strokeWidth="1" opacity="0.3" />
      <line x1="46" y1="100" x2="60" y2="100" stroke="url(#mainGradient)" strokeWidth="1" opacity="0.3" />

      {/* Diagonal accent lines for numerology (1, 1, 1 = 3 lines) */}
      <line x1="75" y1="75" x2="65" y2="65" stroke="#00ff88" strokeWidth="1.5" opacity="0.5" />
      <line x1="125" y1="75" x2="135" y2="65" stroke="#00ff88" strokeWidth="1.5" opacity="0.5" />
      <line x1="100" y1="125" x2="100" y2="145" stroke="#00ff88" strokeWidth="1.5" opacity="0.5" />

      {/* Center accent glow */}
      <circle cx="100" cy="100" r="40" fill="none" stroke="url(#mainGradient)" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="url(#mainGradient)" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
};

export default RopdyLogo;
