import { useState } from 'react'
import TaskList from './components/TaskList'
import { Route, Routes } from 'react-router-dom'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
function App() {
  return (
    <Routes>
      <Route index element={<Tasks />}/>
      <Route path="login" element={<Login />}/>
    </Routes>
  )
}

export default App
