import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TUserInfo {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

interface TAuthReducer {
  isLogin: boolean;
  userInfo: TUserInfo | null;
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
    setUserInfo(state, action: PayloadAction<TUserInfo | null>) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
});

export const { setIsLogin, setUserInfo } = systemSlice.actions;

export default systemSlice.reducer;
