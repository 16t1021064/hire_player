import axiosInstance from "../axios";
import {
  TLoginRequest,
  TLoginResponse,
  TGetProfileResponse,
  TRegisterRequest,
  TRegisterResponse,
  TSendOtpRequest,
  TSendOtpResponse,
  TLogoutRequest,
  TLogoutResponse,
  TRequestResetPasswordRequest,
  TRequestResetPasswordResponse,
  TResetPasswordResponse,
  TResetPasswordRequest,
} from "./types";

export const loginRequest = async (
  request: TLoginRequest
): Promise<TLoginResponse> => {
  const { data } = await axiosInstance.post(`/auth/login`, request);
  return data;
};

export const getProfileRequest = async (): Promise<TGetProfileResponse> => {
  const { data } = await axiosInstance.get(`/auth/get-profile`);
  return data;
};

export const registerRequest = async (
  request: TRegisterRequest
): Promise<TRegisterResponse> => {
  const { data } = await axiosInstance.post(`/auth/register`, request);
  return data;
};

export const sendOtpRequest = async (
  request: TSendOtpRequest
): Promise<TSendOtpResponse> => {
  const { data } = await axiosInstance.post(`/auth/send-otp`, request);
  return data;
};

export const logoutRequest = async (
  request: TLogoutRequest
): Promise<TLogoutResponse> => {
  const { data } = await axiosInstance.post(`/auth/logout`, request);
  return data;
};

export const requestResetPasswordRequest = async (
  request: TRequestResetPasswordRequest
): Promise<TRequestResetPasswordResponse> => {
  const { data } = await axiosInstance.post(
    `/auth/request-reset-password`,
    request
  );
  return data;
};

export const resetPasswordRequest = async (
  request: TResetPasswordRequest
): Promise<TResetPasswordResponse> => {
  const { data } = await axiosInstance.post(`/auth/reset-password`, request);
  return data;
};
