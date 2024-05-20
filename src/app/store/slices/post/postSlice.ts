import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "@/shared/types";
import { fetchPosts, fetchPostById, fetchPostsByUserId, createPost, updatePost, deletePost } from "./postThunks";

interface IPostState {
  posts: IPost[];
  postsByUser: Record<number, IPost[]>;
  postById: IPost | null;
  loadingPosts: boolean;
  success: string | null;
  error: {
    message: string;
    text: string;
  } | null;
}

const initialState: IPostState = {
  posts: [],
  postsByUser: {},
  postById: null,
  loadingPosts: false,
  success: null,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPostState(state) {
      state.postById = null;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loadingPosts = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.loadingPosts = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loadingPosts = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при загрузке постов",
        };
      })

      .addCase(fetchPostById.pending, (state) => {
        state.loadingPosts = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.loadingPosts = false;
        state.postById = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loadingPosts = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при загрузке поста",
        };
      })

      .addCase(fetchPostsByUserId.pending, (state) => {
        state.loadingPosts = true;
        state.error = null;
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.loadingPosts = false;
        state.postsByUser = { ...state.postsByUser, [action.payload[0].userId]: action.payload };
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.loadingPosts = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при загрузке постов",
        };
      })

      .addCase(createPost.pending, (state) => {
        state.loadingPosts = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.loadingPosts = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loadingPosts = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при добавлении поста",
        };
      })

      .addCase(updatePost.pending, (state) => {
        state.error = null;
        state.success = null;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.success = "Пост обновлен";
        const post = action.payload;
        const index = state.posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
          state.posts[index] = post;
          state.postById = post;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = {
          message: action.payload as string,
          text: "Ошибка при обновлении поста",
        };
      })

      .addCase(deletePost.pending, (state) => {
        state.loadingPosts = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.loadingPosts = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loadingPosts = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при удалении поста",
        };
      });
  },
});

export const { clearPostState } = postSlice.actions;
export default postSlice.reducer;
