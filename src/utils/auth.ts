import { LOCAL_STORAGE } from "./constant";
import { TUser, UserRolesEnum } from "types";

export const getAccessToken = () => {
  return localStorage.getItem(LOCAL_STORAGE.accessToken);
};

export const getRefreshToken = () => {
  return localStorage.getItem(LOCAL_STORAGE.refreshToken);
};

export const isAdmin = (user: TUser): boolean => {
  return user.roles !== undefined && user.roles.includes(UserRolesEnum.ADMIN);
};
