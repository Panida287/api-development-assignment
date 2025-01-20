require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const express = require('express');
const { createServer } = require('http'); // For Vercel compatibility

const app = express();
app.use(express.json()); // Middleware to parse JSON

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => console.log('Connected to Database'))
    .catch((error) => {
        console.error('Database connection error:', error);
    });

const movieRouter = require('./routes/movieRoutes');
app.use('/movies', movieRouter)

const directorRouter = require('./routes/directorRoutes');
app.use('/directors', directorRouter)

const categoryRouter = require('./routes/categoryRoutes');
app.use('/categories', categoryRouter)


// Vercel-specific export
const server = createServer(app);

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export for Vercel
module.exports = (req, res) => server.emit('request', req, res);
