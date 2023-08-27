require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const connectDB = require('./utils/config/dbConn')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const reviewRoute = require('./routes/reviewRoutes')
const apiRoute = require('./routes/apiRoutes')
const logger = require('./utils/middleware/logger')
const errorHandler = require('./utils/middleware/errorHandler')

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors())

app.use(express.json())

app.use('/users', userRoute)

app.use('/reviews', reviewRoute)

app.use('/api', apiRoute)

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Requested page not found'})
})


app.use(errorHandler)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})