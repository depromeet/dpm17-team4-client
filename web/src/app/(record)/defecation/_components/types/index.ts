import type {
  DEFECATION_COLOR,
  DEFECATION_DETAIL,
  DEFECATION_SHAPE,
  DEFECATION_TIME_TAKEN,
} from '../constants';

// NOTE: 배변 기록 폼 타입
export interface DefecationState {
  selectedWhen: Date;
  selectedTry: string;
  selectedColor: string;
  selectedShape: string;
  selectedPain: number;
  selectedTimeTaken: string;
  selectedOptional: string;
}

// NOTE: 배변 기록 상세 타입
export type DefecationTryDetailKey = keyof typeof DEFECATION_DETAIL;
export type DefecationTryDetailValue =
  (typeof DEFECATION_DETAIL)[DefecationTryDetailKey];

// NOTE: 배변 색상 타입
export type DefecationTryColorKey = keyof typeof DEFECATION_COLOR;
export type DefecationTryColorValue =
  (typeof DEFECATION_COLOR)[DefecationTryColorKey];

// NOTE: 배변 모양 타입
export type DefecationTryShapeKey = keyof typeof DEFECATION_SHAPE;
export type DefecationTryShapeValue =
  (typeof DEFECATION_SHAPE)[DefecationTryShapeKey];

// NOTE: 배변 소요 시간 타입
export type DefecationTryTimeTakenKey = keyof typeof DEFECATION_TIME_TAKEN;
export type DefecationTryTimeTakenValue =
  (typeof DEFECATION_TIME_TAKEN)[DefecationTryTimeTakenKey];
