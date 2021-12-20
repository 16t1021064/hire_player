import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "types";

interface TAuthReducer {
  isLogin: boolean;
  userInfo: TUser | null;
}

const initialState: TAuthReducer = {
  isLogin: false,
  userInfo: null,
};

const systemSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLogin: action.payload,
      };
    },
    setUserInfo(state, action: PayloadAction<TUser | null>) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
});

export const { setIsLogin, setUserInfo } = systemSlice.actions;

export default systemSlice.reducer;
