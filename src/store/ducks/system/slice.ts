import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE } from "utils/constant";

type TDarkMode = "on" | "off";

interface TSystemReducer {
  language: string;
  darkMode: TDarkMode;
}

const isDarkMode = (): TDarkMode => {
  const rs = localStorage.getItem(LOCAL_STORAGE.darkMode);
  if (rs && (rs === "on" || rs === "off")) {
    return rs;
  } else {
    return "off";
  }
};

const initialState: TSystemReducer = {
  language: localStorage.getItem(LOCAL_STORAGE.language) || "",
  darkMode: isDarkMode(),
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
    setDarkMode(state, action: PayloadAction<TDarkMode>) {
      localStorage.setItem(LOCAL_STORAGE.darkMode, action.payload);
      return {
        ...state,
        darkMode: action.payload,
      };
    },
  },
});

export const { setLanguage, setDarkMode } = systemSlice.actions;

export default systemSlice.reducer;
