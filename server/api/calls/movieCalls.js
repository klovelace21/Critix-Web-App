const axios = require('axios')
const asyncHandler = require('express-async-handler')

const base_url = 'https://api.themoviedb.org/3/'
const tail_url = `?api_key=${process.env.API_KEY}`

// @ desc Get movie by ID
// @ route GET /movies/:movId
// @ access ?
const getMovie = asyncHandler(async (req, res) => {
    const movId = req.params.movId
    const call = base_url + `movie/${movId}` + tail_url
    
    const result = await axios.get(call)
    
    res.json(result.data)
})


module.exports = {
    getMovie
}