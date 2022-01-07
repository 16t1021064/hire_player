import { TNotification } from "types";

export interface TGetNotificationsRequest {
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
