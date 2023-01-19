import { configureStore } from "@reduxjs/toolkit";
import { foremaReducer } from "forema-redux";

export const store = configureStore({
  reducer: {
    forema: foremaReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
