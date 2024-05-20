import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/shared/types";
import { fetchUsers, createUser, updateUser, deleteUser } from "./userThunks";

interface IUserState {
  users: IUser[];
  loadingUsers: boolean;
  error: {
    message: string;
    text: string;
  } | null;
}

const initialState: IUserState = {
  users: [],
  loadingUsers: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loadingUsers = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.loadingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при загрузке пользователей",
        };
      })

      .addCase(createUser.pending, (state) => {
        state.loadingUsers = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loadingUsers = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loadingUsers = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при добавлении пользователя",
        };
      })

      .addCase(updateUser.pending, (state) => {
        state.loadingUsers = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loadingUsers = false;
        const user = action.payload;
        const index = state.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          state.users[index] = user;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loadingUsers = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при обновлении пользователя",
        };
      })

      .addCase(deleteUser.pending, (state) => {
        state.loadingUsers = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loadingUsers = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loadingUsers = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при удалении пользователя",
        };
      });
  },
});

export default userSlice.reducer;
