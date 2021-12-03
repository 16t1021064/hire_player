import { combineReducers } from "@reduxjs/toolkit";
import systemReducer from "./system/slice";
import authReducer from "./auth/slice";

const createRootReducer = () => {
  return combineReducers({
    system: systemReducer,
    auth: authReducer,
  });
};

export default createRootReducer;
