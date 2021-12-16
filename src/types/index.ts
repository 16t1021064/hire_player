export interface TUserInfo {
  id: string;
  email: string;
  emailVerifiedAt: string;
  firstName: string;
  lastName: string;
  roles: string[];
  deletedBy: number | null;
  status: number;
  isOnline: boolean;
}

export type TPlayerType = 1 | 2 | 3; //1: Vip, 2: Hot, 3: New

export interface TPlayer {
  costPerHour: number;
  totalTimeHired: number;
  completionRate: number;
  timeReceiveHire: any[];
  isReceiveHire: boolean;
  timeMaxHire: number;
  images: TImage[];
  statusHire: number;
  isOnline: boolean;
  playerVerified: boolean;
  deletedAt: null | string;
  status: number;
  typePlayer: number;
  gameName: string;
  rank: string;
  description: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  playerName: string;
  id: string;
  avgRating: number;
}

export interface TImage {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  filename: string;
  size: number;
  link: string;
}
