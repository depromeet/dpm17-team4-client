export interface ScoreDetailsDto {
  accuracy: number;
  speed: number;
  consistency: number;
}

export interface ReportDataResponseDto {
  score: number;
  details: ScoreDetailsDto;
}
