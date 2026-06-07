import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold">
          Blog App
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/create-post">Create</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;