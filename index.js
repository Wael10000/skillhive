const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const chapterRouter = require('./routes/chapterRoutes');
const courseRouter = require('./routes/courseRoutes');
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/auth', authRouter);

app.use('/api/v1/chapters', chapterRouter);
app.use('/api/v1/courses', courseRouter);

module.exports = app;
