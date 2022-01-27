import { TBodyMessage, TConversation, TImage, TMessage, TUser } from "types";

export interface TGetMessagesRequest {
  id: string; // conversation id
  senderId?: string;
  latestMessageId?: string;
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

export interface TReadMessagesRequest {
  id: string; // conversation id
}

export interface TReadMessagesResponse {
  message: "READER_MESSAGES_SUCCESS";
}

export interface TUploadImagesRequest {
  id: string;
  images: File[];
}

export interface TUploadImagesResponse {
  data: {
    files: TImage[];
  };
  message: "UPLOAD_IMAGES_CHAT_SUCCESS";
}
