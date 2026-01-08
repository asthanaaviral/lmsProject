import express from "express";
import Course from "../models/Course.js";
import Session from "../models/Session.js"

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();

    if(!req.signedCookies['sid']) {
      const session = await Session.create({});
      res.cookie("sid", session._id.toString(), {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 60 * 1000
      })
    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
