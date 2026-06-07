import axiosClient from "./axiosClient";

export const postApi = {
  getPosts: (params) => axiosClient.get("/posts", { params }),
  getMyPosts: () => axiosClient.get("/posts/my-posts"),
  getPostById: (id) => axiosClient.get(`/posts/${id}`),
  createPost: (data) => axiosClient.post("/posts", data),
  updatePost: (id, data) => axiosClient.put(`/posts/${id}`, data),
  deletePost: (id) => axiosClient.delete(`/posts/${id}`),
  toggleLike: (id) => axiosClient.post(`/posts/${id}/like`),
};
