require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('public'));

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Welcome page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Contacts routes
app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and node is listening on port ${port}`);
    });
  }
});