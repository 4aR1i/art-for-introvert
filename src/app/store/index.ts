import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import postReducer from "./slices/post/postSlice";
import commentReducer from "./slices/comment/commentSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
