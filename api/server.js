require('dotenv').config({ path: './.env' });

console.log('Loaded SECRET:', process.env.SECRET);
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
const mongoose = require('mongoose');
const express = require('express');
const { createServer } = require('http'); // For Vercel compatibility

const app = express();
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => console.log('Connected to Database'))
    .catch((error) => {
        console.error('Database connection error:', error);
    });

app.get('/', (req, res) => {
    res.json({
        message: `Welcome to Panida's first API!`,
        availableEndpoints: [
            '/auth/login',
            '/auth/register',
            '/auth/refresh',
            '/auth/logout',
            '/movies',
            '/directors',
        ],
    });
});

const authRouter = require('./authentication/authRoutes');
app.use('/auth', authRouter);

const movieRouter = require('./routes/movieRoutes');
app.use('/movies', movieRouter)

const categoryRouter = require('./routes/categoryRoutes');
app.use('/categories', categoryRouter);

const directorRouter = require('./routes/directorRoutes');
app.use('/directors', directorRouter)

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
