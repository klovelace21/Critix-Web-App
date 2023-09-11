const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const userExtractor = async(req, res, next) => {
  const token = req.token
  
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    req.user = user
  } else {
    return res.status(401).json({ message: "Authentication failed"})
  }

  next()
}

module.exports = userExtractor