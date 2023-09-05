const axios = require('axios')
const asyncHandler = require('express-async-handler')

const base_url = 'https://api.themoviedb.org/3/'
const tail_url = `?api_key=${process.env.API_KEY}`

// @ desc get recently trending movies in past day
// @ route GET /trending/movies
// @ access ?
const getTrendingMovies = asyncHandler(async (req, res) => {
    /* for home page I believe I will need:
    id, name, overview, vote_average, backdrop path / poster path
    maybe more not sure right now
    */

    // parses movies from api call and pushes them onto return array
   const parseMovies = (page, arr) => {
    page.data.results.forEach(movie => {
        const { title, id, backdrop_path } = movie
        arr.push({ title, id, backdrop_path})
    })
   }

   
   full_url = base_url + 'trending/movie/day' + tail_url

    const page1Call = full_url
    const page2Call = full_url + '&page=2'

    const page1 = await axios.get(page1Call)
    const page2 = await axios.get(page2Call)
    
    
    movieArr = []
    
    parseMovies(page1, movieArr)
    parseMovies(page2, movieArr)
    
   // console.log(movieArr)

    res.json(movieArr)
})

// @ desc get recent trending shows in past day
// @ route GET /trending/shows
// @ access ?
const getTrendingShows = asyncHandler(async (req, res) => {
    const call = base_url + `trending/tv/day` + tail_url

    const result = await axios.get(call)
    
    res.json(result.data)
})


module.exports = {
    getTrendingMovies,
    getTrendingShows
}