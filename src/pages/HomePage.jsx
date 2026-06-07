import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { postApi } from "../api/postApi";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const res = await postApi.getPosts({
        search: search || undefined,
        category: category || undefined,
        page,
        limit: 6,
      });

      setPosts(res.data.posts || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  return (
    <div>
      <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">Blog Posts</h1>
        <p className="text-slate-600">
          Read, search and manage posts from the blog system.
        </p>
      </section>

      <section className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row">
        <form onSubmit={handleSearchSubmit} className="flex flex-1 gap-2">
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">
            Search
          </button>
        </form>

        <select
          className="rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
        >
          <option value="">All categories</option>
          <option value="Technology">Technology</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
      </section>

      {loading ? (
        <LoadingSpinner />
      ) : posts.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow-sm">
          No posts found.
        </div>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export default HomePage;