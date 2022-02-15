import { TGenders, TUser } from "types";

export interface TUploadAvatarRequest {
  id: string;
  avatar: File;
}

export interface TUploadAvatarResponse {
  data: TUser;
  message: "UPLOAD_AVATAR_SUCCESS";
}

export interface TUpdateInfoRequest {
  fullName: string;
  gender: TGenders;
}

export interface TUpdateInfoResponse {
  data: TUser;
  message: "UPDATE_USER_INFO_SUCCESS";
}
