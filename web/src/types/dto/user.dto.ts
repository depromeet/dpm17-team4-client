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
  gender: 'M' | 'F' | null;
  birthYear: number;
}

export interface UserMeResponseDto {
  status: number;
  message: string;
  data: UserData;
  externalLink: string;
}

export interface UserUpdateRequestDto {
  nickname?: string;
  profileImage?: string;
  gender?: 'M' | 'F' | null;
  birthYear?: number;
}
