import axiosInstance from "../axios";
import { TGetConversationsRequest, TGetConversationsResponse } from "./types";

export const getConversationsRequest = async (
  request: TGetConversationsRequest
): Promise<TGetConversationsResponse> => {
  const { data } = await axiosInstance.get(`/conversations`, {
    params: request,
  });
  return data;
};
