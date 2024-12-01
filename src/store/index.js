import { configureStore } from '@reduxjs/toolkit'
import Authreducer from "../slices/slice"
import eventReducer from "../slices/eventslice"

export const store = configureStore({
  reducer: {
    auth: Authreducer,
    events: eventReducer,

  },
  
})