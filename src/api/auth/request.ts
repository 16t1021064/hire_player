import axiosInstance from "../axios";
import {
  TLoginRequest,
  TLoginResponse,
  TRefreshUserResponse,
  TRegisterRequest,
  TRegisterResponse,
} from "./types";

export const loginRequest = async (
  request: TLoginRequest
): Promise<TLoginResponse> => {
  const { data } = await axiosInstance.post(`/auth/login`, request);
  return data;
};

export const refreshUserRequest = async (): Promise<TRefreshUserResponse> => {
  const { data } = await axiosInstance.get(`/auth/get-profile`);
  return data;
};

export const registerRequest = async (
  request: TRegisterRequest
): Promise<TRegisterResponse> => {
  const { data } = await axiosInstance.post(`/auth/register`, request);
  return data;
};
