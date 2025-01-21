const mongoose = require('mongoose')
const capitalizeWords = require("../utils/stringHelpers");

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
    }
});

categorySchema.pre('save', function (next) {
    if (this.category_name) {
        this.category_name = capitalizeWords(this.category_name);
    }
    next();
})


module.exports = mongoose.model('Category', categorySchema)