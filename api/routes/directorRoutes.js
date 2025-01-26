const express = require('express');
const router = express.Router();
const Director = require('../models/director');

// Getting all directors
router.get('/',  async (req, res) => {
    try {

        const directors = await Director.find();

        if (!directors.length) {
            return res.status(404).json({ error: 'No directors found.' });
        }

        res.status(200).json(directors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
