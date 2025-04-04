
const Forum = require('../models/Forum');
const { validationResult } = require('express-validator');

// Create a new forum post

exports.createForum = async (req, res) => {
  
    const {title,description,userId,category,tags} = req.body;
  
    try {  
  
        const forum = new Forum({...req.body});
  
        forum.save();
      res.status(201).send("Created")
    } catch (error) {
      console.error("error");
      res.status(500).send(error);
    }
  
  }


// Get all forums
exports.getAllForums = async (req, res) => {
    try {
        const forums = await Forum.find().populate('userId', 'name email');
        res.json(forums);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single forum by ID
exports.getForumById = async (req, res) => {
    try {
        const forum = await Forum.findById(req.params.id).populate('userId', 'name email').populate('comments');
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }
        forum.views += 1;
        await forum.save();
        res.json(forum);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a forum post
exports.updateForum = async (req, res) => {
    try {
        const forum = await Forum.findById(req.params.id);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }
        Object.assign(forum, req.body);
        forum.updatedAt = Date.now();
        await forum.save();
        res.json(forum);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a forum post
exports.deleteForum = async (req, res) => {
    try {
        const forum = await Forum.findById(req.params.id);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }
        await forum.deleteOne();
        res.json({ message: 'Forum deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};