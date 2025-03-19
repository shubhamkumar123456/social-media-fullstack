import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { ToastContainer } from 'react-toastify'
import { useDispatch } from "react-redux"
import { setupInterceptors } from "./api/axiosInstance"
import { useEffect } from "react"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      setupInterceptors(dispatch);
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="h-[calc(100vh-65px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
