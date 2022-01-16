export interface TPagination {
  page?: number;
  limit?: number;
  totalPages?: number;
  totalResults?: number;
}
export enum UserStatusesEnum {
  ACTIVE = 1,
  INACTIVE = 2,
  VERIFIED = 3,
}
export type TUserStatuses = 1 | 2 | 3;
export enum UserRolesEnum {
  ROOT = 1,
  ADMIN = 2,
  USER = 3,
}
export type TUserRoles = 1 | 2 | 3;
export enum GendersEnum {
  MALE = 1,
  FEMALE = 2,
}
export type TGenders = 1 | 2;
export interface TUser {
  id: string;
  money?: number;
  gender?: TGenders;
  isOnline?: boolean;
  isPlayer?: boolean;
  status?: TUserStatuses;
  deletedBy?: string | null;
  roles?: TUserRoles[];
  userName?: string;
  email?: string;
  emailVerifiedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  avatar?: TImage;
  playerInfo?: TPlayer;
}

export enum PlayerTypesEnum {
  VIP = 1,
  HOT = 2,
  NEW = 3,
}
export type TPlayerTypes = 1 | 2 | 3;
export enum PlayerStatusesEnum {
  ACTIVE = 1,
  INACTIVE = 2,
}
export type TPlayerStatuses = 1 | 2;
export interface TPlayer {
  costPerHour?: number;
  totalTimeHired?: number;
  completionRate?: number;
  avgRating?: number;
  timeReceiveHire?: any[];
  isReceiveHire?: boolean;
  timeMaxHire?: number;
  images?: TImage[];
  statusHire?: number;
  playerVerified?: boolean;
  deletedAt?: string | null;
  status?: TPlayerStatuses;
  typePlayer?: TPlayerTypes;
  isOnline?: boolean;
  gameName?: string;
  rank?: string;
  description?: string;
  playerName?: string;
  playerAvatar?: TImage;
}

export interface TImage {
  link: string;
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  filename?: string;
  size?: number;
}

export enum ReviewStatusesEnum {
  ACTIVE = 1,
  INACTIVE = 2,
}
export type TReviewStatuses = 1 | 2;
export interface TReview {
  id: string;
  starPoint?: number;
  status?: TReviewStatuses;
  content?: string;
  reviewer?: string | TUser;
  receiver?: string | TUser;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface TBodyMessage {
  attachments?: any[];
  content?: string;
}
export interface TMessage {
  id: string;
  conversation?: string | TConversation;
  sender?: string | TUser;
  body?: TBodyMessage;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  unreadStatus?: any;
}

export enum ConversationStatusesEnum {
  ACTIVE = 1,
  INACTIVE = 2,
}
export type TConversationStatuses = 1 | 2;
export interface TConversation {
  id: string;
  members?: string[] | TUser[];
  latestHire?: string | THire;
  latestMessage?: TMessage;
  customer?: string | TUser;
  player?: string | TUser;
  status?: TConversationStatuses;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface TConvertedConversation extends TConversation {
  target?: TUser;
}

export enum HireStepsEnum {
  WAITING = 1,
  PLAYER_ACCEPT = 2,
  PLAYER_CANCEL = 3,
  CUSTOMER_CANCEL = 4,
  COMPLETE = 5,
  COMPLAIN = 6,
}
export type THireSteps = 1 | 2 | 3 | 4 | 5 | 6;
export interface THire {
  id: string;
  acceptedAt?: string | null;
  deletedAt?: string | null;
  cancelReason?: string;
  canceledAt?: string | null;
  seenAt?: string | null;
  hireStep?: THireSteps;
  isCompleteSoon?: boolean;
  timeRent?: number;
  rate?: number;
  cost?: number;
  customerNote?: string;
  customer?: string | TUser;
  player?: string | TUser;
  conversation: string | TConversation;
  createdAt?: string;
  updatedAt?: string;
}

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
