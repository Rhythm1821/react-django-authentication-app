import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About'
import { Route, Routes, useLocation } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const location = useLocation()
  const noNavbar = location.pathname === '/register' || location.pathname === '/'

  return (
    <>
      {
        noNavbar ? 
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        :
        <Navbar 
          content={
            <Routes>
              <Route element={<ProtectedRoutes />}>
                  <Route path='/home' element={<Home />} />
                  <Route path='/about' element={<About />} />
              </Route>
            </Routes>
          }
      />
      }
      
    </>
  )
}

export default App
