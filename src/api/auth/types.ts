import { TUser } from "types";

export interface TLoginRequest {
  email: string;
  password: string;
}

export interface TLoginResponse {
  data: TUser;
  accessToken: string;
  refreshToken: string;
  message: "LOGIN_SUCCESS";
}

export interface TGetProfileResponse {
  data: TUser;
  message: "GET_PROFILE_SUCCESS";
}

export interface TRegisterRequest {
  userName: string;
  email: string;
  hash: string;
  otp: string;
  password: string;
}

export interface TRegisterResponse {
  data: TUser;
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
  data: TUser | null;
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
  data: TUser;
  message: "RESET_PASSWORD_SUCCESS";
}
