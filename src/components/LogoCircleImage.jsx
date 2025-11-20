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
          : 'drop-shadow(0 2px 8px rgba(0, 102, 112, 0.2))',
        transition: 'filter 0.3s ease',
      }}
    />
  );
};

export default LogoCircleImage;
