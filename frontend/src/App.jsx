import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {


  return (
    <>
      <BrowserRouter>
          <Navbar/>
         <main className="h-[calc(100vh-65px)]">
         <Routes>
              <Route path="/"  element={<Home/>}/>
              <Route path="/login"  element={<Login/>}/>
              <Route path="/signup"  element={<Signup/>}/>
          </Routes>
         </main>
      </BrowserRouter>
    </>
  )
}

export default App
