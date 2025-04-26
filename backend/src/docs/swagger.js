const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todolist Management APIs',
      version: '1.0.0',
      description: 'Simple Todo Management API using Domain Driven Design architecture',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local API server',
      },
    ],
  },
  apis: ['./src/**/*.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
