const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Getting all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        if (Category.length > 0) {
            return res.status(200).json({ categories });
        } else {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;