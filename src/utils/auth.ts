import { LOCAL_STORAGE } from "./constant";

export const getToken = () => {
  return localStorage.getItem(LOCAL_STORAGE.accessToken);
};
