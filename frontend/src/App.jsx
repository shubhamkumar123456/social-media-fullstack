import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { setupInterceptors } from "./api/axiosInstance"
import { useEffect } from "react"
import { fetchUserDetails } from "./features/authSlice"
import LoaderComponent from "./components/LoaderComponent"
import ForgetPassword from "./pages/ForgetPassword"
import UserProfile from "./pages/UserProfile"
import FriendProfile from './pages/FriendProfile'
import ChatPage from "./pages/ChatPage"
import { io } from "socket.io-client";

const socket = io("http://localhost:8080",{transports:['websocket']});

function App() {
  const dispatch = useDispatch();

  let authSlice = useSelector((state)=>state.auth);
  let login = authSlice.login;
  // console.log(login)

  useEffect(() => {
      setupInterceptors(dispatch);
  }, [dispatch]);


  useEffect(()=>{
    // console.log("i am running inside useEffect")
     if(authSlice.token){
      dispatch(fetchUserDetails())
     }
  },[authSlice.token])


  useEffect(()=>{
    socket.emit('msg','hello how are you')
  },[])

  useEffect(()=>{
    socket.on('fire',({msg})=>{
      console.log(msg)
    })
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="mt-[70px]">
        {authSlice.loading &&<LoaderComponent/>}
          <Routes>
            <Route path="/" element={login===true ? <Home /> : <Navigate to={'/login'}/>} />
            <Route path="/login" element={login===false ? <Login /> : <Navigate to='/'/>} />
            <Route path="/signup" element={login ===false? <Signup /> : <Navigate to='/'/>} />
            <Route path="/forget-password" element={login ===false? <ForgetPassword /> : <Navigate to='/'/>} />
            <Route path="/userProfile"  element = {login===true?<UserProfile/>:<Navigate to={'/login'}/>}/>
            <Route path="/friendProfile"  element = {login===true?<FriendProfile/>:<Navigate to={'/login'}/>}/>
            <Route path="/chat"  element = {login===true?<ChatPage/>:<Navigate to={'/login'}/>}/>
          </Routes>
        </main>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
