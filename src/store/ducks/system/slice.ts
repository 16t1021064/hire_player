import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE } from "utils/constant";

interface TSystemReducer {
  language: string;
}

const initialState: TSystemReducer = {
  language: localStorage.getItem(LOCAL_STORAGE.language) || "",
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
  },
});

export const { setLanguage } = systemSlice.actions;

export default systemSlice.reducer;
