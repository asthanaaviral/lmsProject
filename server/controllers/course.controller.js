import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";


export const uploadCourseThumbnail = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail file is required",
      });
    }

    const filePath = `/uploads/thumbnails/${req.file.filename}`;

    res.status(200).json({
      success: true,
      data: {
        thumbnail: filePath,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const createCourse = async (req, res, next) => {
  try {
    const { title, description, thumbnail } = req.body;

    if (!title || !description || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      thumbnail,
      educator: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};


export const getEducatorCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ educator: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};



export const getPublishedCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate("educator", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};



export const publishCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

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

    course.isPublished = true;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course published",
    });
  } catch (error) {
    next(error);
  }
};



export const enrollInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course || !course.isPublished) {
      return res.status(404).json({
        success: false,
        message: "Course not available",
      });
    }

    if (course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled",
      });
    }

    course.enrolledStudents.push(req.user.id);
    await course.save();

    res.status(200).json({
      success: true,
      message: "Enrolled successfully",
    });
  } catch (error) {
    next(error);
  }
};



export const getCourseWithLessons = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate(
      "educator",
      "name"
    );

    if (!course || !course.isPublished) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const lessons = await Lesson.find({ course: courseId }).sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      data: { course, lessons },
    });
  } catch (error) {
    next(error);
  }
};
