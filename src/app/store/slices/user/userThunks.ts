import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, ServiceCreator } from "@/shared/utils";
import { IUser } from "@/shared/types";

const serviceCreator = new ServiceCreator();
const userService = serviceCreator.userServiceFactory();

export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    return await userService.getAll();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createUser = createAsyncThunk("user/createUser", async (user: IUser, { rejectWithValue }) => {
  try {
    return await userService.create(user);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, user }: { userId: number; user: IUser }, { rejectWithValue }) => {
    try {
      return await userService.update(userId, user);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId: number, { rejectWithValue }) => {
  try {
    await userService.delete(userId);
    return userId;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
