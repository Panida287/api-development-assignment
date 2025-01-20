const express = require('express');
const router = express.Router();
const Director = require('../models/director');

// Getting all directors or filter through gender
router.get('/', async (req, res) => {
    const { gender } = req.query;

    try {
        let genderFilter = {};

        // Validate gender if provided
        if (gender) {
            const formattedGender = gender.toLowerCase();
            if (!['male', 'female'].includes(formattedGender)) {
                return res.status(400).json({ error: 'Gender must be either "male" or "female".' });
            }
            genderFilter = { gender: formattedGender };
        }

        // Find directors with the filter applied
        const directors = await Director.find(genderFilter);

        // Check if no directors found
        if (!directors.length) {
            return res.status(404).json({ error: 'No directors found.' });
        }

        // Return the list of directors
        res.status(200).json(directors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
