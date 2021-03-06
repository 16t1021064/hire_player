import axiosInstance from "api/axios";
import {
  TUpdateInfoRequest,
  TUpdateInfoResponse,
  TUploadAvatarRequest,
  TUploadAvatarResponse,
} from "./types";

export const uploadAvatarRequest = async (
  request: TUploadAvatarRequest
): Promise<TUploadAvatarResponse> => {
  const formData = new FormData();
  formData.append("avatar", request.avatar);
  const { data } = await axiosInstance.put(`/users/upload-avatar`, formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return data;
};

export const updateInfoRequest = async (
  request: TUpdateInfoRequest
): Promise<TUpdateInfoResponse> => {
  const { data } = await axiosInstance.put(`/users`, request);
  return data;
};
