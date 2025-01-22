const express = require('express');
const router = express.Router();
const Director = require('../models/director');

// Getting all directors or filter through gender
router.get('/',  async (req, res) => {
    const { gender } = req.query;

    try {
        let genderFilter = {};

        if (gender) {
            genderFilter = { gender: gender };
        }

        const directors = await Director.find(genderFilter);

        if (!directors.length) {
            return res.status(404).json({ error: 'No directors found.' });
        }

        res.status(200).json(directors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
