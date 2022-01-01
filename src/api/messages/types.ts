import { TBodyMessage, TConversation, TMessage, TUser } from "types";

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

export interface TCreateMessageRequest {
  id: string; // conversation id
  body: TBodyMessage;
  senderId: string;
}

export interface TCreateMessageResponse {
  data: {
    conversation: TConversation;
    body: TBodyMessage;
    sender: TUser;
    latestMessage: TMessage;
  };
  message: "CREATE_MESSAGE_SUCCESS";
}
