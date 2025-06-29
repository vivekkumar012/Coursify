import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../public/logo.webp'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from 'axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from 'react-hot-toast';

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if(token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  }, [])

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/v1/user/logout", {
        withCredentials: true
      })
      toast.success(response.data.message); 
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);

    } catch (error) {
      console.log("Error in Logout", error)
      toast.error(error.response.data.errors || "Error in Logout")
    }
  }
 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/course/courses", {
          withCredentials: true
        });
        console.log(response.data.course);
        setCourses(response.data.course);
      } catch (error) {
        console.log("Error in fetch courses in home page", error);
      }
    };
    fetchCourses();
  }, [])

  //Setting code for slider
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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
              
              {isLoggedIn ? (
                <button onClick={handleLogout} className='bg-transparent text-white border border-white rounded py-2 px-4' >
                  Logout
                </button>
              ) : (<>
                  <Link to={"/signin"} className='bg-transparent text-white border border-white rounded py-2 px-4'>Login</Link>
                  <Link to={"/signup"} className='bg-transparent text-white border border-white rounded py-2 px-4'>Signup</Link>
                  </>
              )}
            </div>
         </header>

         {/* Main Section */}
         <section className='text-center py-20'>
           <h1 className='text-4xl font-semibold text-orange-500'>Welcome to Coursify</h1>
           <br />
           <p className='text-gray-500'>Sharpen your Skills with these Courses</p>
           <div className='space-x-4 mt-8'>
             <Link to={"/courses"} className='bg-green-500 text-white rounded py-3 px-6 font-semibold hover:bg-white duration-300 hover:text-black'>Explore Courses</Link>
             <Link className='bg-white text-black rounded py-3 px-6 font-semibold hover:bg-green-500 duration-300 hover:text-white'>Courses Videos</Link>
           </div>
         </section>

         <section>
            <Slider {...settings}>
               {courses.map((course) => (
                 <div key={course._id} className='p-4'>
                   <div className='relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105'>
                     <div className='bg-gray-900 rounded-lg overflow-hidden'>
                       <img className='h-32 w-full object-contain' src={course.image.url} alt="" />
                       <div className='p-6 text-center'>
                         <h2 className='text-xl font-bold text-white'>{course.title}</h2>
                         <button className='mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500'>Enroll now</button>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
            </Slider>
         </section>

          <hr />
         {/* Footer Section */}
         <footer className='mt-8'>
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
              <div className='items-center flex flex-col'>
                <h3 className='font-semibold mb-3 text-lg'>copyrights &#169; 2025</h3>
                <ul className='space-y-2 text-gray-400 items-center'>
                  <li className='hover:text-white cursor-pointer duration-300'>Terms and Conditions</li>
                  <li className='hover:text-white cursor-pointer duration-300'>Privacy and Policy</li>
                  <li className='hover:text-white cursor-pointer duration-300'>Refund and cancellation</li>
                </ul>
              </div>
           </div>
         </footer>
      </div>
    </div>
  )
}

export default Home
