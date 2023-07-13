const express = require('express')
const { PORT, MONGODB_URI} = require('./utils/config')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter  = require('./controllers/signup')
// const  middleware = require('./utils/middelware')
const loginRouter = require('./controllers/login')
const questionsRouter = require('./controllers/questions')
const submissionRouter = require('./controllers/submission')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/signup',userRouter)
app.use('/api/questions', questionsRouter)
app.use('/api/submissions',submissionRouter)




const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
