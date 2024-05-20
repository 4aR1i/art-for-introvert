import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
} from "@/app/store/slices/comment/commentThunks";
import { IComment } from "@/shared/types";

export function useComment() {
  const dispatch = useAppDispatch();
  const { comments, commentsByPost, loadingComments, error } = useAppSelector((state) => state.comments);

  function handleGetCommentsByPostId(postId: number) {
    if (postId && !commentsByPost[postId]) {
      dispatch(fetchCommentsByPostId(postId));
    }
  }

  function handleAddComment(comment: IComment) {
    dispatch(createComment(comment));
  }

  function handleUpdateComment(commentId: number, comment: IComment) {
    dispatch(updateComment({ commentId, comment }));
  }

  function handleDeleteComment(commentId: number) {
    dispatch(deleteComment(commentId));
  }

  return {
    comments,
    commentsByPost,
    loadingComments,
    error,

    handleGetCommentsByPostId,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
  };
}
