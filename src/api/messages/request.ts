import axiosInstance from "../axios";
import { TGetMessagesRequest, TGetMessagesResponse } from "./types";

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
