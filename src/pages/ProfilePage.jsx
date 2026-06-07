import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProfilePage() {
  const { user, token } = useAuthStore();

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">Name</p>
          <p className="font-medium">{user?.name || "Unknown"}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Email</p>
          <p className="font-medium">{user?.email || "Unknown"}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">User ID</p>
          <p className="break-all font-mono text-sm">{user?._id || user?.id}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">JWT Token</p>
          <p className="break-all rounded-lg bg-slate-100 p-3 font-mono text-xs">
            {token}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/create-post"
          className="rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Create new post
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;