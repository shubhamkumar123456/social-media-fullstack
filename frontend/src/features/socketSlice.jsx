import { createSlice } from '@reduxjs/toolkit'
import socket from '../api/socketInstance';

const initialState = {
    isConnected:false
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectSocket:(state,action)=>{
        if(!state.isConnected){
            const userId = action.payload;
            socket.connect();
            socket.emit('newUser',userId);
            state.isConnected = true
        }
    },
    disconnectSocket:(state,action)=>{
        if(state.isConnected){
            socket.disconnect();
            state.isConnected = false
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { connectSocket, disconnectSocket } = socketSlice.actions

export default socketSlice.reducer

export {
    socket
}