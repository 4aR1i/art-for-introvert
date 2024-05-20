import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, ServiceCreator } from "@/shared/utils";
import { IComment } from "@/shared/types";

const serviceCreator = new ServiceCreator();
const commentService = serviceCreator.commentServiceFactory();

export const fetchComments = createAsyncThunk("comment/fetchComments", async (_, { rejectWithValue }) => {
  try {
    return await commentService.getAll();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchCommentsByPostId = createAsyncThunk(
  "post/fetchCommentsByPostId",
  async (postId: number, { rejectWithValue }) => {
    try {
      return await commentService.getByPostId(postId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (comment: IComment, { rejectWithValue }) => {
    try {
      return await commentService.create(comment);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ commentId, comment }: { commentId: number; comment: IComment }, { rejectWithValue }) => {
    try {
      return await commentService.update(commentId, comment);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId: number, { rejectWithValue }) => {
    try {
      await commentService.delete(commentId);
      return commentId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
