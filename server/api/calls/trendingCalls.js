const axios = require('axios')
const asyncHandler = require('express-async-handler')

const base_url = 'https://api.themoviedb.org/3/'
const tail_url = `?api_key=${process.env.API_KEY}`

// @ desc get recently trending movies
// @ route GET /trending/movies
// @ access ?
const getTrendingMovies = asyncHandler(async (req, res) => {
    const call = base_url + `trending/movie/day` + tail_url

    console.log(call)
    const result = await axios.get(call)

    
    res.json(result.data)
})

module.exports = {
    getTrendingMovies
}