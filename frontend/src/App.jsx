import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
