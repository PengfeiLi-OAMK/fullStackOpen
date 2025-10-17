import { useEffect } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import './index.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import BlogPage from './components/BlogPage'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  // const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="container">
      {/* {user === null && (
        <>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
        </>
      )} */}
      {user !== null && (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  href="#"
                  as="span"
                  className="d-flex align-items-center"
                >
                  <Link to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link
                  href="#"
                  as="span"
                  className="d-flex align-items-center"
                >
                  <Link to="/users">users</Link>
                </Nav.Link>
                {user ? (
                  <Nav.Link as="span" className="d-flex align-items-center">
                    <strong className="text-white me-2">
                      {user.username} logged in
                    </strong>
                    <button
                      onClick={logout}
                      className="btn btn-sm btn-outline-light"
                    >
                      logout
                    </button>
                  </Nav.Link>
                ) : (
                  <Nav.Link href="#" as="span">
                    <Link style={{ padding: '0 5px' }} to="/login">
                      login
                    </Link>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <h1>blogs</h1>
          {/* <p>
            {user.username} logged in
            <button onClick={logout}>logout</button>
          </p> */}

          {/* <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm onSuccess={closeBlogForm} />
          </Togglable>
          <BlogList user={user} /> */}
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
          // element={user ? <Users /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginForm />}
        />
        <Route
          path="/users/:id"
          element={user ? <User /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/blogs/:id"
          element={user ? <BlogPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  )
}

export default App
