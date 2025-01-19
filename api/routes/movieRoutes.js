const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Getting all
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Getting one
router.get('/:id', getMovie, (req, res) => {
    res.send(res.movie)
})

// Creating one
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        category: req.body.category,
    })
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie)
    } catch (err){
        res.status(400).json({ error: err.message });
    }
})

// Updating one
router.put('/:id', getMovie, async (req, res) => {
    res.movie.title = req.body.title;
    res.movie.year = req.body.year;
    res.movie.category = req.body.category;
    try {
        const updateMovie = await res.movie.save()
        res.json(updateMovie)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

// Deleting One
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.deleteOne();
        res.json({ message: 'Movie removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

async function getMovie(req, res, next) {
    let movie
    try {
        movie = await Movie.findById(req.params.id)
        if (movie == null) {
            return res.status(404).json({ error: 'No movie found' })
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

    res.movie = movie;
    next()
}

module.exports = router;