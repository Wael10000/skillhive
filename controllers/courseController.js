const Course = require("../models/course");

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("tutor", "name email"); // Populate tutor details
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("tutor", "name email");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    tutor: req.body.tutor, // Tutor ID
    difficulty: req.body.difficulty,
    pricing: req.body.pricing,
    skills: req.body.skills,
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update fields if they exist in the request body
    if (req.body.title) course.title = req.body.title;
    if (req.body.description) course.description = req.body.description;
    if (req.body.category) course.category = req.body.category;
    if (req.body.difficulty) course.difficulty = req.body.difficulty;
    if (req.body.pricing) course.pricing = req.body.pricing;
    if (req.body.skills) course.skills = req.body.skills;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.remove();
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};