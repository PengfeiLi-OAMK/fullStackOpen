import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const credentials = { username, password }
    dispatch(loginUser(credentials))
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <>
      <h2>log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            // id="username"
            name="username"
            data-testid="username"
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          {/* <label htmlFor="password">Password</label> */}
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            // id="password"
            name="password"
            data-testid="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
