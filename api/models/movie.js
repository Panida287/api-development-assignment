const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('movie', movieSchema)