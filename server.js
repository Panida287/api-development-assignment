require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send({ message: 'MongoDB is connected!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
