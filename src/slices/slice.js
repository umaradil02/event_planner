import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading:true,
  logdinuser:null,

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
    },
    logout(state)  {
      state.logdinuser = null
    },
  },
})
export const { inital,login,logout } = authSlice.actions

export default authSlice.reducer