const Forum = require('../models/Forum');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Create a new forum post
const createForum = async ({ title, description, userId, category, tags }) => {
    const forum = new Forum({
        title,
        description,
        userId,
        category,
        tags
    });

    await forum.save();
    return forum;
};

// Get all forums
const getAllForums = async () => {
    const forums = await Forum.find()
        .populate('userId', 'name email')
        .populate('comments');
    return forums;
};

// Get a single forum by ID
const getForumById = async (forumId) => {
    const forum = await Forum.findById(forumId)
        .populate('userId', 'name email')
        .populate('comments');

    if (!forum) {
        throw new Error('Forum not found');
    }

    // Increment views
    forum.views += 1;
    await forum.save();

    return forum;
};

// Update a forum post
const updateForum = async (forumId, userId, updateData) => {
    const forum = await Forum.findById(forumId);
    if (!forum) {
        throw new Error('Forum not found');
    }

    // Ensure only the creator can update the forum post
    if (forum.userId.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    Object.assign(forum, updateData);
    forum.updatedAt = Date.now();
    await forum.save();

    return forum;
};

// Delete a forum post
const deleteForum = async (forumId, userId) => {
    const forum = await Forum.findById(forumId);
    if (!forum) {
        throw new Error('Forum not found');
    }

    // Ensure only the creator can delete the forum post
    if (forum.userId.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    await forum.deleteOne();
    return { message: 'Forum deleted successfully' };
};

// Like a forum post
const likeForum = async (forumId, userId) => {
    const forum = await Forum.findById(forumId);
    if (!forum) {
        throw new Error('Forum not found');
    }

    // Check if the user has already liked the forum post
    if (forum.likes.includes(userId)) {
        throw new Error('You have already liked this forum');
    }

    forum.likes.push(userId);
    await forum.save();
    return { message: 'Forum liked' };
};

// Unlike a forum post
const unlikeForum = async (forumId, userId) => {
    const forum = await Forum.findById(forumId);
    if (!forum) {
        throw new Error('Forum not found');
    }

    // Check if the user has liked the forum post
    if (!forum.likes.includes(userId)) {
        throw new Error('You have not liked this forum');
    }

    forum.likes.pull(userId);
    await forum.save();
    return { message: 'Forum unliked' };
};

module.exports = {
    createForum,
    getAllForums,
    getForumById,
    updateForum,
    deleteForum,
    likeForum,
    unlikeForum
};
