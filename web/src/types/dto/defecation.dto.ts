export interface PostDefecationDataRequestDto {
  occurredAt: string;
  isSuccessful: boolean;
  color: string;
  shape: string;
  pain: number;
  duration: number;
  note: string;
}

export interface DefecationDataResponseDto {
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

export interface CalendarDataResultDto {
  date: string;
  activityExists: boolean;
  toiletExists: boolean;
}
export interface CalendarDataResponseDto {
  status: number;
  message: string;
  data: {
    startDate: string;
    endDate: string;
    results: CalendarDataResultDto[];
  };
}

export interface CalendarDataByDateResponseDto {
  score: number;
  toiletRecordCount: number;
  hasActivityRecord: boolean;
}

export interface CalendarDataByDateResponseDtoResponseDto {
  status: number;
  message: string;
  data: CalendarDataByDateResponseDto;
}

export interface DefecationRecordListResponseDto {
  date: string;
  items: {
    id: number;
    activityTime: string;
  }[];
}

export interface DefecationRecordListResponseDtoResponseDto {
  status: number;
  message: string;
  data: DefecationRecordListResponseDto;
}
