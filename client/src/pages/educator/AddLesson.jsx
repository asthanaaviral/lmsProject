import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Video,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import lessonService from "../../services/lesson.service";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AddLesson = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    order: "",
    duration: "",
  });

  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideo(file);
    setVideoName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!video) {
      setError("Please upload a lesson video");
      return;
    }

    try {
      setUploading(true);

      /* Upload video */
      const formData = new FormData();
      formData.append("video", video);

      const { videoUrl } =
        await lessonService.uploadLessonVideo(formData);

      setUploading(false);
      setSaving(true);

      /* Save lesson */
      await lessonService.addLesson(courseId, {
        title: form.title,
        videoUrl,
        order: Number(form.order),
        duration: form.duration
          ? Number(form.duration)
          : 0,
      });

      navigate(`/educator/courses/${courseId}`);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to add lesson"
      );
      setUploading(false);
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* ================= BACK ================= */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm
          text-slate-600 dark:text-slate-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to course
      </button>

      {/* ================= HEADER ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-2">
          Add New Lesson
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Upload a video and define lesson details for your course.
        </p>
      </motion.div>

      {/* ================= FORM ================= */}
      <motion.form
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Lesson Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Lesson Title
          </label>
          <input
            type="text"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Introduction to React"
            className="w-full px-4 py-3 rounded-xl
              bg-white dark:bg-slate-950
              border border-slate-300 dark:border-slate-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Order & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Lesson Order
            </label>
            <input
              type="number"
              name="order"
              required
              value={form.order}
              onChange={handleChange}
              placeholder="1"
              min="1"
              className="w-full px-4 py-3 rounded-xl
                bg-white dark:bg-slate-950
                border border-slate-300 dark:border-slate-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (seconds)
            </label>
            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="Optional"
              min="0"
              className="w-full px-4 py-3 rounded-xl
                bg-white dark:bg-slate-950
                border border-slate-300 dark:border-slate-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Video Upload */}
        <div
          className="p-6 rounded-2xl
            bg-white dark:bg-slate-900
            border border-dashed border-slate-300 dark:border-slate-700
            text-center space-y-4"
        >
          <Video className="w-10 h-10 mx-auto text-slate-400" />

          <p className="text-sm text-slate-600 dark:text-slate-400">
            Upload lesson video
          </p>

          {videoName && (
            <p className="text-sm font-medium text-indigo-600">
              {videoName}
            </p>
          )}

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
            bg-indigo-600 text-white text-sm font-medium
            hover:bg-indigo-700 cursor-pointer transition">
            <Upload className="w-4 h-4" />
            Choose Video
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={handleVideoChange}
            />
          </label>
        </div>

        {/* Error */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading || saving}
          className="w-full inline-flex items-center justify-center gap-2
            px-6 py-3 rounded-xl
            bg-indigo-600 text-white font-medium
            hover:bg-indigo-700 disabled:opacity-60 transition shadow-lg"
        >
          {(uploading || saving) ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {uploading
                ? "Uploading video..."
                : "Saving lesson..."}
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Add Lesson
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default AddLesson;
