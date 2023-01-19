import { createAsyncThunk } from "@reduxjs/toolkit";
import { Nullable, User } from "shared";
import { ForemaClient } from "../client";

export const getUser = createAsyncThunk<Nullable<User>, string>(
  "user/get",
  async (userId) => {
    return await ForemaClient.getInstance().users.getUser(userId);
  }
);

export const createUser = createAsyncThunk<User, User>(
  "user/create",
  async (user) => {
    return await ForemaClient.getInstance().users.createUser(user);
  }
);

export const updateUser = createAsyncThunk<User, User>(
  "user/update",
  async (user) => {
    return await ForemaClient.getInstance().users.updateUser(user);
  }
);

export const deleteUser = createAsyncThunk<boolean, string>(
  "user/delete",
  async (userId) => {
    return await ForemaClient.getInstance().users.deleteUser(userId);
  }
);
