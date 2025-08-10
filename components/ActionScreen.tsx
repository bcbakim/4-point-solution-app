
import React, { useState } from 'react';
import type { DiagnosisData, RecommendedPlan, ContactFormData, ProblemCategory, StepId } from '../types';
import Step from './Step';
import { STEPS, PROBLEM_CATEGORIES } from '../constants';

// Helper functions moved from the deprecated emailService

// Helper to format the diagnosis results into a readable string
function formatDiagnosis(diagnosisData: DiagnosisData): string {
    let result = "진단 결과:\n\n";
    result += "문제 영역:\n";
    const processCategory = (category: ProblemCategory) => {
        const checkValues = Object.values(diagnosisData.checkboxes[category]);
        if (!checkValues.some(v => v)) return;

        result += `\n[${PROBLEM_CATEGORIES[category].title}]\n`;
        PROBLEM_CATEGORIES[category].questions.forEach(q => {
            const questionId = q.id as keyof typeof diagnosisData.checkboxes[typeof category];
            result += `- ${q.label}: ${diagnosisData.checkboxes[category][questionId] ? "예" : "아니오"}\n`;
        });
    };
    (['language', 'behavior', 'development'] as ProblemCategory[]).forEach(processCategory);
    result += "\n지원 환경: " + (diagnosisData.supportEnvironment || '선택 안함') + "\n";
    return result;
}

// Helper to format the recommended plan details
function formatRecommendedPlan(plan: RecommendedPlan): string {
    if (!plan.steps || plan.steps.length === 0) {
        return "추천된 세부 프로그램이 없습니다. 전문가 상담을 통해 결정됩니다.";
    }
    let result = "추천된 플랜의 세부 내용:\n\n";
    plan.steps.forEach(stepId => {
        const step = STEPS[stepId as StepId];
        if (step) {
            result += `[STEP ${step.id.replace('STEP', '')}: ${step.diagramTitle}]\n`;
            result += `${step.description}\n`;
            result += "주요 내용:\n";
            step.details.forEach(detail => {
                result += `- ${detail}\n`;
            });
            result += "\n";
        }
    });
    return result;
}


interface ActionScreenProps {
  diagnosisData: DiagnosisData;
  plan: RecommendedPlan;
  onRestart: () => void;
}

