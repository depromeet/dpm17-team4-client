import type {
  DEFECATION_COLOR,
  DEFECATION_DETAIL,
  DEFECATION_PAIN,
  DEFECATION_SHAPE,
  DEFECATION_TIME_TAKEN,
} from '../constants';

/**
 * @description 배변 기록 폼 타입
 */ export interface DefecationState {
  selectedWhen: Date;
  selectedTry: string;
  selectedColor: string;
  selectedShape: string;
  selectedPain: string;
  selectedTimeTaken: string;
  selectedOptional: string;
}

/**
 * @description 배변 기록 상세 타입
 */
export type DefecationTryDetailKey = keyof typeof DEFECATION_DETAIL;
export type DefecationTryDetailValue =
  (typeof DEFECATION_DETAIL)[DefecationTryDetailKey];

/**
 * @description 배변 색상 타입
 */
export type DefecationTryColorKey = keyof typeof DEFECATION_COLOR;
export type DefecationTryColorValue =
  (typeof DEFECATION_COLOR)[DefecationTryColorKey];

/**
 * @description 배변 모양 타입
 */
export type DefecationTryShapeKey = keyof typeof DEFECATION_SHAPE;
export type DefecationTryShapeValue =
  (typeof DEFECATION_SHAPE)[DefecationTryShapeKey];

/**
 * @description 배변 통증 타입 (TODO: 통증 정도에 대한 디테일 작업은 UI 확정 후 변경 필요)
 */
export type DefecationTryPainKey = keyof typeof DEFECATION_PAIN;
export type DefecationTryPainValue =
  (typeof DEFECATION_PAIN)[DefecationTryPainKey];

/**
 * @description 배변 소요 시간 타입
 */
export type DefecationTryTimeTakenKey = keyof typeof DEFECATION_TIME_TAKEN;
export type DefecationTryTimeTakenValue =
  (typeof DEFECATION_TIME_TAKEN)[DefecationTryTimeTakenKey];
