import { Link, NavLink } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Navbar() {
  const { user, logout } = useAuthStore();

  const navClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-blue-600"
      : "text-slate-700 hover:text-blue-600";

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold">
          Blog App
        </Link>

        <div className="flex items-center gap-4">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink to="/create-post" className={navClass}>
                Create
              </NavLink>

              <NavLink to="/profile" className={navClass}>
                Profile
              </NavLink>

              <span className="text-sm text-slate-500">{user.name}</span>

              <button
                onClick={logout}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={navClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;