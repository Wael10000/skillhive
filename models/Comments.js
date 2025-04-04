const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    forumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum', // Reference to the Forum model
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 3, // Ensure comments have a minimum length
        maxlength: 1000 // Limit the length of comments
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // To support nested comments (replies)
        default: null
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Array of users who liked the comment
    }],
    isEdited: {
        type: Boolean,
        default: false // Flag to indicate if the comment was edited
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending' // Status of the comment (e.g., for moderation)
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
});

// Middleware to update `updatedAt` and `isEdited` when the text is modified
commentSchema.pre('save', function(next) {
    if (this.isModified('text')) {
        this.isEdited = true; // Mark as edited
        this.updatedAt = Date.now(); // Update timestamp
    }
    next();
});
module.exports = mongoose.model('Comment', commentSchema);
