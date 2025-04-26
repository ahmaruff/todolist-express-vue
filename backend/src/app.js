const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());  // To parse JSON request bodies

// Sample route
app.get('/', (req, res) => {
    res.send({
        "greetings": "Hello, Todo Management!"
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
