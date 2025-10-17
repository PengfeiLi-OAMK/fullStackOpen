import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import { addLikes, deleteBlog, addComment } from '../reducers/blogReducer'

const BlogPage = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const canDelete = user && user.id === blog.user.id
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, blogs.length])
  if (!blog) {
    return null
  }
  const handleLike = () => {
    dispatch(addLikes(blog))
  }
  const handleDelete = () => {
    dispatch(deleteBlog(blog))
    navigate('/')
  }
  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(addComment(blog.id, comment))
    event.target.comment.value = ''
  }
  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {canDelete && <button onClick={handleDelete}>remove</button>}

      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input type="text" name="comment" />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments?.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
    </>
  )
}
export default BlogPage
