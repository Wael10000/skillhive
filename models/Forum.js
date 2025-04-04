const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const forumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 2000
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: ['General', 'Technology', 'Science', 'Entertainment', 'Education', 'Other'],
        default: 'General'
    },
    tags: [{
        type: String,
        trim: true
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    views: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

forumSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});
forumSchema.methods.toJSON = function() {
    const forum = this;
    const forumObject = forum.toObject();

    // Remove sensitive data
    delete forumObject.__v;

    return forumObject;
};
forumSchema.methods.generateAuthToken = async function() {
    const forum = this;
    const token = jwt.sign({ _id: forum._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
};
forumSchema.methods.comparePassword = async function(candidatePassword) {
    const forum = this;
    const isMatch = await bcrypt.compare(candidatePassword, forum.password);
    return isMatch;
};

module.exports = mongoose.model('Forum', forumSchema);
