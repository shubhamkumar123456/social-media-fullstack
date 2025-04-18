import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import  socketSlice  from '../features/socketSlice'
export const store = configureStore({
  reducer: {
    auth:authSlice,
    socket:socketSlice
  },
})