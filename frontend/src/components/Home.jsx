import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import axios from 'axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from 'react-hot-toast';

// Dummy courses to show initially
const dummyCourses = [
  {
    _id: 'dummy-1',
    title: 'Web Development Bootcamp',
    image: { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop' }
  },
  {
    _id: 'dummy-2',
    title: 'JavaScript Mastery',
    image: { url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop' }
  },
  {
    _id: 'dummy-3',
    title: 'React Complete Guide',
    image: { url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop' }
  },
  {
    _id: 'dummy-4',
    title: 'Python Programming',
    image: { url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop' }
  },
  {
    _id: 'dummy-5',
    title: 'Data Science Fundamentals',
    image: { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' }
  },
  {
    _id: 'dummy-6',
    title: 'Machine Learning A-Z',
    image: { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop' }
  }
];

function Home() {
  const BACKEND_URL = "http://localhost:4001/api/v1"; // Replace with your actual backend URL
  const [courses, setCourses] = useState(dummyCourses);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usingDummyData, setUsingDummyData] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userToken");
    setIsLoggedIn(!!user);
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
        timeout: 10000 // 10 second timeout
      })
      
      toast.success(response.data.message || "Logged out successfully"); 
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);

    } catch (error) {
      console.error("Logout error:", error);
      
      // Still log out locally even if backend call fails
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);
      
      const errorMessage = error.response?.data?.errors 
        || error.response?.data?.message 
        || "Logged out locally";
      toast.success(errorMessage);
    } finally {
      setIsLoggingOut(false);
    }
  }
 
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
          timeout: 15000 // 15 second timeout
        });
        
        if (response.data.course && response.data.course.length > 0) {
          setCourses(response.data.course);
          setUsingDummyData(false);
        } else {
          setUsingDummyData(true);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setUsingDummyData(true);
        
        // Only show error toast if it's not a timeout or network error
        if (error.code !== 'ECONNABORTED' && !error.message.includes('Network Error')) {
          toast.error("Could not load courses from server");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, [])

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <div className='bg-gradient-to-r from-black to-blue-950 min-h-screen'>
      <div className='min-h-screen text-white container mx-auto'>
         {/* Navbar */}
         <header className='flex items-center justify-between p-6'>
            <div className='flex items-center space-x-2'>
              <div className='h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center'>
                <span className='text-white font-bold'>C</span>
              </div>
              <h1 className='text-2xl font-bold text-orange-500'>Coursify</h1>
            </div>
            <div className='space-x-4'>
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout} 
                  disabled={isLoggingOut}
                  className='bg-transparent text-white border border-white rounded py-2 px-4 hover:bg-white hover:text-black transition-colors disabled:opacity-50'
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              ) : (
                <>
                  <Link to={"/signin"} className='bg-transparent text-white border border-white rounded py-2 px-4 hover:bg-white hover:text-black transition-colors'>Login</Link>
                  <Link to={"/signup"} className='bg-orange-500 text-white rounded py-2 px-4 hover:bg-orange-600 transition-colors'>Signup</Link>
                </>
              )}
            </div>
         </header>

         {/* Main Section */}
         <section className='text-center py-20'>
           <h1 className='text-4xl font-semibold text-orange-500'>Welcome to Coursify</h1>
           <br />
           <p className='text-gray-400'>Sharpen your Skills with these Courses</p>
           <div className='space-x-4 mt-8'>
             <Link to={"/courses"} className='inline-block bg-green-500 text-white rounded py-3 px-6 font-semibold hover:bg-green-600 duration-300'>Explore Courses</Link>
             <Link to={"/videos"} className='inline-block bg-white text-black rounded py-3 px-6 font-semibold hover:bg-gray-200 duration-300'>Course Videos</Link>
           </div>
         </section>

         {/* Courses Section */}
         <section className='pb-12 px-4'>
            {usingDummyData && !isLoading && (
              <div className='text-center mb-4'>
                <p className='text-yellow-400 text-sm'>Showing sample courses</p>
              </div>
            )}
            
            {isLoading ? (
              <div className='text-center py-8'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent'></div>
                <p className='text-gray-400 mt-4'>Loading courses...</p>
              </div>
            ) : courses.length > 0 ? (
              <Slider {...settings}>
                 {courses.map((course) => (
                   <div key={course._id} className='p-4'>
                     <div className='relative flex-shrink-0 transition-transform duration-300 transform hover:scale-105'>
                       <div className='bg-gray-900 rounded-lg overflow-hidden shadow-lg'>
                         <img 
                           className='h-48 w-full object-cover' 
                           src={course.image?.url || 'https://via.placeholder.com/400x300'} 
                           alt={course.title}
                           onError={(e) => {
                             e.target.src = 'https://via.placeholder.com/400x300?text=Course+Image';
                           }}
                         />
                         <div className='p-6 text-center'>
                           <h2 className='text-xl font-bold text-white mb-4'>{course.title}</h2>
                           <button className='bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition-colors'>
                             Enroll now
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}
              </Slider>
            ) : (
              <div className='text-center py-8'>
                <p className='text-gray-400'>No courses available at the moment.</p>
              </div>
            )}
         </section>

         <hr className='border-gray-700' />
         
         {/* Footer Section */}
         <footer className='mt-8 pb-8'>
           <div className='grid grid-cols-1 md:grid-cols-3 gap-8'> 
              <div className='flex flex-col items-center md:items-start'>
                <div className='flex items-center space-x-2'>
                  <div className='h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center'>
                    <span className='text-white font-bold'>C</span>
                  </div>
                  <h1 className='text-2xl font-bold text-orange-500'>Coursify</h1>
                </div>
                <div className='mt-3 ml-2 md:ml-8'>
                  <p className='mb-2'>Follow us</p>
                  <div className='flex space-x-4'>
                    <a href="#" className='hover:text-blue-500 transition-colors'><FaFacebook className='text-2xl' /></a>
                    <a href="#" className='hover:text-pink-500 transition-colors'><FaInstagram className='text-2xl' /></a>
                    <a href="#" className='hover:text-blue-400 transition-colors'><FaTwitter className='text-2xl' /></a>
                  </div>
                </div>
              </div>
              
              <div className='flex flex-col items-center'>
                <h3 className='font-semibold mb-3 text-lg'>Connect</h3>
                <ul className='space-y-2 text-gray-400 text-center'>
                  <li className='hover:text-white cursor-pointer transition-colors'>YouTube - learn coding</li>
                  <li className='hover:text-white cursor-pointer transition-colors'>Telegram - learn coding</li>
                  <li className='hover:text-white cursor-pointer transition-colors'>GitHub - learn coding</li>
                </ul>
              </div>
              
              <div className='flex flex-col items-center'>
                <h3 className='font-semibold mb-3 text-lg'>Copyright © 2025</h3>
                <ul className='space-y-2 text-gray-400 text-center'>
                  <li className='hover:text-white cursor-pointer transition-colors'>Terms and Conditions</li>
                  <li className='hover:text-white cursor-pointer transition-colors'>Privacy Policy</li>
                  <li className='hover:text-white cursor-pointer transition-colors'>Refund and Cancellation</li>
                </ul>
              </div>
           </div>
         </footer>
      </div>
    </div>
  )
}

export default Home