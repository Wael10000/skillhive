const express = require('express');
const { 
    createForum, 
    getAllForums, 
    getForumById, 
    updateForum, 
    deleteForum 
} = require('../controllers/ForumController');
const { authenticateUser } = require('../middlewares/authMiddleware');  //
const { validateForum, handleValidationErrors } = require('../middlewares/ForumValidator');

const router = express.Router();

// Route for creating a new forum
router.post('/'  ,validateForum, handleValidationErrors, createForum);

// Route for fetching all forums
router.get('/', getAllForums);

// Route for getting a forum by its ID
router.get('/:id', getForumById);

// Route for updating a forum post
router.put('/:id' ,validateForum, handleValidationErrors, updateForum);

// Route for deleting a forum post
router.delete('/:id' ,deleteForum);

module.exports = router;
