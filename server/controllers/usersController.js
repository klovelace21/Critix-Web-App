const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// @ desc Get all users
// @ route GET /users
// @ access Private
const getAllUsers = asyncHandler(async (req, res) => {

    // obtaining users not including password
    const users = await User.find().select('-password').lean()

    // if the users is null or empty 
    if(!users?.length){
        return res.status(400).json({ message: 'No Users found' })
    }
    res.json(users)
})

// @ desc Get a user
// @ route GET /users/:id
// @ access Private(?)
const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id).select('-password')

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    res.json(user)
  
})

// @ desc Create a user
// @ route POST /users
// @ access Private(?)
const createUser = asyncHandler(async (req, res) => {
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

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10)
    
    // Create and Store new User
    const userObject = { username, "password": hashedPwd, favoriteGenre}

    const user = await User.create(userObject)
    
    
    if (user) {
        res.status(201).json({ message: `New user ${username} created`})
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @ desc Update a user
// @ route PATCH /users/:id
// @ access Private(?)
const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { username, password, favoriteGenre } = req.body

    // Confirm data
    if (!username || !favoriteGenre) {
    return res.status(400).json({ message: 'Required fields missing' })
    }


    const user = await User.findById(id).exec()

    //Checking if duplicate with same username exists and if duplicates id == what was passed in req
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username'})
    }

    // Confirm user exists
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    user.username = username
    user.favoriteGenre = favoriteGenre

    // If password was passed, hash and update
    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated`})
})

// @ desc Delete a user
// @ route DELETE /users/:id
// @ access Private
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id

    // User exists and can be deleted
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    const result = await user.deleteOne()

    res.json({ message: `Username ${result.username} with ID ${result._id} deleted`})
})

// @ desc Login a user
// @ route POST /users/login
// @ access Private
const loginUser = asyncHandler (async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

    if(!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    res.cookie('jwt', token, { httpOnly: true })

    const { favoriteGenre, reviews } = user

    res.status(200).send({ username, favoriteGenre, reviews })
})




module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}