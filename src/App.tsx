import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Answers from "./components/Answers"
import AboutUs from "./components/about"
//import EmailSignup from "./components/EmailSignup"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/main" element={<Main/>} />
      <Route path="/answers" element={<Answers/>}/>
      <Route path="/about" element={<AboutUs />} />
      
        
    </Routes>
    </>
  )
}

export default App