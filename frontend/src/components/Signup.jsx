import React, { useState } from 'react'
import logo from '../../public/logo.webp'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Signup() {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const[errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/v1/user/signup", {
        firstname,
        lastname,
        email,
        password,
      },{
        withCredentials: true,
        headers:{
          "Content-Type": "application/json"
        }
      })
      console.log("SignUp Successfully: ", response.data);
      alert(response.data.message);
    } catch (error) {
      if(error.response) {
        alert(error.response.data.errors);
        setErrorMessage(error.response.data.errors || "Signup failed!!!");
      }
    }
  }

  return (
    <div className='bg-gradient-to-r from-black to-blue-950 h-screen'>
      <div className='h-screen container mx-auto flex items-center justify-center text-white'>
        {/* Header */}
        <header className='absolute top-0 left-0 w-full flex items-center justify-between p-5'>
            <div className='flex items-center space-x-2'>
              <img src={logo} alt="" className='h-10 w-10 rounded-full'/>
              <Link to={"/"} className='text-2xl font-bold text-orange-500'>Coursify</Link>
            </div>
            <div className='flex items-center space-x-4'>
              <Link to={"/signin"} className='bg-transparent border border-gray-500 rounded-md py-2 px-4'>Login</Link>
              <Link to={"/courses"} className='bg-orange-500 rounded-md py-2 px-4'>Join now</Link>
            </div>
         </header>
         {/* SignUp Form */}
         <div className='bg-gray-900 p-8 rounded-lg shadow-lg w-[500px] mt-20'>
          <h2 className='text-2xl font-bold mb-4 text-center'>
            Welcome to <span className='text-orange-500'>Coursify</span>
          </h2>
          <p className='text-center text-gray-400 mb-6'>Just Signup to join Us!</p>

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor="firstname" className='text-gray-400 mb-2'>Firstname</label>
              <input
               type="text" 
               id='firstname' 
               value={firstname}
               onChange={(e) => setFirstName(e.target.value)}
               placeholder='Type Your First Name' 
               className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            </div>
            <div className='mb-4'>
              <label htmlFor="lastname" className='text-gray-400 mb-2'>Lastname</label>
              <input 
                type="text" 
                id='lastname' 
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Type Your Last Name' 
                className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            </div>
            <div className='mb-4'>
              <label htmlFor="email" className='text-gray-400 mb-2'>Email</label>
              <input 
                type="text" 
                id='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='name@gmail.com' 
                required 
                className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            </div>
            <div className='mb-4'>
              <label htmlFor="password" className='text-gray-400 mb-2'>Password</label>
              <input 
                type="password" 
                id='password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='********' 
                required 
                className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <button type='submit' className='w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition'>
              Signup
            </button>
          </form>
         </div>
      </div>
    </div>
  )
}

export default Signup
