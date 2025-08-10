
import React from 'react';

interface LogoProps {
  name: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ name, className = '' }) => {
  return (
    <div className={`flex items-center justify-center h-12 bg-gray-200 rounded-lg ${className}`}>
      <span className="text-sm font-semibold text-gray-600">{name}</span>
    </div>
  );
};

export default Logo;
