import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  BookOpen,
  CheckCircle,
  Clock,
  Eye,
  UploadCloud,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import courseService from "../../services/course.service";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const EducatorDashboard = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getEducatorCourses();
        setCourses(data);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load courses"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  /* ================= DERIVED STATS ================= */
  const stats = useMemo(() => {
    const published = courses.filter((c) => c.isPublished).length;
    const drafts = courses.length - published;

    return {
      total: courses.length,
      published,
      drafts,
    };
  }, [courses]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

      {/* ================= HEADER ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Educator Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create, manage, and publish your courses
          </p>
        </div>

        <button
          onClick={() => navigate("/educator/create-course")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
            bg-indigo-600 text-white font-medium
            hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          Create Course
        </button>
      </motion.div>

      {/* ================= STATS ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={stats.total}
        />
        <StatCard
          icon={CheckCircle}
          label="Published"
          value={stats.published}
          color="text-emerald-600"
        />
        <StatCard
          icon={Clock}
          label="Drafts"
          value={stats.drafts}
          color="text-amber-600"
        />
      </motion.div>

      {/* ================= COURSE LIST ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold">
          Your Courses
        </h2>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-20">
            <UploadCloud className="mx-auto w-10 h-10 text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You haven’t created any courses yet
            </p>
            <button
              onClick={() => navigate("/educator/create-course")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                bg-indigo-600 text-white font-medium
                hover:bg-indigo-700 transition"
            >
              <Plus className="w-4 h-4" />
              Create your first course
            </button>
          </div>
        )}

        {/* Courses */}
        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course._id}
                whileHover={{ y: -6 }}
                className="rounded-2xl overflow-hidden
                  bg-white dark:bg-slate-900
                  border border-slate-200 dark:border-slate-800
                  shadow-sm hover:shadow-lg transition"
              >
                {/* Thumbnail */}
                <div className="h-40 overflow-hidden">
                  <img
                    src={`${BASE_URL}${course.thumbnail}`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-2">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full
                        ${
                          course.isPublished
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>

                    <button
                      onClick={() =>
                        navigate(`/educator/courses/${course._id}`)
                      }
                      className="inline-flex items-center gap-1 text-sm font-medium
                        text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Manage
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

/* ================= SMALL COMPONENT ================= */

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div
    className="p-6 rounded-2xl
    bg-white dark:bg-slate-900
    border border-slate-200 dark:border-slate-800
    shadow-sm hover:shadow-md transition"
  >
    <Icon className={`w-7 h-7 mb-3 ${color || "text-indigo-600"}`} />
    <p className="text-3xl font-bold mb-1">{value}</p>
    <p className="text-slate-600 dark:text-slate-400 text-sm">
      {label}
    </p>
  </div>
);

export default EducatorDashboard;
