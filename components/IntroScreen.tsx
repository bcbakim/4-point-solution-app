import React from 'react';

interface IntroScreenProps {
  onNavigate: () => void;
}

// A generic star icon component
const StarIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
);


const IntroScreen: React.FC<IntroScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex flex-col items-center text-center animate-fade-in">
      <div className="flex items-center justify-center space-x-2 mb-8" aria-hidden="true">
          <StarIcon className="w-5 h-5 text-orange-500 transform -translate-y-3" />
          <StarIcon className="w-10 h-10 text-yellow-400" />
          <StarIcon className="w-7 h-7 text-sky-400 transform -translate-y-2" />
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
          우리 아이, 어떻게 도와주어야 할까요?
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-12 leading-relaxed">
          아이의 특성과 가정 환경에 꼭 맞는<br />4-Point 통합개입 솔루션을 추천 받아보세요.
        </p>

        <button
          onClick={onNavigate}
          className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg shadow-orange-500/30"
        >
          내 아이 맞춤 솔루션 찾기 →
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
