const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

//getter that gives whole bloglsit
/*
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})
*/
//refactor to await async 4.8
blogsRouter.get('/', async (request, response) =>  {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

/*
blogsRouter.get('/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
*/
//*refactor to await async 4.8
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

/*
blogsRouter.post('/', (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  // added for 4.11
  if (blog.likes === 'undefined' || blog.likes === null) {
    blog.likes = 0
  }
  // addef for 4.11 ended
  blog.save().then(savedBlog => {
    response.status(201).json(savedBlog) //changed for 4.10
  })
    .catch(error => next (error))
})
*/
//*refactor to await async 4.8
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })
  if (typeof blog.likes === 'undefined' || blog.likes === null) {
    blog.likes = 0
  }
  if (typeof blog.title === 'undefined' ||  blog.title === null || typeof blog.url === 'undefined' || blog.title === null) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

/*
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
*/
//*refactor to await async 4.8
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

/*
blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})
*/
//*refactor to await async 4.8
blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes
  }
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(result.toJSON())
  } catch (error) {
    response.status(400).end()
  }
})
module.exports = blogsRouter