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
