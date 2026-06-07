import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { postApi } from "../api/postApi";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuthStore from "../store/authStore";
import { categoryOptions, postSchema } from "../schemas/post.schema";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "Technology",
    },
  });

  const fetchPost = useCallback(async () => {
    setFetching(true);

    try {
      const res = await postApi.getPostById(id);
      const post = res.data.post;
      const currentUserId = user?._id || user?.id;
      const postAuthorId = post.author?._id || post.author;

      if (!currentUserId || currentUserId !== postAuthorId) {
        toast.error("You can only edit your own posts");
        navigate(`/posts/${id}`);
        return;
      }

      reset({
        title: post.title || "",
        content: post.content || "",
        category: post.category || "Technology",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load post");
      navigate("/");
    } finally {
      setFetching(false);
    }
  }, [id, navigate, reset, user]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await postApi.updatePost(id, data);
      toast.success("Post updated successfully");
      navigate(`/posts/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update post failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Edit Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            type="text"
            placeholder="Enter post title"
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <select
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            {...register("category")}
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Content</label>
          <textarea
            className="min-h-40 w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            placeholder="Write your post content..."
            {...register("content")}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}

export default EditPostPage;
