import axiosInstance from "../axios";
import {
  TAdminJoinRequest,
  TAdminJoinResponse,
  TAdminLeaveRequest,
  TAdminLeaveResponse,
  TCheckExistRequest,
  TCheckExistResponse,
  TCreateConversationRequest,
  TCreateConversationResponse,
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

export const adminJoinRequest = async (
  request: TAdminJoinRequest
): Promise<TAdminJoinResponse> => {
  const { data } = await axiosInstance.post(`/admin/join-chat`, request);
  return data;
};

export const adminLeaveRequest = async (
  request: TAdminLeaveRequest
): Promise<TAdminLeaveResponse> => {
  const { data } = await axiosInstance.post(`/admin/leave-chat`, request);
  return data;
};

export const checkExistRequest = async (
  request: TCheckExistRequest
): Promise<TCheckExistResponse> => {
  const { data } = await axiosInstance.post(
    `/conversations/check-exist`,
    request
  );
  return data;
};

export const createConversationRequest = async (
  request: TCreateConversationRequest
): Promise<TCreateConversationResponse> => {
  const { data } = await axiosInstance.post(`/conversations`, request);
  return data;
};
