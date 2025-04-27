const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const cors = require('cors');

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173'
];

const app = express();

// Middleware
app.use(express.json());

// Menggunakan CORS middleware dengan konfigurasi beberapa origin
app.use(cors({
    origin: function(origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

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
app.use('/api/todos', todoRoutes);

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', code: 500, message: 'Internal Server Error', data: null });
});

module.exports = app;
