export interface RecordDataRequestDto {
  color: string;
  shape: string;
  time: string;
  info: string;
}

export interface RecordDataResponseDto {
  message: string;
  color: string;
  timestamp: string;
}
