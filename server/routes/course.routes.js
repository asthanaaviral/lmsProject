import express from "express";
import {
  createCourse,
  getEducatorCourses,
  getPublishedCourses,
  publishCourse,
  enrollInCourse,
  getCourseWithLessons,
  uploadCourseThumbnail,
} from "../controllers/course.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();


router.post(
  "/upload-thumbnail",
  authMiddleware,
  roleMiddleware("educator"),
  upload.single("thumbnail"),
  uploadCourseThumbnail
);



router.post(
  "/",
  authMiddleware,
  roleMiddleware("educator"),
  createCourse
);

router.get(
  "/educator",
  authMiddleware,
  roleMiddleware("educator"),
  getEducatorCourses
);

router.patch(
  "/:courseId/publish",
  authMiddleware,
  roleMiddleware("educator"),
  publishCourse
);



router.get(
  "/",
  authMiddleware,
  roleMiddleware("student"),
  getPublishedCourses
);

router.post(
  "/:courseId/enroll",
  authMiddleware,
  roleMiddleware("student"),
  enrollInCourse
);



router.get("/:courseId", authMiddleware, getCourseWithLessons);

export default router;
