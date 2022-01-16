import axiosInstance from "../axios";
import {
  TGetNotificationsRequest,
  TGetNotificationsResponse,
  TReadNotificationsResponse,
} from "./types";

export const getNotificationsRequest = async (
  request: TGetNotificationsRequest
): Promise<TGetNotificationsResponse> => {
  const { data } = await axiosInstance.get(`/notifications`, {
    params: request,
  });
  return data;
};

export const readNotificationsRequest =
  async (): Promise<TReadNotificationsResponse> => {
    const { data } = await axiosInstance.post(`/notifications/readers`);
    return data;
  };
