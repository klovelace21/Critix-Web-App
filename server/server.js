const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

app.use(logger)

app.use(cors())

app.use(express.json())


app.use('/user', userRoute)






app.get('*', (req, res) => {
    res.status(404).json({ message: 'Requested page not found'})
})

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on ${PORT}`))