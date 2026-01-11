import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import courseService from "../../services/course.service";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CreateCourse = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!thumbnail) {
      setError("Please upload a course thumbnail");
      return;
    }

    try {
      setUploading(true);

      /* Upload thumbnail */
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);

      const { thumbnail: uploadedThumbnail } =
        await courseService.uploadThumbnail(formData);

      setUploading(false);
      setCreating(true);

      /* Create course */
      await courseService.createCourse({
        title: form.title,
        description: form.description,
        thumbnail: uploadedThumbnail,
      });

      navigate("/educator/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create course"
      );
      setUploading(false);
      setCreating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ================= BACK ================= */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm
          text-slate-600 dark:text-slate-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
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
          Create a New Course
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          Set up your course details. You can add lessons and publish it
          once everything is ready.
        </p>
      </motion.div>

      {/* ================= FORM ================= */}
      <motion.form
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Mastering React from Scratch"
              className="w-full px-4 py-3 rounded-xl
                bg-white dark:bg-slate-950
                border border-slate-300 dark:border-slate-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Description
            </label>
            <textarea
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what students will learn in this course..."
              className="w-full px-4 py-3 rounded-xl resize-none
                bg-white dark:bg-slate-950
                border border-slate-300 dark:border-slate-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">

          {/* Thumbnail Upload */}
          <div
            className="p-6 rounded-2xl
              bg-white dark:bg-slate-900
              border border-dashed border-slate-300 dark:border-slate-700
              text-center space-y-4"
          >
            {!thumbnailPreview ? (
              <>
                <ImageIcon className="w-10 h-10 mx-auto text-slate-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Upload a course thumbnail
                </p>

                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                  bg-indigo-600 text-white text-sm font-medium
                  hover:bg-indigo-700 cursor-pointer transition">
                  <Upload className="w-4 h-4" />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleThumbnailChange}
                  />
                </label>
              </>
            ) : (
              <div className="space-y-3">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    setThumbnail(null);
                    setThumbnailPreview(null);
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading || creating}
            className="w-full inline-flex items-center justify-center gap-2
              px-6 py-3 rounded-xl
              bg-indigo-600 text-white font-medium
              hover:bg-indigo-700 disabled:opacity-60 transition shadow-lg"
          >
            {(uploading || creating) ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {uploading ? "Uploading thumbnail..." : "Creating course..."}
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Create Course
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default CreateCourse;
