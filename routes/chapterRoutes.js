const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapterController");
const { validateChapter, handleValidationErrors } = require("../middlewares/chapterValidator");

// CRUD routes for chapters
router.get("/course/:courseId", chapterController.getChaptersByCourse); // Get all chapters for a course
router.get("/:id", chapterController.getChapterById); // Get a specific chapter
router.post("/", validateChapter, handleValidationErrors, chapterController.createChapter); // Create a new chapter
router.patch("/:id", validateChapter, handleValidationErrors, chapterController.updateChapter); // Update a chapter
router.delete("/:id", chapterController.deleteChapter); // Delete a chapter

module.exports = router;