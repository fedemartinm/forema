import { User, Nullable } from "shared";
import {
  createSlice,
  isAnyOf,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../services/user-service";

type UserState = {
  data: Nullable<User>;
  error: Nullable<SerializedError>;
};

const INITIAL_STATE: UserState = {
  data: null,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<SerializedError>) => {
      state.error = action.payload;
    },
    reset: (state) => {
      state = INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.data = null;
      state.error = null;
    });
    builder.addMatcher(
      isAnyOf(getUser.fulfilled, createUser.fulfilled, updateUser.fulfilled),
      (state, action) => {
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getUser.rejected,
        createUser.rejected,
        updateUser.rejected,
        deleteUser.rejected
      ),
      (state, action) => {
        state.data = null;
        state.error = action.error;
      }
    );
  },
});

export const userActions = usersSlice.actions;
export const userReducer = usersSlice.reducer;
