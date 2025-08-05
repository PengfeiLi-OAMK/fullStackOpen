const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const assert = require('node:assert')

describe('when there is initially some notes saved', () => {

  let token

  beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    const loginResponse= await api 
      .post('/api/login')
      .send({username: 'root', password:'sekret'})
    
    token= loginResponse.body.token
  })
  describe('retrieving all blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    test('a specific blog is within the returned notes', async () => {
      const response = await api.get('/api/blogs')
  
      const urls = response.body.map((e) => e.url)
      assert(urls.includes('http://localhost:3003/api/blogs/3'))
    })
})

  test('the unique identifier property of the blog is named id, not _id', async () => {
    const newBlog = new Blog({
      title: 'Test blog',
      author: 'Tester',
      url: 'http://localhost:3003/api/blogs/1001',
      likes: 40,
      user: '688fae89befc14bbd677ded2',
    })
    const savedBlog = await newBlog.save()
    const blogObject = savedBlog.toJSON()
    assert(blogObject.id)
    assert.strictEqual(blogObject._id,undefined)
  })
  
  describe('addition of a new note', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Test blog',
        author: 'Tester',
        url: 'http://localhost:3003/api/blogs/1001',
        likes: 40,
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual( blogsAtEnd.length, helper.initialBlogs.length + 1)
      const urls = blogsAtEnd.map((e) => e.url)

      assert(urls.includes(newBlog.url))
    })
    
    test('a blog without token will be responded with 401 and not saved', async () => {
      const newBlog = {
        title: 'Test blog',
        author: 'Tester',
        url: 'http://localhost:3003/api/blogs/1001',
        likes: 40,
      }
      
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
      assert.match(response.body.error, /token/i)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('a blog without likes will default to the value 0', async () => {
      const newBlog={
		    title: 'Test blog',
		    author: 'Tester',
		    url: 'http://localhost:3003/api/blogs/1002',
	    }

      const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
 
      assert.strictEqual(addedBlog.body.likes, 0)

    })

    test('a blog without title will be responded with 400', async () => {
      const newBlog={
		    author: 'Tester',
		    url: 'http://localhost:3003/api/blogs/1002',
		    likes:40
	    }
	    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

	    assert.match(response.body.error, /title/i)
    })

    test('a blog without url will be responded with 400', async () => {
      const newBlog = {
        title: 'No URL blog',
        author: 'Tester',
        likes: 50,
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      assert.match(response.body.error, /url/i)
    })
  })

 describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
      const blogsAtEnd = await helper.blogsInDb()
      const ids = blogsAtEnd.map((blog) => blog.id)
      assert(!ids.includes(blogToDelete.id))

    })
 })
 describe('update of a blog', () => {
    test('succeeds with updated likes',async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updatedLikes = blogToUpdate.likes + 1
      blogToUpdate.likes = updatedLikes
      
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
      const blogsAtEnd = await helper.blogsInDb()
      assert(blogsAtEnd[0].likes === updatedLikes)
    })
    test('fails with status code 404 if blog does not exist', async () => {
      const nonExistentId = await helper.nonExistingId()
      const updateData = { likes: 10 }
      await api
        .put(`/api/blogs/${nonExistentId}`)
        .send(updateData)
        .expect(404)
    })
    test('fails with 400 if likes field is missing from update', async () => {
      const blogs = await helper.blogsInDb()
      const blogToUpdate = blogs[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({}) 
        .expect(400)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})