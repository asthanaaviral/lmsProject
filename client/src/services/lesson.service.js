import api from "./api";

/* ======================================================
   LESSON SERVICE
   Handles all lesson & video related API interactions
   ====================================================== */

/**
 * Upload lesson video (Educator)
 * @param {FormData} formData - must contain `video`
 */
const uploadLessonVideo = async (formData) => {
  const res = await api.post("/lessons/upload-video", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data; // { videoUrl }
};

/**
 * Add a lesson to a course (Educator)
 * @param {string} courseId
 * @param {Object} data - { title, videoUrl, order, duration }
 */
const addLesson = async (courseId, data) => {
  const res = await api.post(`/lessons/${courseId}`, data);
  return res.data.data; // lesson object
};

/**
 * Get all lessons of a course
 * (Used by both student & educator)
 * @param {string} courseId
 */
const getLessonsByCourse = async (courseId) => {
  const res = await api.get(`/lessons/${courseId}`);
  return res.data.data; // array of lessons
};

const lessonService = {
  uploadLessonVideo,
  addLesson,
  getLessonsByCourse,
};

export default lessonService;
