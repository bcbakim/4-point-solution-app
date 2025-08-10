import React from 'react';
import type { RecommendedPlan, StepId } from '../types';
import { STEPS } from '../constants';

interface ResultScreenProps {
  plan: RecommendedPlan;
  onNavigate: () => void;
}

const StepCard: React.FC<{ stepId: StepId }> = ({ stepId }) => {
  const step = STEPS[stepId];
  if (!step) return null;
  const stepNumber = step.id.replace('STEP', '');

  return (
    <div className="bg-white rounded-lg p-6 text-left border border-gray-200 shadow-sm">
      <h3 className="font-bold text-xl text-gray-800 mb-3 leading-tight">
        STEP {stepNumber}: {step.diagramTitle}
      </h3>
      <p className="text-gray-600 mb-4">{step.description}</p>
      <ul className="space-y-2">
        {step.details.map((detail, index) => (
          <li key={index} className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2.5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 text-sm">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ResultScreen: React.FC<ResultScreenProps> = ({ plan, onNavigate }) => {
  return (
    <div className="text-center animate-fade-in py-10 md:py-16">
      <header className="mb-10 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">개인 맞춤 솔루션</h1>
        <p className="mt-3 text-lg text-gray-600">진단 결과를 바탕으로 자녀에게 가장 적합한 플랜을 추천합니다.</p>
      </header>

      <div className="bg-gray-50/70 rounded-2xl shadow-xl shadow-gray-400/10 p-6 md:p-10 max-w-3xl mx-auto border border-gray-100">
        <h2 className="text-lg font-semibold text-orange-500 mb-2">추천 플랜</h2>
        <p className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">{plan.name}</p>
        
        {plan.steps.length > 0 ? (
          <div className="space-y-5">
            {plan.steps.map((stepId) => (
              <StepCard key={stepId} stepId={stepId} />
            ))}
          </div>
        ) : (
           <p className="text-gray-600">선택하신 내용으로는 추천 플랜을 구성하기 어렵습니다. 전문가와 상담하여 맞춤 솔루션을 찾아보세요.</p>
        )}
      </div>

      <div className="mt-12">
        <button
          onClick={onNavigate}
          className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-12 rounded-full hover:bg-orange-600 transition duration-300 shadow-lg shadow-orange-500/30"
        >
          신청 및 문의하기 &gt;
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;