import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "@/shared/types";
import { fetchComments, fetchCommentsByPostId, createComment, updateComment, deleteComment } from "./commentThunks";

interface ICommentState {
  comments: IComment[];
  commentsByPost: Record<number, IComment[]>;
  loadingComments: boolean;
  error: {
    message: string;
    text: string;
  } | null;
}

const initialState: ICommentState = {
  comments: [],
  commentsByPost: {},
  loadingComments: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loadingComments = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.loadingComments = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loadingComments = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при загрузке комментариев",
        };
      })

      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loadingComments = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.loadingComments = false;
        state.commentsByPost = { ...state.commentsByPost, [action.payload[0].postId]: action.payload };
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loadingComments = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при загрузке комментариев",
        };
      })

      .addCase(createComment.pending, (state) => {
        state.loadingComments = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.loadingComments = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loadingComments = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при добавлении комментария",
        };
      })

      .addCase(updateComment.pending, (state) => {
        state.loadingComments = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.loadingComments = false;
        const comment = action.payload;
        const index = state.comments.findIndex((c) => c.id === comment.id);
        if (index !== -1) {
          state.comments[index] = comment;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loadingComments = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при обновлении комментария",
        };
      })

      .addCase(deleteComment.pending, (state) => {
        state.loadingComments = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.loadingComments = false;
        state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loadingComments = false;
        state.error = {
          message: action.payload as string,
          text: "Ошибка при удалении комментария",
        };
      });
  },
});

export default commentSlice.reducer;
