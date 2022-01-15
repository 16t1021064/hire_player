import axiosInstance from "../axios";
import {
  TCreateHireRequest,
  TCreateHireResponse,
  TGetHireRequest,
  TGetHireResponse,
  TUserFinishRequest,
  TUserFinishResponse,
} from "./types";

export const createHireRequest = async (
  request: TCreateHireRequest
): Promise<TCreateHireResponse> => {
  const { data } = await axiosInstance.post(`/hires`, request);
  return data;
};

export const getHireRequest = async (
  request: TGetHireRequest
): Promise<TGetHireResponse> => {
  const { data } = await axiosInstance.get(`/hires/${request.id}`);
  return data;
};

export const userFinishRequest = async (
  request: TUserFinishRequest
): Promise<TUserFinishResponse> => {
  const { data } = await axiosInstance.put(`/hires/${request.id}/finish-soon`);
  return data;
};
