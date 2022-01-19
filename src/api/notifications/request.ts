import axiosInstance from "../axios";
import {
  TGetNotificationsRequest,
  TGetNotificationsResponse,
  TGetTotalUnreadResponse,
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

export const getTotalUnreadRequest =
  async (): Promise<TGetTotalUnreadResponse> => {
    const { data } = await axiosInstance.get(`/notifications/count-unread`);
    return data;
  };
