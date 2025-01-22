const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Category = require('../models/category');
const Director = require('../models/director');
const authenticateToken = require('../authentication/authMiddleware');

// Getting all or filter through
router.get('/', async (req, res) => {
    const { director, category, limit } = req.query;

    try {
        let directorFilter = {};
        if (director) {
            const directorDoc = await Director.findOne({ name: capitalizeWords(director) });
            if (!directorDoc) {
                return res.status(404).json({ error: 'Director not found' });
            }
            directorFilter = { director: directorDoc._id };
        }

        let categoryFilter = {};
        if (category) {
            const categoryDoc = await Category.findOne({ category_name: capitalizeWords(category) });
            if (!categoryDoc) {
                return res.status(404).json({ error: 'Category not found' });
            }
            categoryFilter = { category: categoryDoc._id };
        }

        let query = Movie.find({ ...directorFilter, ...categoryFilter })
            .populate('director')
            .populate('category');

        if (limit) {
            const parsedLimit = parseInt(limit, 10);
            if (!isNaN(parsedLimit)) {
                query = query.limit(parsedLimit);
            }
        }

        const movies = await query;
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Getting one movie
router.get('/:id', getMovie,  (req, res) => {
    try {
        res.status(200).json(res.movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Creating one movie
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, year, category, director } = req.body;

        if (!director.gender || !['male', 'female'].includes(director.gender.toLowerCase())) {
            return res.status(400).json({ error: 'Gender must be either "male" or "female".' });
        }

        let categoryDoc = await Category.findOne({ category_name: new RegExp(`^${category}$`, 'i') });
        if (!categoryDoc) {
            categoryDoc = new Category({ category_name: category });
            await categoryDoc.save();
        }

        let directorDoc = await Director.findOne({ name: new RegExp(`^${director.name}$`, 'i') });
        if (!directorDoc) {
            directorDoc = new Director({
                name: director.name,
                gender: director.gender,
            });
            await directorDoc.save();
        }

        const movie = new Movie({
            title,
            year,
            category: categoryDoc._id,
            director: directorDoc._id,
        });

        const newMovie = await movie.save();

        const populatedMovie = await Movie.findById(newMovie._id)
            .populate('director')
            .populate('category');

        res.status(201).json(populatedMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Updating one movie
router.put('/:id', getMovie, authenticateToken, async (req, res) => {
    const { title, year, category, director } = req.body;

    try {
        const movie = res.movie;

        if (title) {
            movie.title = title;
        }

        if (year) {
            movie.year = year;
        }

        if (category) {

            let categoryDoc = await Category.findOne({ category_name: new RegExp(`^${category}$`, 'i') });
            if (!categoryDoc) {

                categoryDoc = new Category({ category_name: category });
                await categoryDoc.save();
            }
            movie.category = categoryDoc._id;
        }

        if (director) {
            if (!director.gender || !['male', 'female'].includes(director.gender.toLowerCase())) {
                return res.status(400).json({ error: 'Gender must be either "male" or "female".' });
            }

            let directorDoc = await Director.findOne({ name: new RegExp(`^${director.name}$`, 'i') });

            if (directorDoc) {

                if (directorDoc.gender.toLowerCase() !== director.gender.toLowerCase()) {
                    directorDoc.gender = director.gender;
                    await directorDoc.save();
                }
            } else {

                directorDoc = new Director({
                    name: director.name,
                    gender: director.gender,
                });
                await directorDoc.save();
            }

            movie.director = directorDoc._id;
        }

        const updatedMovie = await movie.save();

        const populatedMovie = await Movie.findById(updatedMovie._id)
            .populate('director')
            .populate('category');

        res.status(200).json(populatedMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Deleting one movie
router.delete('/:id', getMovie, authenticateToken, async (req, res) => {
    try {
        await res.movie.deleteOne();
        res.json({ message: 'Movie removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Middleware for fetching a movie by ID
async function getMovie(req, res, next) {
    try {
        const movie = await Movie.findById(req.params.id).populate('director').populate('category');
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.movie = movie;
        next();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = router;
