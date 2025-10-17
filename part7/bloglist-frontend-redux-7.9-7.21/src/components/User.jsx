import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'

const User = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)
  const dispatch = useDispatch()
  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers())
    }
  }, [dispatch, users.length])
  if (!user) {
    return null
  }
  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}
export default User
