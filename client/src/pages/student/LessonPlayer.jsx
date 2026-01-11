import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PlayCircle,
  ListVideo,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import lessonService from "../../services/lesson.service";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await lessonService.getLessonsByCourse(courseId);
        setLessons(data);

        const activeLesson = data.find(
          (lesson) => lesson._id === lessonId
        );

        if (!activeLesson) {
          setError("Lesson not found");
        } else {
          setCurrentLesson(activeLesson);
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load lesson"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId, lessonId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">
          Loading lesson...
        </p>
      </div>
    );
  }

  if (error || !currentLesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4 }}
      className="min-h-screen grid grid-cols-1 lg:grid-cols-4"
    >
      {/* ================= SIDEBAR ================= */}
      <aside className="lg:col-span-1 border-r border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-950 p-5 space-y-4">

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm
            text-slate-600 dark:text-slate-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to course
        </button>

        <div className="flex items-center gap-2 mt-6 text-sm font-semibold">
          <ListVideo className="w-4 h-4 text-indigo-600" />
          Lessons
        </div>

        <div className="space-y-2">
          {lessons.map((lesson, index) => {
            const isActive = lesson._id === lessonId;

            return (
              <button
                key={lesson._id}
                onClick={() =>
                  navigate(
                    `/student/courses/${courseId}/lessons/${lesson._id}`
                  )
                }
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  <span className="line-clamp-1">
                    {index + 1}. {lesson.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ================= VIDEO PLAYER ================= */}
      <main className="lg:col-span-3 bg-slate-50 dark:bg-slate-950 p-6 lg:p-10 space-y-6">

        <h1 className="text-2xl font-bold">
          {currentLesson.title}
        </h1>

        <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
          <video
            src={`http://localhost:5000${currentLesson.videoUrl}`}
            controls
            controlsList="nodownload"
            className="w-full h-[60vh] object-contain"
          />
        </div>

        {currentLesson.duration > 0 && (
          <p className="text-sm text-slate-500">
            Duration: {Math.floor(currentLesson.duration / 60)} min
          </p>
        )}
      </main>
    </motion.div>
  );
};

export default LessonPlayer;
