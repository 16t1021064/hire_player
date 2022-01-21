import { TImage, TUser } from "types";

export enum NotificationActionsEnum {
  HIRE_USER_CREATED = 1,
  HIRE_PLAYER_ACCEPTED = 2,
  HIRE_PLAYER_DENIED = 3,
  HIRE_USER_CANCELED = 4,
  HIRE_USER_FINISHED = 5,
  HIRE_USER_COMPLAIN = 6,
  HIRE_PLAYER_COMPLETED = 7,
  HIRE_ADMIN_REFUNDED = 12,
  REVIEW_USER_RATED = 8,
  CONVERSATION_ADMIN_JOINED = 9,
}

export type TNotificationActions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 12;

export interface THireUserCreatedPayload {
  hireId?: string;
  conversationId?: string;
  timeRent?: number;
  customerNote?: string;
}

export interface THirePlayerAcceptedPayload {
  hireId?: string;
  conversationId?: string;
}

export interface THirePlayerDeniedPayload {
  hireId?: string;
  conversationId?: string;
}

export interface THireUserCanceledPayload {
  hireId?: string;
  conversationId?: string;
}

export interface THireUserFinishedPayload {
  hireId?: string;
  conversationId?: string;
}

export interface THireUserComplainPayload {
  hireId?: string;
  conversationId?: string;
}

export interface THirePlayerCompletedPayload {
  hireId?: string;
  conversationId?: string;
}

export interface THireAdminRefundedPayload {
  hireId?: string;
  conversationId?: string;
  cost?: number;
}

export interface TReviewUserRatedPayload {
  hireId?: string;
  conversationId?: string;
  starPoint?: number;
  reviewId?: string;
}

export interface TConversationAdminJoinedPayload {
  hireId?: string;
  conversationId?: string;
}

export type TNotificationPayload =
  | THireUserCreatedPayload
  | THirePlayerAcceptedPayload
  | THirePlayerDeniedPayload
  | THireUserCanceledPayload
  | THireUserFinishedPayload
  | THireUserComplainPayload
  | THirePlayerCompletedPayload
  | THireAdminRefundedPayload
  | TReviewUserRatedPayload
  | TConversationAdminJoinedPayload;

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
