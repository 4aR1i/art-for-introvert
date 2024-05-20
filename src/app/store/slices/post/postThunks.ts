import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, ServiceCreator } from "@/shared/utils";
import { IPost } from "@/shared/types";

const serviceCreator = new ServiceCreator();
const postService = serviceCreator.postServiceFactory();

export const fetchPosts = createAsyncThunk("post/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    return await postService.getAll();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchPostById = createAsyncThunk("post/fetchPostById", async (postId: number, { rejectWithValue }) => {
  try {
    return await postService.getById(postId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchPostsByUserId = createAsyncThunk(
  "post/fetchPostsByUserId",
  async (userId: number, { rejectWithValue }) => {
    try {
      return await postService.getByUserId(userId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createPost = createAsyncThunk("post/createPost", async (post: IPost, { rejectWithValue }) => {
  try {
    return await postService.create(post);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postId, post }: { postId: number; post: IPost }, { rejectWithValue }) => {
    try {
      return await postService.update(postId, post);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deletePost = createAsyncThunk("post/deletePost", async (postId: number, { rejectWithValue }) => {
  try {
    await postService.delete(postId);
    return postId;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
