import { configureStore } from '@reduxjs/toolkit'
import Authreducer from "../slices/slice"

export const store = configureStore({
  reducer: {
    auth: Authreducer,
  },
})