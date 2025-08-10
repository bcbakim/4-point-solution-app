
import React, { useState, useCallback } from 'react';
import type { Screen, DiagnosisData, RecommendedPlan, ProblemCategory } from './types';
import { getRecommendedPlan } from './constants';
import IntroScreen from './components/IntroScreen';
import DiagnosisScreen from './components/DiagnosisScreen';
import ResultScreen from './components/ResultScreen';
import ActionScreen from './components/ActionScreen';
import ProgressHeader from './components/ProgressHeader';
import IntroHeader from './components/IntroHeader';

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('intro');
    const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(null);
    const [recommendedPlan, setRecommendedPlan] = useState<RecommendedPlan | null>(null);

    const handleNavigate = useCallback((newScreen: Screen) => {
        window.scrollTo(0, 0);
        setScreen(newScreen);
    }, []);

    const handleDiagnosisComplete = useCallback((data: DiagnosisData) => {
        const activeProblems: ProblemCategory[] = [];
        
        if (Object.values(data.checkboxes.language).some(v => v)) {
            activeProblems.push('language');
        }
        if (Object.values(data.checkboxes.behavior).some(v => v)) {
            activeProblems.push('behavior');
        }
        if (Object.values(data.checkboxes.development).some(v => v)) {
            activeProblems.push('development');
        }

        if (data.supportEnvironment) {
             const plan = getRecommendedPlan(activeProblems, data.supportEnvironment);
             setRecommendedPlan(plan);
        }
       
        setDiagnosisData(data);
        handleNavigate('result');
    }, [handleNavigate]);

    const renderScreen = () => {
        switch (screen) {
            case 'intro':
                return <IntroScreen onNavigate={() => handleNavigate('diagnosis')} />;
            case 'diagnosis':
                return <DiagnosisScreen onComplete={handleDiagnosisComplete} />;
            case 'result':
                if (!recommendedPlan) return <p>결과를 불러오는 중 오류가 발생했습니다.</p>;
                return <ResultScreen plan={recommendedPlan} onNavigate={() => handleNavigate('action')} />;
            case 'action':
                if (!diagnosisData || !recommendedPlan) return <p>결과를 불러오는 중 오류가 발생했습니다.</p>;
                return <ActionScreen diagnosisData={diagnosisData} plan={recommendedPlan} onRestart={() => handleNavigate('intro')} />;
            default:
                return <IntroScreen onNavigate={() => handleNavigate('diagnosis')} />;
        }
    };

    const isIntroScreen = screen === 'intro';

    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col">
            {isIntroScreen ? <IntroHeader /> : <ProgressHeader currentScreen={screen} />}
            <main className={`w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 ${isIntroScreen ? 'flex-grow flex items-center justify-center' : ''}`}>
                {renderScreen()}
            </main>
        </div>
    );
};

export default App;