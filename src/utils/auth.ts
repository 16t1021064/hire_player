import { LOCAL_STORAGE } from "./constant";

export const getAccessToken = () => {
  return localStorage.getItem(LOCAL_STORAGE.accessToken);
};

export const getRefreshToken = () => {
  return localStorage.getItem(LOCAL_STORAGE.refreshToken);
};
