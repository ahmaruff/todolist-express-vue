const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const todoRoutes = require('./todoManagement/interface/routes/todo.routes');

// Load environment variables
dotenv.config();

const app = express();

// === Middleware ===
app.use(express.json());

// CORS Middleware
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];

console.log(allowedOrigins);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// === Routes ===
app.get('/api', (req, res) => {
    res.json({
        app_name: "Todolist",
        description: "A simple web-based Todo List application, designed to showcase fullstack development skills using Node.js",
    });
});

// Swagger Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Todo Routes
app.use('/api/todos', todoRoutes);

// === Error Handling ===
// 404
app.use((req, res, next) => {
    res.status(404).json({ status: 'fail', code: 404, message: 'Route Not Found', data: null });
});

// General Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', code: 500, message: 'Internal Server Error', data: null });
});

module.exports = app;
