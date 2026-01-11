import api from "./api";

/* ======================================================
   COURSE SERVICE
   Handles all course-related API interactions
   ====================================================== */

/**
 * Upload course thumbnail (Educator)
 * @param {FormData} formData - must contain `thumbnail`
 */
const uploadThumbnail = async (formData) => {
  const res = await api.post("/courses/upload-thumbnail", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data; // { thumbnail }
};

/**
 * Create a new course (Educator)
 * @param {Object} data - { title, description, thumbnail }
 */
const createCourse = async (data) => {
  const res = await api.post("/courses", data);
  return res.data.data; // course object
};

/**
 * Get courses created by logged-in educator
 */
const getEducatorCourses = async () => {
  const res = await api.get("/courses/educator");
  return res.data.data; // array of courses
};

/**
 * Publish a course (Educator)
 * @param {string} courseId
 */
const publishCourse = async (courseId) => {
  const res = await api.patch(`/courses/${courseId}/publish`);
  return res.data;
};

/**
 * Get all published courses (Student)
 */
const getPublishedCourses = async () => {
  const res = await api.get("/courses");
  return res.data.data; // array of courses
};

/**
 * Enroll student in a course
 * @param {string} courseId
 */
const enrollInCourse = async (courseId) => {
  const res = await api.post(`/courses/${courseId}/enroll`);
  return res.data;
};

/**
 * Get single course with lessons
 * (Used by students for course detail page)
 * @param {string} courseId
 */
const getCourseWithLessons = async (courseId) => {
  const res = await api.get(`/courses/${courseId}`);
  return res.data.data; // { course, lessons }
};

const getEducatorCourseById = async (courseId) => {
  const res = await api.get("/courses/educator");
  return res.data.data.find(course => course._id === courseId);
};

const courseService = {
  uploadThumbnail,
  createCourse,
  getEducatorCourses,
  publishCourse,
  getPublishedCourses,
  enrollInCourse,
  getCourseWithLessons,
  getEducatorCourseById
};

export default courseService;
