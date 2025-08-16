import { useState } from 'react'
const Blog = ({ blog, addLikes, user, onDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const canDelete = user && user.id === blog.user.id
  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    addLikes(updatedBlog)
  }

  return (
    <div style={blogStyle} className="blog">
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </p>
      {visible && (
        <>
          <p>{blog.url}</p>
          <p>{blog.likes} likes</p>
          <button onClick={handleLike}>like</button>
          <p>added by {blog.user.username}</p>
          {canDelete && <button onClick={() => onDelete(blog)}>remove</button>}
        </>
      )}
    </div>
  )
}

export default Blog
