import { TMessage } from "types";

export interface TGetMessagesRequest {
  id: string; // conversation id
  senderId?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
  populate?: string;
}

export interface TGetMessagesResponse {
  data: {
    results: TMessage[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  message: "GET_CONVERSATIONS_SUCCESS";
}
