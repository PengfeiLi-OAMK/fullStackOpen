const blogsRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const creator = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: creator._id,
  })

  newBlog = await blog.save()
  response.status(201).json(newBlog)

  // blog.save().then((result) => {
  //   response.status(201).json(result)
  // })
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const useRequestDelete = request.user

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    if (useRequestDelete._id.toString() !== blog.user.toString()) {
      return response
        .status(401)
        .json({ error: 'unauthorized to delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  if (likes === undefined) {
    return response.status(400).json({ error: 'likes field is required' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = likes
  const updatedBlog = await blog.save()

  return response.json(updatedBlog)
})

module.exports = blogsRouter
