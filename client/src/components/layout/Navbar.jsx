import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 py-2 inset-x-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Skill<span className="text-indigo-600 dark:text-indigo-400">Forge</span>
            </span>
            <span className="text-[10px] mt-0.5 font-medium tracking-widest uppercase text-slate-500 dark:text-slate-400">
              Learning Platform
            </span>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-900
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition transform hover:-translate-y-0.5"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* ================= AUTH STATE ================= */}
          {!isAuthenticated ? (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium
                  text-slate-700 dark:text-slate-300
                  hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg text-sm font-medium
                  bg-indigo-600 text-white hover:bg-indigo-700
                  dark:bg-indigo-500 dark:hover:bg-indigo-600
                  transition shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {/* Dashboard */}
              <Link
                to={user.role === "educator" ? "/educator" : "/student"}
                className="px-4 py-2 rounded-lg text-sm font-medium
                  text-slate-700 dark:text-slate-300
                  hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Dashboard
              </Link>

              {/* User Name */}
              <span className="hidden sm:inline text-sm font-medium text-slate-600 dark:text-slate-300">
                {user.name}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700
                  hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-red-500" />
              </button>
            </>
          )}

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
