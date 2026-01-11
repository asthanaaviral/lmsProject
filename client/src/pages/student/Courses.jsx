import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import courseService from "../../services/course.service";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getPublishedCourses();
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

      {/* ================= HEADER ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Explore Courses
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Discover courses created by expert educators
        </p>
      </motion.div>

      {/* ================= CONTENT ================= */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="text-center py-24">
          <BookOpen className="mx-auto w-10 h-10 text-slate-400 mb-4" />
          <p className="text-slate-600 dark:text-slate-400">
            No courses available right now
          </p>
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
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
                  src={`http://localhost:5000${course.thumbnail}`}
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

                <div className="flex items-center justify-between pt-3">
                  <span className="text-xs font-medium text-slate-500">
                    By {course.educator?.name}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/student/courses/${course._id}`)
                    }
                    className="inline-flex items-center gap-1 text-sm font-medium
                      text-indigo-600 dark:text-indigo-400
                      hover:underline"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Courses;
