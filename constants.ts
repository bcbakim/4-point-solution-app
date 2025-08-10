
import type { ProblemCategory, RecommendedPlan, SupportEnvironment, Step, StepId } from './types';

export const PROBLEM_CATEGORIES: Record<ProblemCategory, { id: ProblemCategory; title: string; icon: string; questions: { id: string; label: string }[] }> = {
  language: {
    id: 'language',
    title: '언어 및 의사소통',
    icon: '💬',
    questions: [
      { id: 'lessThan30Words', label: '아이가 표현하는 단어가 30개 미만이에요.' },
      { id: 'noVerbalRequest', label: '언어로 원하는 것을 요청하지 않아요.' },
      { id: 'echolalia', label: '외웠던 말을 혼자 말하는 경우가 많아요.' },
      { id: 'other', label: '기타 (예: 특정 발음의 어려움, 문장 구성의 문제 등)' },
    ],
  },
  behavior: {
    id: 'behavior',
    title: '도전적 행동',
    icon: '🧩',
    questions: [
      { id: 'problemBehavior', label: '물건을 던지거나 소리를 지르는 등 문제행동이 나타나요.' },
      { id: 'routineChangeDifficulty', label: '일과 변경 시에 어려움이 있어요.' },
      { id: 'specificActions', label: '엘레베이터 버튼을 누르거나 지나치게 뛰는 등의 문제행동이 나타나요.' },
      { id: 'other', label: '기타 (예: 잦은 감정 기복, 사회적 상호작용의 어려움 등)' },
    ],
  },
  development: {
    id: 'development',
    title: '전반적 발달 및 학습',
    icon: '📚',
    questions: [
      { id: 'comprehensiveSupport', label: '언어뿐만 아니라 인지, 사회성 등 여러 영역에서 종합적인 발달 지원이 필요해요.' },
      { id: 'structuredCurriculum', label: '아이의 현재 수준에 맞는 체계적인 커리큘럼(예: ABLLS-R, VB-MAPP 기반)을 배워 가르치고 싶어요.' },
      { id: 'diverseTasks', label: '다양한 과제를 시도하며 우리 아이가 무엇을 잘하고 어려워하는지 확인하고 싶어요.' },
      { id: 'other', label: '기타 (예: 대소근육 발달 지연, 학습 동기 부족 등)' },
    ],
  },
};

export const SUPPORT_ENVIRONMENTS: Record<SupportEnvironment, { id: SupportEnvironment; title: string; subtitle: string }> = {
    home: { id: 'home', title: '가정 중심', subtitle: '부모 주도형' },
    expert: { id: 'expert', title: '전문가 연계', subtitle: '통합 지원형' },
    institution: { id: 'institution', title: '기관 중심', subtitle: '전문가 주도형' },
};

export const STEPS: Record<StepId, Step> = {
  'STEP1': {
    id: 'STEP1',
    diagramTitle: 'NDBI 모듈 제공',
    title: '일상에서의 언어 및 기능 증진',
    description: '본 NDBI 모듈은 시애틀 아동병원 자폐센터에서 개발한 교육 프로그램입니다. 자연주의 발달행동 중재(NDBI)의 핵심 원리를 담은 영상을 보고, 실제 가정에서 적용하는 모습을 전문가(BCBA)와 공유합니다. 전문가는 영상을 검토한 후 맞춤 피드백을 제공하여, 효과적인 중재가 이루어지도록 돕습니다.',
    details: ['아이와의 상호작용을 위한 놀이 활동', '동기 중심 접근을 통한 언어 발달 촉진', 'NDBI 핵심 원리 영상 학습', '가정 내 중재 영상 촬영 및 공유', '전문가(BCBA)의 1:1 맞춤 피드백']
  },
  'STEP2': {
    id: 'STEP2',
    diagramTitle: '52주 IEP HOME 프로그램',
    title: 'IEP 기반의 체계적인 가정 내 교육',
    description: '개별화 교육 계획(IEP)에 기반하여 52주간 가정에서 아동의 발달 과업을 체계적으로 교육하는 프로그램입니다.',
    details: ['개별화 교육 목표 설정', '주간/월간 IEP 커리큘럼', '가정 연계 학습 자료 제공']
  },
  'STEP3': {
    id: 'STEP3',
    diagramTitle: 'K-RUBI 시스템 제공',
    title: '문제행동에 대한 부모교육 및 중재',
    description: '문제행동에 대한 효과적인 부모교육과 중재를 위한 K-RUBI 시스템(공식 부모교육 프로그램)을 제공합니다.',
    details: ['K-RUBI 부모교육 프로그램', '행동 기능 평가(FBA)', '긍정적 행동 지원(PBS) 전략']
  },
  'STEP4': {
    id: 'STEP4',
    diagramTitle: 'OFF-LINE 교육',
    title: '전문가 주도의 센터 내 직접 교육',
    description: '전문 치료사가 센터 내에서 아동을 직접 교육하고 평가하며, 가정과 연계하여 개입 효과를 극대화합니다.',
    details: ['센터 기반 1:1 직접 교육', '정기적 발달 평가 및 피드백', '가정-센터 연계 컨설팅']
  }
};

