import { TPlayerStatuses, TPlayerTypes, TUser } from "types";

export interface TGetPlayersRequest {
  userId?: string;
  status?: TPlayerStatuses;
  typePlayer?: TPlayerTypes;
  sortBy?: string;
  limit?: number;
  page?: number;
  populate?: string;
}

export interface TGetPlayersResponse {
  data: {
    results: TUser[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  message: "GET_PLAYER_INFO_SUCCESS";
}

export interface TGetPlayerResponse {
  data: TUser | null;
  message: "GET_DETAIL_PLAYER_INFO_SUCCESS";
}

export interface TUploadImagesRequest {
  id: string;
  images: File[];
}

export interface TUploadImagesResponse {
  data: TUser;
  message: "UPLOAD_IMAGES_SUCCESS";
}

export interface TRemoveImagesRequest {
  id: string;
  images: {
    filename: string;
  }[];
}

export interface TRemoveImagesResponse {
  data: TUser;
  message: "REMOVE_IMAGES_SUCCESS";
}
