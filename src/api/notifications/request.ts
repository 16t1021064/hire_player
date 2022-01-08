import axiosInstance from "../axios";
import {
  TPlayerAcceptHireRequest,
  TPlayerAcceptHireResponse,
  TGetNotificationsRequest,
  TGetNotificationsResponse,
  TPlayerCancelHireRequest,
  TPlayerCancelHireResponse,
} from "./types";

export const getNotificationsRequest = async (
  request: TGetNotificationsRequest
): Promise<TGetNotificationsResponse> => {
  const { data } = await axiosInstance.get(`/notifications`, {
    params: request,
  });
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
