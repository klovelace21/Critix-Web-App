const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {

  const authorization = req.get('authorization')
  token = authorization && authorization.startsWith('Bearer ')
  ? authorization.substring(7)
  : "null"  
  
  req.token = token

  next()
}

module.exports = tokenExtractor