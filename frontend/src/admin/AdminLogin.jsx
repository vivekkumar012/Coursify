import React, { useState } from 'react'
import logo from "../../public/logo.webp"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const[errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/v1/admin/signin", {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log("Sigin Successfull", response.data);
      toast.success(response.data.message);
      navigate("/admin/dashboard")
      //localStorage.setItem("user", JSON.stringify(response.data.token));
      localStorage.setItem("admin", JSON.stringify({
        token: response.data.token,
        user: response.data.user
      }));
      
    } catch (error) {
      if(error.response) {
        setErrorMessage(error.response.data.errors || "Error in Signin")
      }
    }
  }
  return (
    <div className='bg-gradient-to-r from-black to-blue-950 h-screen'>
      <div className='items-center flex justify-center h-screen text-white container mx-auto'>
        {/* Header */}
        <header className='absolute top-0 left-0 w-full flex items-center justify-between p-5'>
          <div className='flex items-center space-x-2'>
            <img src={logo} alt="" className='h-10 w-10 rounded-full'/>
            <Link to={"/"} className='text-2xl font-bold text-orange-500'>Coursify</Link>
          </div>
          <div className='flex items-center space-x-4'>
              <Link to={"/admin/signup"} className='bg-transparent border border-gray-500 rounded-md py-2 px-4'>Signup</Link>
              <Link to={"/courses"} className='bg-orange-500 rounded-md py-2 px-4'>Join now</Link>
          </div>
        </header>

        {/* Login Form */}
        <div className='bg-gray-900 w-[500px] rounded-lg shadow-lg p-8 mt-20'>
          <h2 className='text-2xl font-bold text-center mb-4'>
            Welcome to <span className='text-orange-500'>Coursify</span>
          </h2>
          <p className='text-center text-gray-400 mb-6'>Login to access the admin dashboard</p>

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor="email" className='text-gray-400 mb-2'>Email</label>
              <input 
                type="text" 
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='name@gmail.com'
                required
                className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="password" className='text-gray-400 mb-2'>Password</label>
              <input 
                type="text" 
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='******'
                required
                className='w-full rounded-md bg-gray-800 border border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}

            <button type='submit' className='w-full bg-orange-500 py-3 px-6 hover:bg-blue-600 text-white rounded-md transition'>
                 Signin
            </button>   
        </form>
        </div>
        
      </div>
    </div>
  )
}

export default AdminLogin
