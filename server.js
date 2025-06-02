import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// Handle root route
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Handle data-viz route
app.get('/data-viz', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'data-viz.html'));
});

app.listen(PORT, () => {
    console.log(`Production server running at http://localhost:${PORT}/`);
});