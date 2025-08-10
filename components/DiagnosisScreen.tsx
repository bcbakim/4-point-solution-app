import React, { useState } from 'react';
import type { DiagnosisData, ProblemCategory, SupportEnvironment, DiagnosisCheckboxes } from '../types';
import { PROBLEM_CATEGORIES, SUPPORT_ENVIRONMENTS } from '../constants';
import AccordionItem from './AccordionItem';

interface DiagnosisScreenProps {
  onComplete: (data: DiagnosisData) => void;
}

const initialCheckboxes: DiagnosisCheckboxes = {
    language: { lessThan30Words: false, noVerbalRequest: false, echolalia: false, other: false },
    behavior: { problemBehavior: false, routineChangeDifficulty: false, specificActions: false, other: false },
    development: { comprehensiveSupport: false, structuredCurriculum: false, diverseTasks: false, other: false },
};

const DiagnosisScreen: React.FC<DiagnosisScreenProps> = ({ onComplete }) => {
  const [openCategory, setOpenCategory] = useState<ProblemCategory | null>('language');
  const [checkboxes, setCheckboxes] = useState<DiagnosisCheckboxes>(initialCheckboxes);
  const [supportEnvironment, setSupportEnvironment] = useState<SupportEnvironment | null>(null);

  const handleToggleCategory = (category: ProblemCategory) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleCheckboxChange = (category: ProblemCategory, questionId: string, checked: boolean) => {
    setCheckboxes(prev => ({
      ...prev,
      [category]: { ...prev[category], [questionId]: checked }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportEnvironment) {
        alert('지원 환경을 선택해주세요.');
        return;
    }
    onComplete({ checkboxes, supportEnvironment });
  };

  return (
    <div className="animate-fade-in">
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">아이 맞춤 진단하기</h1>
        <p className="mt-3 text-lg text-gray-600">아이의 특성과 지원 환경을 선택해주세요. (주 대상: 8세 미만 미취학 아동)</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        <section>
          <h2 className="text-xl font-bold mb-5 text-gray-800 text-center sm:text-left">1. 아이의 어떤 점이 가장 고민되시나요? (중복 선택 가능)</h2>
          <div className="space-y-3">
            {Object.values(PROBLEM_CATEGORIES).map(categoryInfo => (
              <AccordionItem
                key={categoryInfo.id}
                categoryInfo={categoryInfo}
                isOpen={openCategory === categoryInfo.id}
                onToggle={() => handleToggleCategory(categoryInfo.id)}
                checkboxState={checkboxes[categoryInfo.id]}
                onCheckboxChange={(questionId, checked) => handleCheckboxChange(categoryInfo.id, questionId, checked)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-5 text-gray-800 text-center sm:text-left">2. 어떤 환경의 지원을 선호하시나요? (하나만 선택)</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {Object.values(SUPPORT_ENVIRONMENTS).map(env => (
                <label key={env.id} className={`p-5 text-center border rounded-xl cursor-pointer transition-all duration-200 ${supportEnvironment === env.id ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500' : 'bg-white hover:border-gray-400'}`}>
                    <input
                        type="radio"
                        name="supportEnvironment"
                        value={env.id}
                        checked={supportEnvironment === env.id}
                        onChange={() => setSupportEnvironment(env.id)}
                        className="sr-only"
                    />
                    <div>
                        <p className="font-bold text-lg text-gray-800">{env.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{env.subtitle}</p>
                    </div>
                </label>
            ))}
          </div>
        </section>

        <div className="text-center pt-6">
          <button 
            type="submit"
            className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-16 rounded-full hover:bg-orange-600 transition duration-300 shadow-lg shadow-orange-500/30 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
            disabled={!supportEnvironment}
          >
            결과 보기
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiagnosisScreen;