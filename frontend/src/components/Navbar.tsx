import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          StoreRate
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-100"
            >
              Dashboard
            </Link>
          )}

          {user?.role === "normal" && (
            <Link
              to="/stores"
              className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-100"
            >
              Stores
            </Link>
          )}

          {user?.role === "store_owner" && (
            <Link
              to="/owner"
              className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-100"
            >
              Owner Panel
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                Register
              </Link>
              <button
                onClick={toggleDark}
                className="px-3 py-2 rounded-xl hover:bg-slate-100"
              >
                {dark ? "☀️" : "🌙"}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
