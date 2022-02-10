import { TGenders, TPaymentSetting, TUser } from "types";

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

export interface TGetPaymentSettingResponse {
  data: TPaymentSetting;
  message: "GET_DETAIL_PAYMENT_SETTING_SUCCESS";
}
