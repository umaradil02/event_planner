import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading:true,
  logdinuser:null,
  // userRole:"user",

}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    inital(state){
      state.loading = false
    },
    login(state,action) {
      state.logdinuser = action.payload
      // state.userRole = action.payload.role
    },
    logout(state)  {
      state.logdinuser = null
      state.userRole = "user"
    },
  },
})
export const { inital,login,logout } = authSlice.actions

export default authSlice.reducer