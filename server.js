const app = require('./index.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config()


const { authenticateUser } = require('./middlewares/authMiddleware');
app.get('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'You have access!' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoURI = 'mongodb+srv://skillhive:skillhive@skillhive.gpbka.mongodb.net/';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err);
});