const solutionRules: Record<string, { name: string; steps: StepId[] }> = {
  // A: '가정 중심' (Home-focused)
  'language_home': { name: 'NDBI 모듈', steps: ['STEP1'] },
  'behavior_home': { name: 'K-RUBI 행동 지원 플랜', steps: ['STEP3'] },
  'development_home': { name: 'IEP-HOME 발달 지원 플랜', steps: ['STEP2'] },
  'behavior_language_home': { name: 'NDBI & K-RUBI 통합 플랜', steps: ['STEP1', 'STEP3'] },
  'development_language_home': { name: 'NDBI & IEP-HOME 통합 플랜', steps: ['STEP1', 'STEP2'] },
  'behavior_development_home': { name: 'K-RUBI & IEP-HOME 통합 플랜', steps: ['STEP2', 'STEP3'] },
  'behavior_development_language_home': { name: '가정 중심 종합 플랜', steps: ['STEP1', 'STEP2', 'STEP3'] },

  // B: '전문가 연계' (Expert-supported: Home + Expert)
  'language_expert': { name: 'NDBI & 전문가 연계 플랜', steps: ['STEP1', 'STEP4'] },
  'behavior_expert': { name: 'K-RUBI & 전문가 연계 플랜', steps: ['STEP3', 'STEP4'] },
  'development_expert': { name: 'IEP-HOME & 전문가 연계 플랜', steps: ['STEP2', 'STEP4'] },
  'behavior_language_expert': { name: 'NDBI & K-RUBI 통합 집중 지원 플랜', steps: ['STEP1', 'STEP3', 'STEP4'] },
  'development_language_expert': { name: 'NDBI & IEP-HOME 통합 집중 지원 플랜', steps: ['STEP1', 'STEP2', 'STEP4'] },
  'behavior_development_expert': { name: 'K-RUBI & IEP-HOME 통합 집중 지원 플랜', steps: ['STEP2', 'STEP3', 'STEP4'] },
  'behavior_development_language_expert': { name: '종합 관리 플랜 (Full-STEP)', steps: ['STEP1', 'STEP2', 'STEP3', 'STEP4'] },
  
  // C: '기관 중심' (Institution-led: Expert-only, no home steps)
  'language_institution': { name: '전문가 주도 언어 집중 플랜', steps: ['STEP4'] },
  'behavior_institution': { name: '전문가 주도 K-RUBI 중재 플랜', steps: ['STEP3', 'STEP4'] },
  'development_institution': { name: '전문가 주도 발달 집중 플랜', steps: ['STEP4'] },
  'behavior_language_institution': { name: '전문가 주도 통합 중재 플랜', steps: ['STEP3', 'STEP4'] },
  'development_language_institution': { name: '전문가 주도 통합 발달 플랜', steps: ['STEP4'] },
  'behavior_development_institution': { name: '전문가 주도 통합 행동발달 플랜', steps: ['STEP3', 'STEP4'] },
  'behavior_development_language_institution': { name: '전문가 주도 종합 관리 플랜', steps: ['STEP3', 'STEP4'] },

  // 기본 규칙 (Default)
  'default': { name: '전문가 맞춤 진단 플랜', steps: [] },
};

export function getRecommendedPlan(activeProblems: ProblemCategory[], environment: SupportEnvironment): RecommendedPlan {
  if (activeProblems.length === 0 || !environment) {
    return solutionRules['default'];
  }

  const sortedProblems = [...activeProblems].sort().join('_');
  const key = `${sortedProblems}_${environment}`;

  // Find the plan from the rules. If it doesn't exist, use the default.
  const plan = solutionRules[key] || solutionRules['default'];

  // Make a copy to avoid mutating the original constant
  const recommendedPlan = { ...plan, steps: [...plan.steps] };

  // Sort steps for consistent display order (STEP1, STEP2, ...)
  recommendedPlan.steps.sort((a, b) => parseInt(a.replace('STEP', '')) - parseInt(b.replace('STEP', '')));

  return recommendedPlan;
}