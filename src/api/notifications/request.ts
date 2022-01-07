import axiosInstance from "../axios";
import { TGetNotificationsRequest, TGetNotificationsResponse } from "./types";

export const getNotificationsRequest = async (
  request: TGetNotificationsRequest
): Promise<TGetNotificationsResponse> => {
  const { data } = await axiosInstance.get(`/notifications`, {
    params: request,
  });
  return data;
};
