import { TConversation, TConversationStatus } from "types";

export interface TGetConversationsRequest {
  playerId?: string;
  customerId?: string;
  status?: TConversationStatus;
  ignoreIds?: string; // separates by comma
  searchText?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
  populate?: string;
}

export interface TGetConversationsResponse {
  data: {
    results: TConversation[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  message: "GET_CONVERSATIONS_SUCCESS";
}

export interface TGetConversationRequest {
  id?: string;
}

export interface TGetConversationResponse {
  data: TConversation;
  message: "GET_DETAIL_CONVERSATION_SUCCESS";
}
