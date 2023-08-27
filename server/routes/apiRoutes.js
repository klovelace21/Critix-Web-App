const express = require('express')
const router = express.Router()
const movieCaller = require('../api/calls/movieCalls')
const trendingCaller = require('../api/calls/trendingCalls')

// trending calls
router.route('/trending/movies')
    .get(trendingCaller.getTrendingMovies)

// movie calls 
router.route('/movies/:movId')
    .get(movieCaller.getMovie)

module.exports = router