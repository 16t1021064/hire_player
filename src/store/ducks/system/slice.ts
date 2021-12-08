import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE } from "utils/constant";

type TTheme = "LIGHT" | "DARK";

interface TSystemReducer {
  language: string;
  theme: TTheme;
}

const getLocalTheme = (): TTheme => {
  const rs = localStorage.getItem(LOCAL_STORAGE.theme);
  if (rs && (rs === "LIGHT" || rs === "DARK")) {
    return rs;
  } else {
    return "LIGHT";
  }
};

const initialState: TSystemReducer = {
  language: localStorage.getItem(LOCAL_STORAGE.language) || "",
  theme: getLocalTheme(),
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      return {
        ...state,
        language: action.payload,
      };
    },
    setTheme(state, action: PayloadAction<TTheme>) {
      localStorage.setItem(LOCAL_STORAGE.theme, action.payload);
      return {
        ...state,
        theme: action.payload,
      };
    },
  },
});

export const { setLanguage, setTheme } = systemSlice.actions;

export default systemSlice.reducer;
