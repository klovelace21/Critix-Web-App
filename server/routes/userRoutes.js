const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const reviewController = require('../controllers/reviewsController')
const userExtractor = require('../utils/middleware/userExtractor')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)

router.route('/login')
    .post(usersController.loginUser)

router.route('/reviews')
    .post(userExtractor, reviewController.createReview)
    .get(userExtractor, reviewController.getAllReviews)

router.route('/:id')
    .get(usersController.getUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router