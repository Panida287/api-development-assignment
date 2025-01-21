const mongoose = require('mongoose')

const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshTokens:[String],
})

module.exports = mongoose.model('User', userSchema);