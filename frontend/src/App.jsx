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

function App() {
  const dispatch = useDispatch();

  let authSlice = useSelector((state)=>state.auth);
  let login = authSlice.login;
  console.log(login)

  useEffect(() => {
      setupInterceptors(dispatch);
  }, [dispatch]);


  useEffect(()=>{
    console.log("i am running inside useEffect")
     if(authSlice.token){
      dispatch(fetchUserDetails())
     }
  },[authSlice.token])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="h-[calc(100vh-65px)]">
        {authSlice.loading &&<LoaderComponent/>}
          <Routes>
            <Route path="/" element={login===true ? <Home /> : <Navigate to={'/login'}/>} />
            <Route path="/login" element={login===false ? <Login /> : <Navigate to='/'/>} />
            <Route path="/signup" element={login ===false? <Signup /> : <Navigate to='/'/>} />
            <Route path="/forget-password" element={login ===false? <ForgetPassword /> : <Navigate to='/'/>} />
          </Routes>
        </main>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
