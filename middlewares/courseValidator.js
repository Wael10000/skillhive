const { body, validationResult } = require("express-validator");

// Validation rules for creating/updating a course
exports.validateCourse = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("tutor").notEmpty().withMessage("Tutor is required"),
  body("difficulty")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage("Invalid difficulty level"),
  body("pricing").isNumeric().withMessage("Pricing must be a number"),
  body("skills").isArray().withMessage("Skills must be an array"),
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};