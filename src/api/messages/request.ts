import axiosInstance from "../axios";
import {
  TCreateMessageRequest,
  TCreateMessageResponse,
  TGetMessagesRequest,
  TGetMessagesResponse,
  TReadMessagesRequest,
  TReadMessagesResponse,
} from "./types";

export const getMessagesRequest = async (
  request: TGetMessagesRequest
): Promise<TGetMessagesResponse> => {
  const { data } = await axiosInstance.get(
    `/conversations/${request.id}/message`,
    {
      params: request,
    }
  );
  return data;
};

export const createMessageRequest = async (
  request: TCreateMessageRequest
): Promise<TCreateMessageResponse> => {
  const { data } = await axiosInstance.post(
    `/conversations/${request.id}/message`,
    request
  );
  return data;
};

export const readMessagesRequest = async (
  request: TReadMessagesRequest
): Promise<TReadMessagesResponse> => {
  const { data } = await axiosInstance.post(
    `/conversations/${request.id}/message/readers`
  );
  return data;
};
