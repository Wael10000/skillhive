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
const { validateComment, handleValidationErrors } = require('../middlewares/CommentsValidator');


router.post('/:forumId', validateComment, handleValidationErrors, createComment);

router.get('/forum/:forumId', getCommentsByForum);

router.get('/:id', getCommentById);

router.put('/:id', validateComment, handleValidationErrors, updateComment);

router.delete('/:id', deleteComment);

router.post('/:id/like', likeComment);

router.post('/:id/unlike', unlikeComment);

module.exports = router;
