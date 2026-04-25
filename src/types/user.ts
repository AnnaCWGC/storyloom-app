export type AppUser = {
  id: string;
  name: string;
  email: string;
  diamonds: number;
  avatar?: string;
};

export type LoginWithEmailPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: AppUser;
  accessToken: string;
  refreshToken?: string;
};
