const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500

const userRoute = require('./routes/userRoutes')

app.use('/user', userRoute)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))