const mongoose = require('mongoose')

if (process.argv.length <3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://binwufi:${password}@cluster0.hwvcrac.mongodb.net/blogInfo?retryWrites=true&w=majority`

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

//kokeilu 6.1.2024
blog.save().the(result => {
    console.log("blog saved!")
    mongoose.connection.close()
})

Blog.find({}).then(result => {
    result.forEach(blog => {
        console.log(blog)
    })
    mongoose.connection.close()
})