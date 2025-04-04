const { body, validationResult } = require("express-validator");

// Validation rules for creating/updating a chapter
exports.validateChapter = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("video.url").optional().isURL().withMessage("Video URL must be a valid URL"),
  body("video.duration").optional().isNumeric().withMessage("Video duration must be a number"),
  body("quiz").optional().isArray().withMessage("Quiz must be an array"),
  body("course").notEmpty().withMessage("Course ID is required"),
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};