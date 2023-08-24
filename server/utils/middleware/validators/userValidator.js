const User = require('../../../models/User')
const asyncHandler = require('express-async-handler')

const createUserValidator = asyncHandler(async (req, res, next) => {
    const { username, password, favoriteGenre } = req.body

    // Confirm data
    if (!username || !password || !favoriteGenre) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    // Check for duplicate user
    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate username'})
    }

    next()
})

const updateUserValidator = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const { username, favoriteGenre } = req.body

    // Confirm data
    if (!username || !favoriteGenre) {
        return res.status(400).json({ message: 'Required fields missing' })
    }
    
    //Checking if duplicate with same username exists and if duplicates id == what was passed in req
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username'})
    }

    next()
})



module.exports = {
    createUserValidator,
    updateUserValidator,
}