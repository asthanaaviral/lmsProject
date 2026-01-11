import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(form);

      // Redirect based on role (future dashboards)
      if (user.role === "educator") {
        navigate("/educator");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* ================= LEFT SIDE ================= */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-col justify-center px-16
          bg-gradient-to-br from-indigo-600 to-violet-600
          text-white"
      >
        <h1 className="text-4xl font-bold mb-6">
          Welcome back to SkillForge
        </h1>

        <p className="text-lg text-indigo-100 mb-8 max-w-md">
          Continue building skills, creating courses, and learning with focus
          and clarity.
        </p>

        <ul className="space-y-4 text-indigo-100">
          <li>✔ Clean learning experience</li>
          <li>✔ Built for students & educators</li>
          <li>✔ Fast, modern & distraction-free</li>
        </ul>
      </motion.div>

      {/* ================= RIGHT SIDE (FORM) ================= */}
      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div
            className="rounded-2xl p-8
            bg-white/80 dark:bg-slate-900/80
            backdrop-blur border border-slate-200 dark:border-slate-800
            shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-2">
              Sign in to your account
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Enter your credentials to continue
            </p>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg
                      bg-white dark:bg-slate-950
                      border border-slate-300 dark:border-slate-700
                      focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg
                      bg-white dark:bg-slate-950
                      border border-slate-300 dark:border-slate-700
                      focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2
                  px-6 py-3 rounded-xl
                  bg-indigo-600 text-white font-medium
                  hover:bg-indigo-700 disabled:opacity-60
                  transition"
              >
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-sm text-center mt-6 text-slate-600 dark:text-slate-400">
              Don’t have an account?{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
