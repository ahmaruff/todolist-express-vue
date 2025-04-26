const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

// Middleware
app.use(express.json());

// Dummy Home Route
app.get('/api', (req, res) => {
    res.send({
        "app_name": "Todolist",
        "description": "A simple web-based Todo List application, designed to showcase fullstack development skills using Node.js"
    });
});

// Swagger Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const todoRoutes = require('./todoManagement/interface/routes/todo.routes');
app.use('/api', todoRoutes);

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', code: 500, message: 'Internal Server Error', data: null });
});

module.exports = app;
