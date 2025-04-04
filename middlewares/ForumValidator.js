const { body, validationResult } = require("express-validator");

// Validation rules for creating/updating a forum post
exports.validateForum = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 5, max: 200 }).withMessage("Title must be between 5 and 200 characters"),
  
  body("description")
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10, max: 2000 }).withMessage("Description must be between 10 and 2000 characters"),
  
  body("category")
    .notEmpty().withMessage("Category is required")
    .isIn(["General", "Technology", "Science", "Entertainment", "Education", "Other"]).withMessage("Invalid category"),
  
  body("tags")
    .optional()
    .isArray().withMessage("Tags must be an array")
    .custom((tags) => {
      if (!tags.every(tag => typeof tag === "string" && tag.trim().length > 0)) {
        throw new Error("Each tag must be a non-empty string");
      }
      return true;
    }),

  body("status")
    .optional()
    .isIn(["pending", "approved", "rejected"]).withMessage("Invalid status"),
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
