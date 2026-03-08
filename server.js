require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// This line connects the routes
app.use('/', require('./routes/index'));

app.get('/', (req, res) => {
  res.send('Welcome to the CSE 341 Project!');
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});

