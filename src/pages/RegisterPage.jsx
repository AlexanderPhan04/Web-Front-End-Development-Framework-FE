import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      toast.success("Register successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-slate-900"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;