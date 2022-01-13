import axiosInstance from "../axios";
import {
  TGetConversationRequest,
  TGetConversationResponse,
  TGetConversationsRequest,
  TGetConversationsResponse,
} from "./types";

export const getConversationsRequest = async (
  request: TGetConversationsRequest
): Promise<TGetConversationsResponse> => {
  const { data } = await axiosInstance.get(`/conversations`, {
    params: request,
  });
  return data;
};

export const getConversationRequest = async (
  request: TGetConversationRequest
): Promise<TGetConversationResponse> => {
  const { data } = await axiosInstance.get(`/conversations/${request.id}`);
  return data;
};
