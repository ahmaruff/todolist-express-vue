const app = require('./src/app');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

const apiBaseUrl = process.env.API_BASE_URL || `http://localhost:${port}/api`;

app.listen(port, () => {
    console.log(`Server running at ${apiBaseUrl}`);
    console.log(`Swagger docs at ${apiBaseUrl}/docs`);
});