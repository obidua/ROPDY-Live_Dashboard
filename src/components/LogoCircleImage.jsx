import React, { useEffect, useState } from 'react';

const LogoCircleImage = ({ size = 64, className = '' }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <img
      src="/ropdy circle.png"
      alt="ROPDY Circle Logo"
      width={size}
      height={size}
      className={`${className} object-contain`}
      style={{
        display: 'inline-block',
        filter: isDark 
          ? 'drop-shadow(0 2px 12px rgba(0, 255, 136, 0.3))'
          : 'brightness(0.95) drop-shadow(0 1px 4px rgba(0, 0, 0, 0.1))',
        transition: 'filter 0.3s ease',
        backgroundColor: isDark ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
        padding: isDark ? '0' : '4px',
        borderRadius: '50%',
      }}
    />
  );
};

export default LogoCircleImage;
