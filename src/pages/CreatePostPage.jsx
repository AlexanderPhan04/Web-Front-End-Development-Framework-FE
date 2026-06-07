import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { postApi } from "../api/postApi";
import { categoryOptions, postSchema } from "../schemas/post.schema";

function CreatePostPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "Technology",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await postApi.createPost(data);
      toast.success("Post created successfully");

      const postId = res.data.post?._id;

      if (postId) {
        navigate(`/posts/${postId}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Create post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Create Post</h1>

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
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
