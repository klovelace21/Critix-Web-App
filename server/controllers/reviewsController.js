const asyncHandler = require('express-async-handler')
const Review = require('../models/Review')
const User = require('../models/User')


// @ desc Get all reviews associated with user
// @ route GET /reviews
// @ access Private
const getAllReviews = asyncHandler(async (req, res) => {
    
    const reviews =  await Review.find({ createdBy: req.user._id }).lean()

    const changedReviews = []
    reviews.forEach(review => {
        const { reviewOf, rating, content } = review
        changedReviews.push({ title: reviewOf, rating, content})
    })
 
    res.json(changedReviews)
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
    const { tmdbID, reviewOf, content, rating, reviewType } = req.body
    
    // Verifying input
    if (!tmdbID || !reviewOf || !content || !rating || !reviewType) {
        return res.status(401).json({ error: "All fields required"})
    }

    // Checking for user
    const createdBy = req.user

    if (!createdBy) {
        return res.status(401).json({ message: "Authentication failed" })
    }

    // Creating review
    const reviewObject = { createdBy, reviewType, reviewOf, tmdbID, rating, content}
    
    const review = await Review.create(reviewObject)

    if (!review) {
        return res.status(401).json({ message: "Review creation failed"})
    }

    createdBy.reviews = createdBy.reviews.concat(review._id)

    await createdBy.save()

    return res.status(201).json({ message: `Review from ${createdBy.username} created`})

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