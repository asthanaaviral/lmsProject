import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  BookOpen,
  CheckCircle,
  Clock,
  Plus,
  PlayCircle,
  UploadCloud,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import courseService from "../../services/course.service";
import lessonService from "../../services/lesson.service";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ManageCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ FIX 1: Fetch educator courses (includes drafts)
        const courseData = await courseService.getEducatorCourseById(courseId);

        // ✅ FIX 2: Correct null check
        if (!courseData) {
          throw new Error("Course not found");
        }

        // Lessons are fetched separately (correct)
        const lessonData = await lessonService.getLessonsByCourse(courseId);

        // ✅ FIX 3: Correct state assignment
        setCourse(courseData);
        setLessons(lessonData);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load course"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const stats = useMemo(() => {
    if (!course) return null;

    return {
      students: course.enrolledStudents?.length || 0,
      lessons: lessons.length,
      status: course.isPublished ? "Published" : "Draft",
    };
  }, [course, lessons]);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await courseService.publishCourse(courseId);
      setCourse((prev) => ({ ...prev, isPublished: true }));
    } catch (err) {
      alert(err?.response?.data?.message || "Publish failed");
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse space-y-6">
        <div className="h-8 w-1/3 bg-slate-300 dark:bg-slate-700 rounded" />
        <div className="h-64 bg-slate-300 dark:bg-slate-700 rounded-2xl" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

      {/* ================= BACK ================= */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm
          text-slate-600 dark:text-slate-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </button>

      {/* ================= COURSE HEADER ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* Left */}
        <div className="lg:col-span-2 space-y-4">
          <img
            src={`http://localhost:5000${course.thumbnail}`}
            alt={course.title}
            className="w-full h-64 object-cover rounded-2xl"
          />

          <h1 className="text-3xl font-bold">
            {course.title}
          </h1>

          <p className="text-slate-600 dark:text-slate-400">
            {course.description}
          </p>
        </div>

        {/* Right */}
        <div
          className="p-6 rounded-2xl
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          space-y-4"
        >
          <StatusBadge published={course.isPublished} />

          {!course.isPublished && (
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="w-full inline-flex items-center justify-center gap-2
                px-6 py-3 rounded-xl
                bg-emerald-600 text-white font-medium
                hover:bg-emerald-700 disabled:opacity-60 transition"
            >
              <CheckCircle className="w-4 h-4" />
              {publishing ? "Publishing..." : "Publish Course"}
            </button>
          )}

          <button
            onClick={() =>
              navigate(`/educator/courses/${courseId}/add-lesson`)
            }
            className="w-full inline-flex items-center justify-center gap-2
              px-6 py-3 rounded-xl
              bg-indigo-600 text-white font-medium
              hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Lesson
          </button>
        </div>
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
          icon={Users}
          label="Enrolled Students"
          value={stats.students}
        />
        <StatCard
          icon={BookOpen}
          label="Total Lessons"
          value={stats.lessons}
        />
        <StatCard
          icon={Clock}
          label="Course Status"
          value={stats.status}
        />
      </motion.div>

      {/* ================= LESSONS ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold">
          Lessons
        </h2>

        {lessons.length === 0 ? (
          <div className="text-center py-16">
            <UploadCloud className="mx-auto w-10 h-10 text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              No lessons added yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson._id}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 rounded-xl
                  bg-white dark:bg-slate-900
                  border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <PlayCircle className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-medium">
                      {index + 1}. {lesson.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {lesson.duration
                        ? `${Math.floor(lesson.duration / 60)} min`
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

/* ================= SMALL COMPONENTS ================= */

const StatusBadge = ({ published }) => (
  <span
    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold
      ${
        published
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      }`}
  >
    {published ? "Published" : "Draft"}
  </span>
);

const StatCard = ({ icon: Icon, label, value }) => (
  <div
    className="p-6 rounded-2xl
    bg-white dark:bg-slate-900
    border border-slate-200 dark:border-slate-800
    shadow-sm hover:shadow-md transition"
  >
    <Icon className="w-7 h-7 mb-3 text-indigo-600" />
    <p className="text-3xl font-bold mb-1">{value}</p>
    <p className="text-slate-600 dark:text-slate-400 text-sm">
      {label}
    </p>
  </div>
);

export default ManageCourse;
