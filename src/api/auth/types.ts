import { TUserInfo } from "types";

export interface TLoginRequest {
  email: string;
  password: string;
}

export interface TLoginResponse {
  userInfo: TUserInfo;
  accessToken: string;
  refreshToken: string;
  message: "LOGIN_SUCCESS";
}

export interface TGetProfileResponse {
  userInfo: TUserInfo;
  message: string;
}

export interface TRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  hash: string;
  otp: string;
  password: string;
}

export interface TRegisterResponse {
  userInfo: TUserInfo;
  accessToken: string;
  refreshToken: string;
  message: "REGISTER_SUCCESS";
}

export interface TSendOtpRequest {
  email: string;
}

export interface TSendOtpResponse {
  hash: string;
  email: string;
  message: "SEND_OTP_SUCCESS";
}

export interface TLogoutRequest {
  refreshToken: string | null;
}

export interface TLogoutResponse {
  userInfo: TUserInfo | null;
  message: "LOGOUT_SUCCESS";
}

export interface TRequestResetPasswordRequest {
  email: string;
}

export interface TRequestResetPasswordResponse {
  message: "REQUEST_RESET_PASSWORD_SUCCESS";
}

export interface TResetPasswordRequest {
  userId: string;
  token: string;
  password: string;
}

export interface TResetPasswordResponse {
  userInfo: TUserInfo;
  message: "RESET_PASSWORD_SUCCESS";
}
