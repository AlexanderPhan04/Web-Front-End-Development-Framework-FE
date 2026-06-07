import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { postApi } from "../api/postApi";

function CreatePostPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Technology",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }

    setLoading(true);

    try {
      const res = await postApi.createPost(formData);

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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <select
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Content</label>
          <textarea
            className="min-h-40 w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content..."
          />
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