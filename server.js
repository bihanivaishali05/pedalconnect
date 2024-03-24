const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Connect to the local MongoDB database named 'PedalConnectDB'
const mongoDB = 'mongodb://localhost:27017/PedalConnectDB';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the sign-up form data
const signupSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Create a model based on the schema
const Signup = mongoose.model('Signup', signupSchema);

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle POST requests to '/signup'
app.post('/signup', (req, res) => {
  const newSignup = new Signup({
    name: req.body.name,
    email: req.body.email
  });

  newSignup.save((err, signup) => {
    if (err) {
      return res.status(500).send({ message: 'Error saving to database' });
    }
    res.status(200).send({ message: 'Signup successful', data: signup });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
