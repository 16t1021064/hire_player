import axiosInstance from "../axios";
import {
  TCreateHireRequest,
  TCreateHireResponse,
  TGetHireRequest,
  TGetHireResponse,
  TPlayerAcceptHireRequest,
  TPlayerAcceptHireResponse,
  TPlayerCancelHireRequest,
  TPlayerCancelHireResponse,
  TPlayerCompleteRequest,
  TPlayerCompleteResponse,
  TUserCancelRequest,
  TUserCancelResponse,
  TUserComplainRequest,
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

export const userComplainRequest = async (
  request: TUserComplainRequest
): Promise<TUserFinishResponse> => {
  const { data } = await axiosInstance.put(`/hires/${request.id}/complain`);
  return data;
};

export const playerAcceptHireRequest = async (
  request: TPlayerAcceptHireRequest
): Promise<TPlayerAcceptHireResponse> => {
  const { data } = await axiosInstance.put(`/hires/${request.id}/accept`);
  return data;
};

export const playerCancelHireRequest = async (
  request: TPlayerCancelHireRequest
): Promise<TPlayerCancelHireResponse> => {
  const { data } = await axiosInstance.put(
    `/hires/${request.id}/player-cancel`,
    request
  );
  return data;
};

export const userCancelRequest = async (
  request: TUserCancelRequest
): Promise<TUserCancelResponse> => {
  const { data } = await axiosInstance.put(
    `/hires/${request.id}/customer-cancel`
  );
  return data;
};

export const playerCompleteRequest = async (
  request: TPlayerCompleteRequest
): Promise<TPlayerCompleteResponse> => {
  const { data } = await axiosInstance.put(`/hires/${request.id}/complete`);
  return data;
};
