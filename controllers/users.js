const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 }) //4.17 populate added
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  /*
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
  */
  //check if password length is 3 or more, 4.16 exercise
  if (request.body.password.length < 3) {
    response.status(400).json({ error: 'Passwor is to short, minimum length is 3 letter' })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

    const user = new User({
      username: request.body.username,
      name: request.body.name,
      password: passwordHash,
      blogId: request.body.blogId //added for 4.19 but not help anything
    })

    try {
      const savedUser = await user.save()
      response.json(savedUser.toJSON())
    } catch (error) {
      response.status(400).json({ error: error })
    }
  }

})

module.exports = usersRouter