require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// This line connects the routes
app.use('/', require('./routes/index'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

mongodb.initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Database connected and node is running on port ${port}`);
    });
  }
});