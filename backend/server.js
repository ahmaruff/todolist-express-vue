const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

// Import your original app, but don't use it directly
const apiApp = require('./src/app');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const SERVE_FRONTEND = process.env.SERVE_FRONTEND === 'true' || process.env.SERVE_FRONTEND === true;
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}/api`;

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('SERVE_FRONTEND:', process.env.SERVE_FRONTEND);
console.log('API_BASE_URL', process.env.API_BASE_URL);

// Create a new Express application
const app = express();

// Mount your API routes from the original app
app.use('/api', apiApp);

// Handle frontend if enabled
if (SERVE_FRONTEND) {
    const frontendPath = path.join(__dirname, '../frontend/dist');
    console.log('Frontend path:', frontendPath);
    
    if (fs.existsSync(frontendPath)) {
        // Serve static files
        app.use(express.static(frontendPath));

        // SPA support - this must come after API routes
        app.get(/^(?!\/api).+/, (req, res) => {
            const indexFile = path.join(frontendPath, 'index.html');
            console.log('Serving index.html for:', req.url);
            res.sendFile(indexFile);
        });

        console.log('Frontend dist/ found and is being served statically.');
    } else {
        console.warn('Frontend dist/ not found. Only the API will be available.');
    }
} else {
    console.log('Frontend serving is disabled. API only.');
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API available at ${API_BASE_URL}`);
    console.log(`Swagger docs at ${API_BASE_URL}/docs`);
});