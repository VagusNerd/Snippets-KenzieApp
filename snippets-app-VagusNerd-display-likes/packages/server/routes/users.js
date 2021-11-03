import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models'

const router = express.Router()

router
  .route('/:id')
  .get(async (request, response) => {
    const populateQuery = [
      {
        path: 'posts',
        populate: { path: 'author', select: ['username', 'profile_image'] },
      },
    ]

    const user = await User.findOne({ username: request.params.id })
      .populate(populateQuery)
      .exec()
    if (user) {
      response.json(user.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .put(async (request, response) => {

    const { current_password, password, confirm_password, profile_image } = request.body
    const { id } = request.params

    
    const user = await User.findById(id)

    if (profile_image) {
      try {
        const userUpdate = await User.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            profile_image,
          },
          {
            new: true,
          }
          )
          response.json(userUpdate.toJSON())
          return
      } catch (error) {
        response.status(404).end()
      }
    }

    if (confirm_password !== password) {
      return response.status(401).send("Passwords do not match!")
    }

    if (password.length<8 || password.length >20){
      return response.status(401).send("Password length must be between 8 and 20 characters.")
    }
 
    const passwordCorrect = await bcrypt.compare(current_password, user.passwordHash)

    if (!passwordCorrect){
      response.status(401).send("Passwords do not match!")
    }


    if (passwordCorrect){
      const hashedpassword = await bcrypt.hash(password, 12)      
      try {
        const userUpdate = await User.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            passwordHash: hashedpassword,
          },
          {
            new: true,
          }
          )
          response.json(userUpdate.toJSON())
      } catch (error) {
          response.status(404).end()
      }
    } 
})

module.exports = router
