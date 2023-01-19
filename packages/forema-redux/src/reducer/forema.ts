import { AnyAction, combineReducers, ThunkDispatch } from "@reduxjs/toolkit";
import { userReducer } from "../slices";

export const foremaReducer = combineReducers({
  user: userReducer,
});

export type ForemaStore = {
  forema: ReturnType<typeof foremaReducer>;
};

export type ForemaDispatch = ThunkDispatch<ForemaStore, any, AnyAction>;
