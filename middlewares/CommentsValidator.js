const { body, validationResult } = require('express-validator');

// Validation rules for creating/updating a comment
exports.validateComment = [
  body('text')
    .notEmpty().withMessage('Text is required')
    .isLength({ min: 3, max: 1000 }).withMessage('Comment must be between 3 and 1000 characters'),
  body('parentComment')
    .optional()
    .isMongoId().withMessage('Parent comment must be a valid ObjectId'),
  body('forumId')
    .notEmpty().withMessage('Forum ID is required')
    .isMongoId().withMessage('Forum ID must be a valid ObjectId'),
  body('userId')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('User ID must be a valid ObjectId'),
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};