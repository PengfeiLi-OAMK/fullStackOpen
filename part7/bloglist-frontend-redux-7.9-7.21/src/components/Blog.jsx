// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { addLikes, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    // border: 'solid',
    // borderWidth: 1,
    marginBottom: 5,
  }
  // const [visible, setVisible] = useState(false)
  // const canDelete = user && user.id === blog.user.id
  // const dispatch = useDispatch()

  return (
    <div style={blogStyle} className="blog">
      <p>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        {/* <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button> */}
      </p>
    </div>
  )
}

export default Blog
