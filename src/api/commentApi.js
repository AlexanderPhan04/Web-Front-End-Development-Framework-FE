import axiosClient from "./axiosClient";

export const commentApi = {
  getCommentsByPost: (postId) => axiosClient.get(`/posts/${postId}/comments`),
  createComment: (postId, data) =>
    axiosClient.post(`/posts/${postId}/comments`, data),
  deleteComment: (commentId) => axiosClient.delete(`/comments/${commentId}`),
};