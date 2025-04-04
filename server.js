const app = require('./index.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const mongoURI = 'mongodb+srv://skillhive:skillhive@skillhive.gpbka.mongodb.net/'

;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});


mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
}   );

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err);
});

