  import mongoose from "mongoose";

  const courseSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String, // Cloudinary URL
        required: true,
      },

      educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      lessons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
        },
      ],

      enrolledStudents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      isPublished: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

  const Course = mongoose.model("Course", courseSchema);

  export default Course;
