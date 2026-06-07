import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const initials = (user?.name || "U")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const navClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-blue-600"
      : "text-slate-700 hover:text-blue-600";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link to="/" className="text-xl font-bold">
          Blog App
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-3 text-sm">
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

              <div className="flex items-center gap-2 rounded-full bg-slate-100 py-1 pl-1 pr-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-xs font-bold text-white">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <span className="max-w-28 truncate text-slate-600">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
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
