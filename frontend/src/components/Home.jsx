import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../public/logo.webp'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Home() {
  return (
    <div className='bg-gradient-to-r from-black to-blue-950 h-screen'>
      <div className='h-screen text-white container mx-auto'>
         {/* Navbar */}
         <header className='flex items-center justify-between p-6'>
            <div className='flex items-center space-x-2'>
              <img src={logo} alt="" className='h-10 w-10 rounded-full'/>
              <h1 className='text-2xl font-bold text-orange-500'>Coursify</h1>
            </div>
            <div className='space-x-4'>
              <Link to={"/signin"} className='bg-transparent text-white border border-white rounded py-2 px-4'>Login</Link>
              <Link to={"/signup"} className='bg-transparent text-white border border-white rounded py-2 px-4'>Signup</Link>
            </div>
         </header>

         {/* Main Section */}
         <section className='text-center py-20'>
           <h1 className='text-4xl font-semibold text-orange-500'>Welcome to Coursify</h1>
           <br />
           <p className='text-gray-500'>Sharpen your Skills with these Courses</p>
           <div className='space-x-4 mt-8'>
             <button className='bg-green-500 text-white rounded py-3 px-6 font-semibold hover:bg-white duration-300 hover:text-black'>Explore Courses</button>
             <button className='bg-white text-black rounded py-3 px-6 font-semibold hover:bg-green-500 duration-300 hover:text-white'>Courses Videos</button>
           </div>
         </section>

         <section>Section2</section>

         {/* Footer Section */}
         <footer>
           <div className='grid grid-cols-1 md:grid-cols-3'> 
              <div className='flex flex-col items-center md:items-start'>
                <div className='flex items-center space-x-2'>
                  <img src={logo} alt="" className='h-10 w-10 rounded-full'/>
                  <h1 className='text-2xl font-bold text-orange-500'>Coursify</h1>
                </div>
                <div className='mt-3 ml-2 md:ml-8'>
                  <p className='mb-2'>Follow us</p>
                  <div className='flex space-x-4'>
                    <a href=""><FaFacebook className='text-2xl hover:bg-blue-500 duration-300' /></a>
                    <a href=""><FaInstagram className='text-2xl hover:bg-pink-500 duration-300' /></a>
                    <a href=""><FaTwitter className='text-2xl hover:bg-blue-500 duration-300' /></a>
                  </div>
                </div>
              </div>
              
              <div className='items-center flex flex-col'>
                <h3 className='font-semibold mb-3 text-lg'>Connects</h3>
                <ul className='space-y-2 text-gray-400'>
                  <li className='hover:text-white cursor-pointer duration-300'>YouTube- learn coding</li>
                  <li className='hover:text-white cursor-pointer duration-300'>Telegram- learn coding</li>
                  <li className='hover:text-white cursor-pointer duration-300'>GitHub- learn coding</li>
                </ul>
              </div>
              <div>right</div>
           </div>
         </footer>
      </div>
    </div>
  )
}

export default Home