const ActionScreen: React.FC<ActionScreenProps> = ({ diagnosisData, plan, onRestart }) => {
    const [formData, setFormData] = useState<ContactFormData>({
        guardianName: '',
        childName: '',
        childDob: '',
        inquiry: '',
        privacyConsent: false
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const recommendedPlanDisplay = plan.steps.length > 0 
        ? plan.steps.map(stepId => {
            const step = STEPS[stepId];
            if (!step) return null;
            const stepNumber = step.id.replace('STEP', '');
            return `STEP ${stepNumber}: ${step.diagramTitle}`;
          }).filter(Boolean).join(', ')
        : plan.name;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const encode = (data: { [key: string]: any }) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.privacyConsent) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }
        setStatus('loading');

        const submissionData = {
            "form-name": "contact",
            ...formData,
            recommendedPlan: recommendedPlanDisplay,
            diagnosisSummary: formatDiagnosis(diagnosisData),
            recommendedPlanDescription: formatRecommendedPlan(plan),
        };

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode(submissionData)
        })
        .then(() => {
            setStatus('success');
        })
        .catch((error) => {
            console.error(error);
            setStatus('error');
        });
    };
    
    if (status === 'success') {
        return (
            <div className="text-center py-16 md:py-24 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-3xl font-bold text-gray-800">신청이 완료되었습니다.</h2>
                <p className="text-lg text-gray-600 mt-3 max-w-xl mx-auto">
                  본 프로그램은 현대해상 아이마음 탐사대의 지원으로 심플스텝ABA가 진행합니다.
                  영업일 기준 1-2일 내에 전문가가 연락 드릴 예정입니다.
                </p>
                <button
                    onClick={onRestart}
                    className="mt-10 bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition duration-300"
                >
                    처음으로 돌아가기
                </button>
            </div>
        )
    }

    return (
        <div className="animate-fade-in space-y-12 md:space-y-16">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">실행 안내 및 문의</h1>
                <p className="mt-3 text-lg text-gray-600">
                    아래 정보를 입력하여 추천된 플랜에 대한 문의를 완료해주세요.
                </p>
            </header>

            <section className="bg-gray-50/80 p-6 md:p-8 rounded-2xl">
                <h2 className="text-xl font-bold mb-6 text-center text-gray-800">진행 절차 안내</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <Step icon="💬" title="전문가 최종 상담" description="초기 상담을 통해 플랜을 확정합니다." />
                    <Step icon="📄" title="지원금 사용 신청" description="현대해상 지원금 사용 절차를 안내합니다." />
                    <Step icon="🚀" title="프로그램 시작" description="개별 맞춤 프로그램을 시작합니다." />
                    <Step icon="🔄" title="지속적인 관리" description="정기적인 평가와 피드백을 제공합니다." />
                </div>
            </section>
            
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200">
                <h2 className="text-xl font-bold mb-6 text-center text-gray-800">솔루션 신청 및 문의하기</h2>
                <form 
                    name="contact" 
                    method="POST" 
                    data-netlify="true" 
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit} 
                    className="space-y-5 max-w-xl mx-auto"
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                        <label>
                            Don’t fill this out if you’re human: <input name="bot-field" />
                        </label>
                    </p>
                    <div>
                        <label htmlFor="recommendedPlan" className="block text-sm font-medium text-gray-700 mb-1">추천된 플랜</label>
                        <input 
                            type="text" 
                            name="recommendedPlan" 
                            id="recommendedPlan" 
                            readOnly 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-100 cursor-not-allowed" 
                            value={recommendedPlanDisplay} 
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 mb-1">보호자 성함</label>
                            <input type="text" name="guardianName" id="guardianName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={formData.guardianName} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">아동 이름</label>
                            <input type="text" name="childName" id="childName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={formData.childName} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="childDob" className="block text-sm font-medium text-gray-700 mb-1">아동 생년월일</label>
                        <input type="date" name="childDob" id="childDob" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={formData.childDob} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">추가 문의사항</label>
                        <textarea name="inquiry" id="inquiry" rows={4} placeholder="궁금한 점을 자유롭게 남겨주세요." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={formData.inquiry} onChange={handleChange}></textarea>
                    </div>
                    <div className="pt-2">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="privacyConsent" name="privacyConsent" type="checkbox" required className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded" checked={formData.privacyConsent} onChange={handleChange} />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="privacyConsent" className="font-medium text-gray-700">개인정보 수집 및 이용에 동의합니다.</label>
                            </div>
                        </div>
                    </div>
                    <div className="text-center pt-6">
                        <button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-12 rounded-full hover:bg-orange-600 transition duration-300 shadow-lg shadow-orange-500/30 disabled:bg-gray-400 disabled:shadow-none">
                            {status === 'loading' ? '전송 중...' : '전문가에게 문의 내용 전송하기'}
                        </button>
                        {status === 'error' && <p className="text-red-500 mt-2">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>}
                    </div>
                </form>
            </section>

            <footer className="pt-8 border-t border-gray-200 text-sm text-gray-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-base text-gray-800">K-RUBI 공식 플랫폼</h3>
                        <p className="my-2 text-gray-600">도전적 행동 중재를 위한 K-RUBI 부모교육 프로그램이 운영되는 공식 플랫폼을 직접 둘러보실 수 있습니다.</p>
                        <a href="https://www.krubi.co.kr/" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:underline">K-RUBI 사이트 바로가기 &gt;</a>
                    </div>
                    <div>
                        <h3 className="font-bold text-base text-gray-800">심플스텝ABA 아동발달연구소</h3>
                        <p className="my-2 text-gray-600">본 솔루션을 주관하는 저희 심플스텝ABA의 비전과 ABA 기반의 다양한 중재 프로그램에 대해 더 알아보실 수 있습니다.</p>
                        <a href="https://www.simplestepaba.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:underline">심플스텝ABA 홈페이지 &gt;</a>
                    </div>
                    <div>
                        <h3 className="font-bold text-base text-gray-800">아이랑ABA행동발달연구소</h3>
                        <p className="my-2 text-gray-600">아이랑ABA행동발달연구소는 ABA 기반의 전문적인 프로그램을 통해 아동의 긍정적 성장을 지원합니다.</p>
                        <a href="https://blog.naver.com/irangaba" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:underline">아이랑ABA 사이트 바로가기 &gt;</a>
                    </div>
                    <div>
                        <h3 className="font-bold text-base text-gray-800">새길온사회적 협동조합</h3>
                        <p className="my-2 text-gray-600">발달장애 아동 및 가족을 위한 다양한 지원 사업을 펼치는 사회적 기업입니다.</p>
                        <a href="https://naver.me/xyduVDht" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:underline">새길온 홈페이지 바로가기 &gt;</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ActionScreen;