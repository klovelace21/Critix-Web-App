import axios from "axios";
const baseUrl = '//localhost:3500/users/reviews'

const setToken = (token) => {
  return `Bearer ${token}`
}

const createReview = async (user, content) => {
  const token = setToken(user.accessToken)
  const config = {
    headers: { Authorization: token }
  }
  const req = {
    username: user.username,
    tmdbID: content.id,
    reviewOf: content.title,
    content: content.review,
    rating: content.rating,
    reviewType: content.type

  }
  
  const response = await axios.post(baseUrl, req, config)

  return response.data
}

const getAllReviews = async (user) => {
  
  const token = setToken(user.accessToken)
  
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(baseUrl, config)
  
  return response.data
}

export {createReview, getAllReviews}