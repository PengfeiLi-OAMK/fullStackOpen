import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Notification from './Notification'

const Home = () => {
  const blogFormRef = useRef()
  const closeBlogForm = () => blogFormRef.current?.toggleVisibility()

  return (
    <>
      <Notification />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm onSuccess={closeBlogForm} />
      </Togglable>
      <BlogList />
    </>
  )
}
export default Home
