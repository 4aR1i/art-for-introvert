import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchPostsByUserId,
  createPost,
  updatePost,
  deletePost,
  fetchPostById,
} from "@/app/store/slices/post/postThunks";
import { IPost } from "@/shared/types";

export function usePost() {
  const dispatch = useAppDispatch();
  const { posts, postById, postsByUser, loadingPosts, success, error } = useAppSelector((state) => state.posts);

  function handleGetPostById(postId: number) {
    dispatch(fetchPostById(postId));
  }

  function handleGetPostsByUserId(userId: number) {
    if (userId && !postsByUser[userId]) {
      dispatch(fetchPostsByUserId(userId));
    }
  }

  function handleAddPost(post: IPost) {
    dispatch(createPost(post));
  }

  function handleUpdatePost(postId: number, post: IPost) {
    dispatch(updatePost({ postId, post }));
  }

  function handleDeletePost(postId: number) {
    dispatch(deletePost(postId));
  }

  return {
    posts,
    postById,
    postsByUser,
    loadingPosts,
    success,
    error,

    handleGetPostById,
    handleGetPostsByUserId,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
  };
}
