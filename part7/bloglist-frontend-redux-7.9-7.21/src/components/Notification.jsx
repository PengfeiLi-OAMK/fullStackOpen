import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.message === null) {
    return null
  }
  const variant = notification.className === 'error' ? 'danger' : 'success'
  return (
    <Alert variant={variant} className="my-2">
      {notification.message}
    </Alert>
  )
}
export default Notification
