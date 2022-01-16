import { TNotification } from "types/notifications";

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

export interface TReadNotificationsResponse {
  message: "READERS_NOTIFICATIONS_SUCCESS";
}
