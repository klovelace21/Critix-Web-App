const express = require('express')
const router = express.Router()
const apiCaller = require('../api/apiCaller')


router.route('/movies/:movId')
    .get(apiCaller.getMovie)
module.exports = router