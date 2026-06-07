import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {post.category}
        </span>

        <span className="text-xs text-slate-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      <h2 className="mb-2 text-xl font-bold">
        <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
          {post.title}
        </Link>
      </h2>

      <p className="mb-4 line-clamp-3 text-slate-600">{post.content}</p>

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>By {post.author?.name || "Unknown"}</span>
        <span>{post.likeCount || post.likes?.length || 0} likes</span>
      </div>
    </article>
  );
}

export default PostCard;