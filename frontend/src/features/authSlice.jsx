import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:'',
  token:'',
  loading:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  
   updateLoading:(state,action)=>{
    state.loading = action.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const { updateLoading } = authSlice.actions

export default authSlice.reducer