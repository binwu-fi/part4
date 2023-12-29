const mongoose = require('mongoose')

if (process.argv.length <3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `TARKISTA TÄMÄ`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'kokkikoulun blog',
    author: 'Olavi Virtanen',
    url: 'www.hs.fi',
    likes: 15
})

Blog.find({}).then(result => {
    result.forEach(blog => {
        console.log(blog)
    })
    mongoose.connection.close()
})