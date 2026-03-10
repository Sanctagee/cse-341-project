const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GabbyTech Contacts API',
    description: 'API documentation for the CSE 341 Contacts project — built by GabbyTech at BYU-Idaho.',
    version: '1.0.0',
    contact: {
      name: 'GabbyTech',
    }
  },
  host: 'cse-341-project-pxfo.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);