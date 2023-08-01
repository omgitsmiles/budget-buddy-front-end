import React, { useState, useEffect } from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import LoginTest from './LoginTest'
import Home from './Home'
import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
    const location = useLocation()
    const [user, setUser] = useState([])
  console.log(user)
  useEffect(() => {
    fetch("/check_session")
    .then((r) => r.json())
    .then(res => {
      if (res.ok){
        console.log('res', res)
        res.json().then(setUser)
      } else{
        console.log(res)
      }
    })    
  }, [])


  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route exact path='/' element={<Landing setUser={setUser}/>}/>
            <Route exact path='/login-test' element={<LoginTest setUser={setUser}/>}/>
            <Route exact path='/home' element={<Home setUser={setUser} user={user}/>}/>
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes