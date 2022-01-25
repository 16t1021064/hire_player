import axiosInstance from "../axios";
import {
  TGetPlayerResponse,
  TGetPlayersRequest,
  TGetPlayersResponse,
  TRemoveImagesRequest,
  TRemoveImagesResponse,
  TUploadImagesRequest,
  TUploadImagesResponse,
} from "./types";

export const getPlayersRequest = async (
  request: TGetPlayersRequest
): Promise<TGetPlayersResponse> => {
  const { data } = await axiosInstance.get(`/players`, {
    params: request,
  });
  return data;
};

export const getPlayerRequest = async (
  playerId: string
): Promise<TGetPlayerResponse> => {
  const { data } = await axiosInstance.get(`/players/${playerId}`);
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
    `/players/${request.id}/upload-images`,
    formData,
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const removeImagesRequest = async (
  request: TRemoveImagesRequest
): Promise<TRemoveImagesResponse> => {
  const { data } = await axiosInstance.put(
    `/players/${request.id}/remove-images`,
    request
  );
  return data;
};
