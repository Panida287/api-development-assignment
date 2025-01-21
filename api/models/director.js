const mongoose = require('mongoose')
const capitalizeWords = require('../utils/stringHelpers');

const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    }
});

directorSchema.pre('save', function (next) {
    if (this.name) {
        this.name = capitalizeWords(this.name);
    }
    next();
})

module.exports = mongoose.model('Director', directorSchema)