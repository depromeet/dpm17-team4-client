// 점수 상세 정보 DTO
export interface ScoreDetailsDto {
  accuracy: number;
  speed: number;
  consistency: number;
}

// 점수 리포트 응답 DTO
export interface ReportDataResponseDto {
  score: number;
  details: ScoreDetailsDto;
}
