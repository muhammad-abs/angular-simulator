import { Role } from '../../enums/Role';

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: Role;
}

export interface ILoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface IAuthResponse extends IUser {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}
