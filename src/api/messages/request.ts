import axiosInstance from "../axios";
import {
  TCreateMessageRequest,
  TCreateMessageResponse,
  TGetMessagesRequest,
  TGetMessagesResponse,
  TReadMessagesRequest,
  TReadMessagesResponse,
  TUploadImagesRequest,
  TUploadImagesResponse,
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

export const uploadImagesRequest = async (
  request: TUploadImagesRequest
): Promise<TUploadImagesResponse> => {
  const formData = new FormData();
  request.images.forEach((image: File) => {
    formData.append("images", image);
  });
  const { data } = await axiosInstance.put(
    `/service-upload/upload-images-chat`,
    formData,
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }
  );
  return data;
};
