import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PlayCircle,
  User,
  CheckCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import courseService from "../../services/course.service";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseWithLessons(courseId);
        setCourse(data.course);
        setLessons(data.lessons);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load course"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await courseService.enrollInCourse(courseId);
    } catch (err) {
      alert(
        err?.response?.data?.message || "Enrollment failed"
      );
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse space-y-6">
        <div className="h-8 w-1/3 bg-slate-300 dark:bg-slate-700 rounded" />
        <div className="h-48 bg-slate-300 dark:bg-slate-700 rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

      {/* ================= BACK ================= */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm
          text-slate-600 dark:text-slate-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to courses
      </button>

      {/* ================= COURSE INFO ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <img
            src={`${BASE_URL}${course.thumbnail}`}
            alt={course.title}
            className="w-full h-64 object-cover rounded-2xl"
          />

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {course.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {course.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <User className="w-4 h-4" />
            Educator: {course.educator?.name}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div
            className="p-6 rounded-2xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800"
          >
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="w-full inline-flex items-center justify-center gap-2
                px-6 py-3 rounded-xl
                bg-indigo-600 text-white font-medium
                hover:bg-indigo-700 disabled:opacity-60 transition"
            >
              {enrolling ? "Enrolling..." : "Enroll in Course"}
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ================= LESSONS ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6">
          Course Content
        </h2>

        {lessons.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">
            No lessons added yet.
          </p>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson._id}
                whileHover={{ x: 4 }}
                onClick={() =>
                  navigate(
                    `/student/courses/${courseId}/lessons/${lesson._id}`
                  )
                }
                className="flex items-center justify-between p-4 rounded-xl
                  bg-white dark:bg-slate-900
                  border border-slate-200 dark:border-slate-800
                  cursor-pointer hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <PlayCircle className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-medium">
                      {index + 1}. {lesson.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {lesson.duration
                        ? `${Math.floor(
                            lesson.duration / 60
                          )} min`
                        : "Video lesson"}
                    </p>
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

export default CourseDetail;
