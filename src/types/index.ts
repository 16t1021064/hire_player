export interface TUser {
  id: string;
  money?: number;
  isOnline?: boolean;
  isPlayer?: boolean;
  status?: number;
  deletedBy?: string | null;
  roles?: number[];
  userName?: string;
  email?: string;
  emailVerifiedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  avatar?: TImage;
  playerInfo?: TPlayer;
}

export type TPlayerType = 1 | 2 | 3; // 1: Vip, 2: Hot, 3: New
export type TPlayerStatus = 1 | 2 | 3; // 1: Active, 2: Inactive
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
  status?: TPlayerStatus;
  typePlayer?: TPlayerType;
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

export type TReviewStatus = 1 | 2; // 1: Active, 2: Inactive
export interface TReview {
  id: string;
  starPoint?: number;
  deletedAt?: string | null;
  status?: TReviewStatus;
  content?: string;
  reviewer?: string | TUser;
  receiver?: string | TUser;
  createdAt?: string;
  updatedAt?: string;
}
