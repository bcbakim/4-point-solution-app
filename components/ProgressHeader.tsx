import React from 'react';
import type { Screen } from '../types';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ProgressNode: React.FC<{ title: string, stepNumber: number, isComplete: boolean, isActive: boolean }> = ({ title, stepNumber, isComplete, isActive }) => {
    return (
        <div className="flex flex-col items-center w-28 text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                ${isComplete ? 'bg-orange-500 text-white' : ''}
                ${isActive ? 'bg-white text-orange-500 border-2 border-orange-500' : ''}
                ${!isComplete && !isActive ? 'bg-gray-300 text-gray-500' : ''}
            `}>
                {isComplete ? <CheckIcon /> : stepNumber}
            </div>
            <p className={`mt-2 text-sm font-semibold transition-colors duration-300 ${isActive || isComplete ? 'text-orange-600' : 'text-gray-500'}`}>
                {title}
            </p>
        </div>
    )
};


const ProgressHeader: React.FC<{ currentScreen: Screen }> = ({ currentScreen }) => {
    const screens = ['diagnosis', 'result', 'action'];
    const titles = ['아이 진단', '솔루션 추천', '신청 및 문의'];
    const currentIndex = screens.indexOf(currentScreen);

    return (
        <div className="w-full bg-gray-50/80 py-6 border-b border-gray-200">
            <div className="flex justify-center items-start max-w-2xl mx-auto relative px-4">
                {screens.map((screen, index) => (
                   <React.Fragment key={screen}>
                       <ProgressNode 
                           title={titles[index]}
                           stepNumber={index + 1}
                           isComplete={currentIndex > index}
                           isActive={currentIndex === index}
                       />
                       {index < screens.length - 1 && (
                           <div className="flex-1 mt-5 h-1 transition-colors duration-500
                               ${currentIndex > index ? 'bg-orange-500' : 'bg-gray-300'}" 
                           />
                       )}
                   </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ProgressHeader;