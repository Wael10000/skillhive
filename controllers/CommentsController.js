const Comment = require('../models/Comment');
const Forum = require('../models/Forum');
const { validationResult } = require('express-validator');

// Create a new comment
exports.createComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { text, forumId, parentComment } = req.body;
        const userId = req.user.id; // Assuming user is authenticated

        const forum = await Forum.findById(forumId);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }

        const comment = new Comment({
            text,
            forumId,
            userId,
            parentComment
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all comments for a specific forum
exports.getCommentsByForum = async (req, res) => {
    try {
        const forumId = req.params.forumId;
        const comments = await Comment.find({ forumId })
            .populate('userId', 'name email')
            .populate('parentComment');

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single comment by ID
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('parentComment');
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        const { text } = req.body;

        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user is the owner of the comment
        if (comment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        comment.text = text;
        comment.isEdited = true;
        comment.updatedAt = Date.now();

        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user is the owner of the comment
        if (comment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await comment.deleteOne();
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Like a comment
exports.likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user has already liked the comment
        if (comment.likes.includes(req.user.id)) {
            return res.status(400).json({ message: 'You have already liked this comment' });
        }

        comment.likes.push(req.user.id);
        await comment.save();
        res.json({ message: 'Comment liked' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Unlike a comment
exports.unlikeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user has liked the comment
        if (!comment.likes.includes(req.user.id)) {
            return res.status(400).json({ message: 'You have not liked this comment' });
        }

        comment.likes.pull(req.user.id);
        await comment.save();
        res.json({ message: 'Comment unliked' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
