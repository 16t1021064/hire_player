import { TImage, TUser } from "types";

export enum NotificationActionsEnum {
  CUSTOMER_REQUEST_HIRE = 1,
  PLAYER_ACCEPT_HIRE = 2,
  PLAYER_CANCEL_HIRE = 3,
  CUSTOMER_CANCEL_HIRE = 4,
  CUSTOMER_FINISH_SOON = 5,
  CUSTOMER_REQUEST_COMPLAIN = 6,
  HIRE_COMPLETE = 7,
  USER_REVIEW_HIRE = 8,
  ADMIN_JOIN_CHAT = 9,
}

export type TNotificationActions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface TCustomerRequestHirePayload {
  hireId?: string;
  conversationId?: string;
  timeRent?: number;
  customerNote?: string;
}

export interface TPlayerAcceptHirePayload {
  hireId?: string;
  conversationId?: string;
}

export interface TPlayerCancelHirePayload {
  hireId?: string;
  conversationId?: string;
}

export interface TCustomerCancelHirePayload {
  hireId?: string;
  conversationId?: string;
}

export interface TCustomerFinishSoonPayload {
  hireId?: string;
  conversationId?: string;
}

export interface TCustomerRequestComplainPayload {
  hireId?: string;
  conversationId?: string;
}

export interface THireCompletePayload {
  hireId?: string;
  conversationId?: string;
}

export interface TUserReviewHirePayload {
  hireId?: string;
  conversationId?: string;
  starPoint?: number;
  reviewId?: string;
}

export interface TAdminJoinChatPayload {
  hireId?: string;
  conversationId?: string;
}

export type TNotificationPayload =
  | TCustomerRequestHirePayload
  | TPlayerAcceptHirePayload
  | TPlayerCancelHirePayload
  | TCustomerCancelHirePayload
  | TCustomerFinishSoonPayload
  | TCustomerRequestComplainPayload
  | THireCompletePayload
  | TUserReviewHirePayload
  | TAdminJoinChatPayload;

export interface TNotification {
  id: string;
  payload?: TNotificationPayload;
  isRead?: boolean;
  customer?: {
    id: string;
    userName?: string;
    avatar?: TImage;
  };
  player?: {
    id: string;
    playerInfo?: {
      playerName?: string;
      rank?: string;
      playerAvatar?: TImage;
    };
  };
  receiver?: string | TUser;
  action: TNotificationActions;
  href?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: TImage;
}
