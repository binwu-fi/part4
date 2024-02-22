const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')

const blogScheme = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true
  },
  author: {
    type: String,
    minlength: 1,
    required: true
  },
  url: {
    type: String,
    minlength: 1,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
/*
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs :[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)
*/
blogScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogScheme)