// 배변 기록 폼 타입
export interface DefecationState {
  selectedWhen: Date; // 배변 시각
  selectedTry: string; // 배변 시도
  selectedColor: string; // 배변 색상
  selectedShape: string; // 배변 모양
  selectedPain: string; // 배변 통증
  selectedTimeTaken: string; // 배변 소요 시간
  selectedOptional: string; // 배변 특이 사항
}
