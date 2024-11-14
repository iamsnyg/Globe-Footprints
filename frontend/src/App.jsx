import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import React from 'react'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Home from './home/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signUp" exact element={<SignUp />} />

      </Routes>
    </Router>
  )
}

// const Root=()=>{
//  const isAuthanticated=!!localStorage.getItem('token')

//  return(
//     <Routes>
//       <Route path="/" element={isAuthanticated?<Navigate to="/dashboard"/>:<Navigate to="/login"/>}/>
//       <Route path="*" element={<Navigate to="/"/>}/>
//     </Routes>

    
//  )
// }

const Root=()=>{
  const isAuthanticated=!!localStorage.getItem('token')

  return isAuthanticated?(
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to="/login"/>
  )
}

export default App