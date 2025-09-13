export type SessionData = {
  accessToken?: string;
  refreshToken?: string;
  userId: string;
  isLoggedIn?: boolean;
  accessTokenExpiresAt?: number;
  user: {
    id: string;
    nickname: string;
    email?: string;
    profileImage?: string;
    avatarUrl?: string;
  };
};
