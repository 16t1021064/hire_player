import { TImage, TUser } from "types";

export enum NotificationActionsEnum {
  HIRE_USER_CREATED = 1,
  HIRE_PLAYER_ACCEPTED = 2,
  HIRE_PLAYER_DENIED = 3,
  HIRE_USER_CANCELED = 4,
  HIRE_USER_FINISHED = 5,
  HIRE_USER_COMPLAIN = 6,
  HIRE_PLAYER_COMPLETED = 7,
  REVIEW_USER_RATED = 8,
  CHAT_ADMIN_JOINED = 9,
}

export type TNotificationActions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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

export interface TReviewUserRatedPayload {
  hireId?: string;
  conversationId?: string;
  starPoint?: number;
  reviewId?: string;
}

export interface TChatAdminJoinedPayload {
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
  | TReviewUserRatedPayload
  | TChatAdminJoinedPayload;

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
