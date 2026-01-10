import Lesson from "../models/lesson.model.js";
import Course from "../models/course.model.js";


export const uploadLessonVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }

    const filePath = `/uploads/videos/${req.file.filename}`;

    res.status(200).json({
      success: true,
      data: {
        videoUrl: filePath,
      },
    });
  } catch (error) {
    next(error);
  }
};



export const addLesson = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { title, videoUrl, order, duration } = req.body;

    if (!title || !videoUrl || order === undefined) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.educator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const lesson = await Lesson.create({
      title,
      videoUrl,
      course: courseId,
      order,
      duration: duration || 0,
    });

    course.lessons.push(lesson._id);
    await course.save();

    res.status(201).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};


export const getLessonsByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ course: courseId }).sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    next(error);
  }
};
