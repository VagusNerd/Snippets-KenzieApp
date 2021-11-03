import 'dotenv/config'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import keys from './config/keys'
import router from './routes'
import { requestLogger, errorHandler } from './middleware'
import seedDatabase from './seedDatabase'
import { User } from './models'

const createError = require('http-errors')

mongoose.connect(keys.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

mongoose.connection.on('connected', () => {
  console.log('connected to mongoDB')
  seedDatabase()
})

mongoose.connection.on('error', (err) => {
  console.log('err connecting', err)
})

const app = express()

// middleware
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(requestLogger)

// api router
app.use(keys.app.apiEndpoint, router)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'NotFound'))
})

app.get('/alice', async(req, res) => {
  try{
    const user = await User.find({username: 'alice'})
    console.log(user)
    res.status(200).send(user)
    return user
  } catch(error){
      return res.status(500).send("Erorr getting user alice!")
  }
})

app.get('/top', async (req, res) => {
  try{
    const findUser = await User.find({})
    const topThreeUsers = findUser.sort((a,b) => {
        return b.posts.length-a.posts.length
      }).slice(0,3)
    res.status(200).json(topThreeUsers)
    return topThreeUsers
  } catch(error){
      return res.status(500).send("Errot getting top 3 posters!")
  }
})

app.get('/likes', async (req, res) => {
  try{
    const findUser = await User.find({})
    let totalLikes = 0
    findUser.map(user => totalLikes += user.postLikes.length)
    res.status(200).json(totalLikes)
    return totalLikes
  } catch (error){
      return res.status(500).send("Error getting likes!")
  }
})

app.get('/posts/count', async (req, res) => {
  try {
    const findUser = await User.find({})
    let postCounts = findUser.map(u => {
      return u.username + ": " + u.posts.length
    })
    res.status(200).send(postCounts)
  } catch (error) {
    res.status(500).send("Error getting post count!")
  }
})

//// Home URL and Hello message
app.get('/home/:name', (req, res) => {
  try {
    const username = req.params.name
    res.status(200).send({
      "message": "Hello " + username + "!"
    })
  } catch (err) {
    res.status(500).send("Error!", err)
  }
})

//// Error handling for no name provided
app.get('/home', (req, res) => {
  res.status(422).send('Error: no name provided!')
})

//// Adding two numbers with URL params
app.get('/add/:x/:y',(req, res) => {
  try {
    const { x, y } = req.params
    const total = parseInt(x) + parseInt(y)
    res.send({sum: total})
  } catch (err) {
    res.status(500).send("Error!", err)  }
})

//// Error handling for only one number
app.get('/add/:x',(req, res) => {
  res.status(422).send('Error: provide two numbers!')
})

//// GET request for teapot URL
app.get('/teapot', (req, res) => {
  res.status(418).send(true)
})

//// POST request for Yes or No response
app.post('/teapot', (req, res) => {
  if (req.body.areYouATeapot === true){
    res.status(418).send({ amIATeapot: 'yes'})
  } else {
    res.status(200).send({ amIATeapot: 'no'})
  }
})



// error handler
app.use(errorHandler)

module.exports = app
