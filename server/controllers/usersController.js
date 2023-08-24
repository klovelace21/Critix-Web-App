const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

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

    const user = await User.findById(id).exec()

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
    const  id  = req.params.id

    // User exists and can be deleted
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    const result = await user.deleteOne()

    res.json({ message: `Username ${result.username} with ID ${result._id} deleted`})
})



module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}