const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const validator = require('../utils/middleware/validators/userValidator')

router.route('/')
    .get(usersController.getAllUsers)
    .post(validator.createUserValidator, usersController.createUser)

router.route('/:id')
    .get(usersController.getUser)
    .patch(validator.updateUserValidator, usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router