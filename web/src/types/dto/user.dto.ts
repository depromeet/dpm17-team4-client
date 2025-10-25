export interface Provider {
  type: 'KAKAO' | 'APPLE';
  id: string;
}

export interface UserData {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  provider: Provider;
  gender: 'M' | 'F';
  birthYear: number;
}

export interface UserMeResponseDto {
  status: number;
  message: string;
  data: UserData;
  externalLink: string;
}
