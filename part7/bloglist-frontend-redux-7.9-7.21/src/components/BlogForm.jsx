// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ onSuccess }) => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    const blogData = { title, author, url }
    dispatch(createBlog(blogData))
    onSuccess?.()
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input type="text" name="title" data-testid="title" />
        </div>
        <div>
          author
          <input type="text" name="author" data-testid="author" />
        </div>
        <div>
          url
          <input type="text" name="url" data-testid="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
export default BlogForm
