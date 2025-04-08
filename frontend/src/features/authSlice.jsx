import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../api/axiosInstance';


let userDetails = JSON.parse(localStorage.getItem('authSocial'));


export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async () => {
    const response = await axiosInstance.get('/users/loggedInUser')
    return response.data
  },
)

const initialState = {
  user:'',
  token:userDetails? userDetails.token:'',
  loading:false,
  login:userDetails?userDetails.login : false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setLogin:(state,action)=>{
      localStorage.setItem('authSocial',JSON.stringify({token:action.payload.token, login:true}))
        state.login = action.payload.login;  
        state.user = action.payload.user;  
        state.token = action.payload.token;  
    },
  
   updateLoading:(state,action)=>{
    state.loading = action.payload
   },
   logoutUser :(state,action)=>{
    localStorage.removeItem('authSocial');
    state.login = false;
    state.user='';
    state.token = ''
   }
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      // console.log(action)
        state.user = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { updateLoading,setLogin,logoutUser } = authSlice.actions

export default authSlice.reducer