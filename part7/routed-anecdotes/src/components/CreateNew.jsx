
import PropTypes from 'prop-types'
import { useField } from '../hooks'


const CreateNew = (props) => {
  const content = useField('text')
  const author  = useField('text') 
  const info = useField('text')
  const resetInput = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetInput}>reset</button>
    </div>
  )
}
export default CreateNew
CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
}