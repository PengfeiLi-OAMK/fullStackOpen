import PropTypes from 'prop-types'
const Notification = ({ message }) => {
  if (!message||message==='') return null
  return <div>{message}</div>
}
export default Notification
Notification.propTypes = {
  message: PropTypes.string,
}
