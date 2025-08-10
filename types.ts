export type Screen = 'intro' | 'diagnosis' | 'result' | 'action';

export type ProblemCategory = 'language' | 'behavior' | 'development';

export type SupportEnvironment = 'home' | 'expert' | 'institution';

export interface DiagnosisCheckboxes {
  language: {
    lessThan30Words: boolean;
    noVerbalRequest: boolean;
    echolalia: boolean;
    other: boolean;
  };
  behavior: {
    problemBehavior: boolean;
    routineChangeDifficulty: boolean;
    specificActions: boolean;
    other: boolean;
  };
  development: {
    comprehensiveSupport: boolean;
    structuredCurriculum: boolean;
    diverseTasks: boolean;
    other: boolean;
  };
}

export interface DiagnosisData {
  checkboxes: DiagnosisCheckboxes;
  supportEnvironment: SupportEnvironment | null;
}

export type StepId = 'STEP1' | 'STEP2' | 'STEP3' | 'STEP4';

export interface Step {
  id: StepId;
  diagramTitle: string;
  title: string;
  description: string;
  details: string[];
}

export interface RecommendedPlan {
  name: string;
  steps: StepId[];
}

export interface ContactFormData {
    guardianName: string;
    childName:string;
    childDob: string;
    inquiry: string;
    privacyConsent: boolean;
}