import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { postApi } from "../api/postApi";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(
    async (targetPage) => {
      setLoading(true);

      try {
        const res = await postApi.getPosts({
          search: searchQuery || undefined,
          category: category || undefined,
          page: targetPage,
          limit: 6,
        });

        setPosts(res.data.posts || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    },
    [category, searchQuery]
  );

  useEffect(() => {
    fetchPosts(page);
  }, [fetchPosts, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <div>
      <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-300">
          Blog Management
        </p>

        <h1 className="mb-3 text-4xl font-black tracking-tight md:text-5xl">
          Blog Posts
        </h1>

        <p className="max-w-2xl text-slate-300">
          Read, search, create and manage posts from the blog system.
        </p>
      </section>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <form onSubmit={handleSearchSubmit} className="flex flex-1 gap-2">
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              placeholder="Search posts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <button className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700">
              Search
            </button>
          </form>

          <select
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">All categories</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
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
