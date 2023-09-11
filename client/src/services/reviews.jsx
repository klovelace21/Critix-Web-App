import axios from "axios";
const baseUrl = '//localhost:3500/users/reviews'

const createReview = async (user, content) => {
  const req = {
    username: user.username,
    authToken: user.accessToken,
    id: content.id,
    title: content.title,
    review: content.review,
    rating: content.rating
  }
  const response = await axios.post(baseUrl, req)

  return response.data
}

export default createReview