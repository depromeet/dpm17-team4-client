import apiClient from '@/lib/api-client';
import {
  RecordDataRequestDto,
  RecordDataResponseDto,
} from '@/types/dto/record.dto';

export const recordApi = {
  record: (color: RecordDataRequestDto) =>
    apiClient.post<RecordDataResponseDto>('/api/record', { color }),
};
