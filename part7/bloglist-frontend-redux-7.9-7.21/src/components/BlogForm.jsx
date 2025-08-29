import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            data-testid="title"
            onChange={({ target }) => {
              setTitle(target.value)
            }}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            data-testid="author"
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            data-testid="url"
            onChange={({ target }) => {
              setUrl(target.value)
            }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
export default BlogForm
