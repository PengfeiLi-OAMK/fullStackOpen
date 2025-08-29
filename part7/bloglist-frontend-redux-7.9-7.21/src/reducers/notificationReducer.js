import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  message: null,
  className: null,
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNoti(state, action) {
      return action.payload
    },
    clearNoti() {
      return initialState
    },
  },
})
export const setNotification = (message, className, time) => {
  return async (dispatch) => {
    dispatch(setNoti({ message, className }))
    setTimeout(() => {
      dispatch(clearNoti())
    }, time * 1000)
  }
}
export const { setNoti, clearNoti } = notificationSlice.actions
export default notificationSlice.reducer
