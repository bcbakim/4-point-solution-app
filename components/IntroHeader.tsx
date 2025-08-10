import React from 'react';

const IntroHeader: React.FC = () => {
  return (
    <header className="w-full bg-white py-4 border-b border-gray-200">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex justify-center items-center gap-4 md:gap-8">
        <span className="text-lg font-semibold text-gray-500">현대해상</span>
        <h2 className="text-xl font-bold text-gray-700">아이마음 탐사대</h2>
        <span className="text-lg font-semibold text-gray-500">심플스텝ABA</span>
      </div>
    </header>
  );
};

export default IntroHeader;
