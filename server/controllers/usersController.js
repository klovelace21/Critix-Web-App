const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'All users'})
})

// @ desc Create a user
// @ route POST /users
// @ access Private
const createUser = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'User created'})
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'User updated'})
})



// @ desc Delete a user
// @ route DELETE /users
// @ access Private
const deleteUser = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'User deleted'})
})



module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}