const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Swagger options
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartPlatform API Documentation',
      version: '1.0.0',
      description: 'API documentation for SmartPlatform app',
      contact: {
        name: "Rezapr2",
        email: "rezapr2@gmail.com",
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
      {
        url: 'http://5.34.195.193:3000',
      }
    ],
  },
  apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

// ... Your existing Express routes

module.exports = app;
