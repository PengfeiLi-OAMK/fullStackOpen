import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)
export default AnecdoteList
AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired,
}