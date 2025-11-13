export interface HomeResponseDto {
  status: number;
  message: string;
  data: HomeResponseData;
  externalLink: string;
}
export interface HomeResponseData {
  toiletRecordCount: number;
  hasActivityRecord: boolean;
  heroImage: string;
  heroBackgroundColors: string[];
}
