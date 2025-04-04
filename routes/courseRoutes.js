const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { validateCourse, handleValidationErrors } = require("../middlewares/courseValidator");

// CRUD routes for courses
router.get("/", courseController.getAllCourses); // Get all courses
router.get("/:id", courseController.getCourseById); // Get a specific course
router.post("/", validateCourse, handleValidationErrors, courseController.createCourse); // Create a new course
router.patch("/:id", validateCourse, handleValidationErrors, courseController.updateCourse); // Update a course
router.delete("/:id", courseController.deleteCourse); // Delete a course

module.exports = router;