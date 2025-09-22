export interface PostDefecationDataRequestDto {
  occurredAt: string;
  isSuccessful: boolean;
  color: string;
  shape: string;
  pain: number;
  duration: number;
  note: string;
}

export interface PostDefecationDataResponseDto {
  status: number;
  message: string;
  data: {
    id: string;
    userId: number;
    occurredAt: string;
    isSuccessful: boolean;
    color: string;
    shape: string;
    pain: number;
    duration: number;
    note: string;
  };
}
