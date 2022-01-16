import { TConversation, THire, TReview, TUser } from "types";

export interface TNotificationPayload {
  conversation?: string | TConversation;
  hire?: string | THire;
  review?: string | TReview;
}
export enum NotificationActionsEnum {
  CUSTOMER_REQUEST_HIRE = 1,
  PLAYER_ACCEPT_HIRE = 2,
  PLAYER_CANCEL_HIRE = 3,
  CUSTOMER_CANCEL_HIRE = 4,
  CUSTOMER_FINISH_SOON = 5,
  CUSTOMER_REQUEST_COMPLAIN = 6,
  HIRE_COMPLETE = 7,
  USER_REVIEW_HIRE = 8,
}
export type TNotificationActions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export interface TNotification {
  id: string;
  payload?: TNotificationPayload;
  isRead?: boolean;
  customer?: string | TUser;
  player?: string | TUser;
  receiver?: string | TUser;
  action: TNotificationActions;
  href?: string;
  createdAt?: string;
  updatedAt?: string;
}
