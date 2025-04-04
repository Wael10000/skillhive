const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentsByForum,
    getCommentById,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment
} = require('../controllers/CommentsController');
const { validateComment, handleValidationErrors } = require('../validators/commentsValidator');
const { authMiddleware } = require('../middleware/auth');


router.post('/:forumId', authMiddleware, validateComment, handleValidationErrors, createComment);

router.get('/forum/:forumId', getCommentsByForum);

router.get('/:id', getCommentById);

router.put('/:id', authMiddleware, validateComment, handleValidationErrors, updateComment);

router.delete('/:id', authMiddleware, deleteComment);

router.post('/:id/like', authMiddleware, likeComment);

router.post('/:id/unlike', authMiddleware, unlikeComment);

module.exports = router;
