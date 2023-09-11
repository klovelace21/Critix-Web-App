const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // reviewType = Movie || Actor
    reviewType: {
        type: String
    },

    // reviewOf = Title of movie or name of actor
    reviewOf: {
        type: String
    },

    //ID for API calls to TMDB
    tmdbID: {
        type: Number
    },

    rating: {
        type: Number
    },

    content: {
        type: String
    },

    // Default date is current yyyy-mm-dd
    dateCreated: {
        type: Date,
        default: new Date().toISOString().split('T')[0]
    }
})

module.exports = new mongoose.model('Review', reviewSchema)