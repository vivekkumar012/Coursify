import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';
import Courses from './components/Courses'
import Buy from './components/Buy'
import Purchases from './components/Purchases'
import AdminSignup from './admin/AdminSignup'
import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import CourseCreate from './admin/CourseCreate'
import UpdateCourse from './admin/UpdateCourse'
import OurCourses from './admin/OurCourses'

function App() {

  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;

  const userData = localStorage.getItem("userToken");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/buy/:courseId' element={<Buy />} />
          <Route path='/purchases' element={user ? <Purchases /> : <Navigate to={"/signin"} />} />

          {/* Admin Routes */}
          <Route path='/admin/signup' element={<AdminSignup />} />
          <Route path='/admin/signin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={admin ? <Dashboard /> : <Navigate to={"/admin/signin"} />} />
          <Route path='/admin/create-course' element={<CourseCreate />} />
          <Route path='/admin/update-course/:id' element={<UpdateCourse />} />
          <Route path='/admin/our-courses' element={<OurCourses />} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App
