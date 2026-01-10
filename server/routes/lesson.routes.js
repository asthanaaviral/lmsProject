import express from "express";
import {
  addLesson,
  getLessonsByCourse,
  uploadLessonVideo,
} from "../controllers/lesson.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

/* =========================
   Upload Lesson Video
========================= */
router.post(
  "/upload-video",
  authMiddleware,
  roleMiddleware("educator"),
  upload.single("video"),
  uploadLessonVideo
);

/* =========================
   Add Lesson
========================= */
router.post(
  "/:courseId",
  authMiddleware,
  roleMiddleware("educator"),
  addLesson
);

/* =========================
   Get Lessons
========================= */
router.get(
  "/:courseId",
  authMiddleware,
  getLessonsByCourse
);

export default router;
