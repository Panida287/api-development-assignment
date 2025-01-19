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
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send({ message: 'MongoDB is connected!' });
});

// Vercel-specific export
const server = createServer(app); // Create HTTP server for Vercel
module.exports = (req, res) => server.emit('request', req, res);
