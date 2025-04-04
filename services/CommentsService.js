const Comment = require('../models/Comment');
const Forum = require('../models/Forum');

// Create a new comment
const createComment = async ({ text, forumId, userId, parentComment }) => {
    const forum = await Forum.findById(forumId);
    if (!forum) {
        throw new Error('Forum not found');
    }

    const comment = new Comment({
        text,
        forumId,
        userId,
        parentComment
    });

    await comment.save();
    return comment;
};

// Get all comments for a specific forum
const getCommentsByForum = async (forumId) => {
    const comments = await Comment.find({ forumId })
        .populate('userId', 'name email')
        .populate('parentComment');
    return comments;
};

// Get a single comment by ID
const getCommentById = async (id) => {
    const comment = await Comment.findById(id)
        .populate('userId', 'name email')
        .populate('parentComment');
    if (!comment) {
        throw new Error('Comment not found');
    }
    return comment;
};

// Update a comment
const updateComment = async (id, userId, text) => {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error('Comment not found');
    }
    if (comment.userId.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    comment.text = text;
    comment.isEdited = true;
    comment.updatedAt = Date.now();

    await comment.save();
    return comment;
};

// Delete a comment
const deleteComment = async (id, userId) => {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error('Comment not found');
    }
    if (comment.userId.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    await comment.deleteOne();
    return { message: 'Comment deleted successfully' };
};

// Like a comment
const likeComment = async (id, userId) => {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error('Comment not found');
    }

    // Check if the user has already liked the comment
    if (comment.likes.includes(userId)) {
        throw new Error('You have already liked this comment');
    }

    comment.likes.push(userId);
    await comment.save();
    return { message: 'Comment liked' };
};

// Unlike a comment
const unlikeComment = async (id, userId) => {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error('Comment not found');
    }

    // Check if the user has liked the comment
    if (!comment.likes.includes(userId)) {
        throw new Error('You have not liked this comment');
    }

    comment.likes.pull(userId);
    await comment.save();
    return { message: 'Comment unliked' };
};

module.exports = {
    createComment,
    getCommentsByForum,
    getCommentById,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment
};
