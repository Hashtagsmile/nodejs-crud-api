// Swagger configuration file

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Simple Node.js REST API',
        version: '1.0.0',
        description: 'A simple CRUD API using Node.js and Express',
        },
    servers: [
        {
            url: 'http://localhost:3000', // Base URL for your API
        }
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./app.js'], // Path to your API documentation (your main file or controllers)
  };


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;