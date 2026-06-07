import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { postApi } from "../api/postApi";
import { commentApi } from "../api/commentApi";
import useAuthStore from "../store/authStore";
import LoadingSpinner from "../components/LoadingSpinner";

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const fetchPost = async () => {
    setLoading(true);

    try {
      const res = await postApi.getPostById(id);
      setPost(res.data.post);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load post");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await commentApi.getCommentsByPost(id);
      setComments(res.data.comments || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load comments");
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

const handleToggleLike = async () => {
  if (!user) {
    toast.error("Please login to like this post");
    navigate("/login");
    return;
  }

  try {
    const res = await postApi.toggleLike(id);

    toast.success(res.data.message || "Updated like");

    await fetchPost();
  } catch (error) {
    toast.error(error.response?.data?.message || "Like failed");
  }
};

  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to comment");
      navigate("/login");
      return;
    }

    if (!commentContent.trim()) {
      toast.error("Comment is required");
      return;
    }

    setCommentLoading(true);

    try {
      await commentApi.createComment(id, {
        content: commentContent,
      });

      setCommentContent("");
      toast.success("Comment created");
      fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Create comment failed");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("Delete this comment?");

    if (!confirmed) return;

    try {
      await commentApi.deleteComment(commentId);
      toast.success("Comment deleted");
      fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete comment failed");
    }
  };

  const handleDeletePost = async () => {
    const confirmed = window.confirm("Delete this post?");

    if (!confirmed) return;

    try {
      await postApi.deletePost(id);
      toast.success("Post deleted");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete post failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!post) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        Post not found.
      </div>
    );
  }

  const isOwner = user?._id === post.author?._id || user?.id === post.author?._id;
  const likeCount = post.likeCount || post.likes?.length || 0;

  return (
    <div className="mx-auto max-w-3xl">
      <article className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            {post.category}
          </span>

          <span className="text-sm text-slate-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

        <div className="mb-6 text-sm text-slate-500">
          By {post.author?.name || "Unknown"}
        </div>

        <p className="whitespace-pre-line text-slate-700">{post.content}</p>

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <button
            onClick={handleToggleLike}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            Like ({likeCount})
          </button>

          {isOwner && (
            <div className="flex gap-2">
              <Link
                to={`/edit-post/${post._id}`}
                className="rounded-lg border px-4 py-2"
              >
                Edit
              </Link>

              <button
                onClick={handleDeletePost}
                className="rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </article>

      <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Comments</h2>

        <form onSubmit={handleCreateComment} className="mb-6 space-y-3">
          <textarea
            className="min-h-24 w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            placeholder="Write a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />

          <button
            disabled={commentLoading}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:opacity-60"
          >
            {commentLoading ? "Posting..." : "Post comment"}
          </button>
        </form>

        {comments.length === 0 ? (
          <p className="text-slate-500">No comments yet.</p>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => {
              const canDeleteComment =
                user?._id === comment.author?._id ||
                user?.id === comment.author?._id ||
                isOwner;

              return (
                <div key={comment._id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">
                      {comment.author?.name || "Unknown"}
                    </span>

                    {canDeleteComment && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-sm text-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <p className="text-slate-700">{comment.content}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default PostDetailPage;