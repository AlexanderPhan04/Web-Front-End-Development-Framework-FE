import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { postApi } from "../api/postApi";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuthStore from "../store/authStore";

function ProfilePage() {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const userId = user?._id || user?.id;
  const initials = (user?.name || "U")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const fetchMyPosts = useCallback(async () => {
    setLoading(true);

    try {
      const res = await postApi.getMyPosts();
      setPosts(res.data.posts || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load your posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm("Delete this post?");

    if (!confirmed) return;

    setDeletingId(postId);

    try {
      await postApi.deletePost(postId);
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId)
      );
      toast.success("Post deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete post failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-xl font-bold text-white">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="mt-1 text-slate-500">{user?.email || "Unknown"}</p>
            </div>
          </div>

          <Link
            to="/create-post"
            className="rounded-lg bg-slate-900 px-4 py-2 text-center font-medium text-white transition hover:bg-slate-700"
          >
            Create new post
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="font-medium">{user?.name || "Unknown"}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">User ID</p>
            <p className="break-all font-mono text-sm">{userId}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Posts</p>
            <p className="font-medium">{posts.length}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">My Posts</h2>
            <p className="text-sm text-slate-500">
              Manage the posts created by your account.
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : posts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
            You have not created any posts yet.
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <article
                key={post._id}
                className="flex flex-col gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <Link
                    to={`/posts/${post._id}`}
                    className="text-lg font-bold hover:text-blue-600"
                  >
                    {post.title}
                  </Link>

                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {post.content}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="rounded-lg border px-4 py-2 text-sm font-medium"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDeletePost(post._id)}
                    disabled={deletingId === post._id}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                  >
                    {deletingId === post._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
