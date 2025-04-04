const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const chapterRouter = require('./routes/chapterRoutes');
const courseRouter = require('./routes/courseRoutes');
const ForumRouter = require('./routes/ForumRoute');
const CommentsRouter = require('./routes/CommentsRoute');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/chapters', chapterRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/forum', ForumRouter); 
app.use('/api/v1/comments', CommentsRouter);

module.exports = app;
