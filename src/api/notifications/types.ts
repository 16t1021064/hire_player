import { THire, TNotification } from "types";

export interface TGetNotificationsRequest {
  latestId?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
  populate?: string;
}

export interface TGetNotificationsResponse {
  data: {
    results: TNotification[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  message: "GET_NOTIFICATIONS_SUCCESS";
}

export interface TPlayerAcceptHireRequest {
  id: string; // hire id
}

export interface TPlayerAcceptHireResponse {
  data: THire;
  message: "ACCEPT_HIRE_SUCCESS";
}

export interface TPlayerCancelHireRequest {
  id: string; // hire id
  cancelReason: string;
}

export interface TPlayerCancelHireResponse {
  data: THire;
  message: "CANCEL_HIRE_SUCCESS";
}
