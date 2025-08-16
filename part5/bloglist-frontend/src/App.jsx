import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './index.css'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setClassName('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const createNewBlog = async (blogData) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.create(blogData)
    setBlogs((pre) => pre.concat(createdBlog))
    setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    setClassName('added')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addLikes = async (updatedBlog) => {
    const returnedBlog = await blogService.update(updatedBlog)
    setBlogs(
      blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
    )
    console.log(returnedBlog)
    return returnedBlog
  }
  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  const blogList = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return (
      <>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLikes={addLikes}
            user={user}
            onDelete={deleteBlog}
          />
        ))}
      </>
    )
  }

  return (
    <div>
      {user === null && (
        <>
          <h2>log in to application</h2>
          <Notification message={message} className={className} />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </>
      )}
      {user !== null && (
        <>
          <h2>blogs</h2>
          <Notification message={message} className={className} />
          <p>
            {user.username} logged in
            <button onClick={logout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createNewBlog={createNewBlog} />
          </Togglable>
          {blogList()}
        </>
      )}
    </div>
  )
}

export default App
