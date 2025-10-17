import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map((blog) => (blog.id !== id ? blog : action.payload))
    },
  },
})
export const addLikes = (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }
  return async (dispatch) => {
    const returnedBlog = await blogService.update(updatedBlog)
    dispatch(updatedBlog(returnedBlog))
  }
}
export const addComment = (id, comment) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.addComment(id, comment)
    dispatch(updateBlog(returnedBlog))
  }
}
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
    }
  }
}
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
    dispatch(
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'added',
        5
      )
    )
  }
}
export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
