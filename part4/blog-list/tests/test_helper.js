const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
  "title": "Autumnday",
  "author": "Jane",
  "url": "http://localhost:3003/api/blogs/2",
  "likes": 10,
  "user": "688fae89befc14bbd677ded2"
  },
  {
  "title": "summerday",
  "author": "John",
  "url": "http://localhost:3003/api/blogs/3",
  "likes": 20,
  "user": "688fae89befc14bbd677ded2"
  }
]
const nonExistingId = async () => {
  const blog = new Blog({ 
  title: "Delete blog",
  author: "Jane",
  url: "http://localhost:3003/api/blogs/0",
  likes: 0
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}