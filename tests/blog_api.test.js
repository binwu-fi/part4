const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper') //add at 4.13
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

//const intialBlogs refactor to /tests/test_helper.js (4.13)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  //exercise 4.8 start
  test('all blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  //exercise 4.8 end
})

describe('viewing a specific blog', () => {
//exercise 4.9 start
  test('all blogs id are defined', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body[0].id)
    expect(response.body[0].id).toBeDefined()
  })
  //exercise 4.9 end

  //exercise 4.12 start
  test ('if title and ulr empty then send bad request', async () => {
    const newBlog = {
      author: 'Matti Mäkinen',
      likes: 2
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      //.expect(201)
      //.expect('content-Type', /application\/json/)

    expect(response.status).toBe(400)
    console.log('response: ', response.status)
  })
  //exercise 4.12 end
})

describe('addition of a new note', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  //exercise 4.10 start
  //blogs.js note Router.post() changed
  test ('a valid blog can be added and length grow by 1', async () => {
    const newBlog = {
      title: 'Suomi24',
      author: 'Matti Mäkinen',
      url: 'www.suomi.fi',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('content-Type', /application\/json/)

    //const response = await api.get('/api/blogs')
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(r => r.title)
    expect(title).toContain('Suomi24')

    //const titles = response.body.map(r => r.title)

    //expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    //expect(titles).toContain('Suomi24')
    //console.log('tarkistus: ', titles)
    //exercise 4.10 end
  })

  //exercise 4.11 start
  test ('set not define likes to zero', async () => {
    const newBlog = {
      title: 'Suomi24',
      author: 'Matti Mäkinen',
      url: 'www.suomi.fi',
      //likes: 3
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    console.log('tarkistus: ', response.likes)
    //console.log('uusi blogi: ', newBlog)
  })
  //exercise 4.11 end

})

describe ('deletion and modification of blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  //exercise 4.13 start
  test ('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)

  })
  //exercise 4.13 end

  //exercise 4.14 start
  test ('modify a blog', async () => {
    const result = await api.get('/api/blogs')
    const content = await result.body
    const idToUpdate = content[0].id

    const updateLikes = { likes: 10 }
    const updatedBlog = await api
      .put((`/api/blogs/${idToUpdate}`))
      .send(updateLikes)
      .expect(200)

    expect(updatedBlog.body.likes).toBe(10)
  })
  //exercise 4.14 end

  //exercise 4.15 start
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tptestaaja',
      name: 'Teppo Testaaja',
      password: 'salainenjuttu'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

//exercise 4.15 end
})



afterAll(async () => {
  await mongoose.connection.close()
})