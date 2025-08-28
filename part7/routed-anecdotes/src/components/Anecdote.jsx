import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  return (
	<div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
	</div>
  )
}
export default Anecdote
Anecdote.propTypes = {
  anecdotes: PropTypes.array.isRequired,
}