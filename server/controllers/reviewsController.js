const asyncHandler = require('express-async-handler')
const Review = require('../models/Review')
const User = require('../models/User')


// @ desc Get all reviews
// @ route GET /reviews
// @ access Private
const getAllReviews = asyncHandler(async (req, res) => {

    //obtaining reviews
    const reviews = await Review.find().lean()

    // if reviews is null or empty
    if (!reviews?.length) {
        return res.status(400).json({ message: 'No reviews found' })
    }

    res.json(reviews)
})

// @ desc Get a review
// @ route GET /reviews/:id
//@ access Private(?)
const getReview = asyncHandler(async (req, res) => {
    const id = req.params.id
    const review = await Review.findById(id).lean()

    // if review does not exist
    if (!review) {
        return res.status(400).json({ message: 'Review not found'})
    }

    res.json(review)
})

// @ desc Create a review
// @ route POST /reviews
// @ access Private(?)
const createReview = asyncHandler(async (req, res) => {
    
    const  { createdBy, reviewType, reviewOf, tmdbID, content} = req.body

    // Confirm data
    if (!createdBy || !reviewType || !reviewOf || !tmdbID || !content) {
        return res.status(400).json({ message: 'All fields required' })
    }

    // Confirm createdBy user exists
    const user = await User.findById(createdBy)

    if (!user) {
        return res.status(409).json({ message: 'Assigned User not found' })
    }

    // Creating and storing review
    const reviewObject = {createdBy, reviewType, reviewOf, tmdbID, content}

    const review = await Review.create(reviewObject)

    // Appending created Review to creator
    user.reviews = user.reviews.concat(review._id)
    await user.save()

    if (review) {
        res.status(201).json({
            message: `New review of ${review.reviewOf} created by ${user.username}`
        })
    } else {
        res.status(400).json({ message: 'Invalid review data received' })
    }

})

// @ desc Update a review
// @ route PATCH /reviews/:id
// @ access Private(?)
const editReview = asyncHandler(async (req, res) => {
    // Never changing fields asides from content
    const id = req.params.id
    const { content } = req.body

    // Confirm data
    if (!id || !content) {
        return res.status(400).json({ message: 'Content and review ID required'})
    }

    // Confirm review exists
    const review = await Review.findById(id).exec()

    if (!review) {
        return res.status(400).json({ message: 'Review not found' })
    }
    
    review.content = content
    await review.save()

    res.json({ message: `${review.reviewOf} has been updated`})
})

// @ desc Delete a review
// @ route DELETE /reviews/:id
// @ access Private(?)
const deleteReview = asyncHandler(async (req, res) => {
    const id = req.params.id

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Review ID Required'})
    }

    // Review exists and can be deleted
    const review = await Review.findById(id).exec()

    if (!review) {
        return res.status(400).json({ message: 'Review not found' })
    }

    const result = await review.deleteOne()


    res.json({ message: `Review of ${result.reviewOf} deleted`})
})

module.exports = {
    getAllReviews,
    getReview,
    createReview,
    editReview,
    deleteReview
}