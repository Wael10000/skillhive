const express = require('express');
const { 
    createForum, 
    getAllForums, 
    getForumById, 
    updateForum, 
    deleteForum 
} = require('../controllers/ForumController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { validateForum, handleValidationErrors } = require('../middleware/ForumValidator');

const router = express.Router();

router.post('/', authenticateUser, createForum);

router.get('/', getAllForums);

router.get('/:id', getForumById);

router.put('/:id', authenticateUser, updateForum);

router.delete('/:id', authenticateUser, deleteForum);

module.exports = router;