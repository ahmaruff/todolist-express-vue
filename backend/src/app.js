const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();
const port = 3000;

app.use(express.json());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Dummy Home
app.get('/', (req, res) => {
    res.send({
        "app_name" :"Todolist",
        "description" : "A simple web-based Todo List application, designed to showcase fullstack development skills using Node.js"
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});
