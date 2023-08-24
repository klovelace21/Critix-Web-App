const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    favoriteGenre: {
        type: String
    },
    
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    
    // Default date is current yyyy-mm-dd
    dateCreated: {
        type: Date,
        default: new Date().toISOString().split('T')[0]
    }
})

module.exports = mongoose.model('User', userSchema)