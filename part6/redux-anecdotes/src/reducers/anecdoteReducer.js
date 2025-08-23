import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVote(state, action) {
      const votedAnecdote = action.payload
      return state.map((anecdote) =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const addVote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(id)
    dispatch(increaseVote(updatedAnecdote))
  }
}

export const { increaseVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
//       const votedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1,
//       }
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : votedAnecdote
//       )
//     }
//     case 'CREATE':
//       return [...state, action.payload]

//     default:
//       return state
//   }
// }
// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id },
//   }
// }
// export const createAnecdote = (content) => {
//   return {
//     type: 'CREATE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0,
//     },
//   }
// }
// export default anecdoteReducer
