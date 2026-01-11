import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import logo from '../../public/logo.webp'
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { BACKEND_URL } from "../utils/utils";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    console.log("Courses are", courses);

    useEffect(() => {
        const token = localStorage.getItem("userToken"); // FIXED
        if(token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    const handleLogout = async() => {
        setIsLoggingOut(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/user/logout`, {
               withCredentials: true,
               timeout: 10000
            });
            toast.success(response.data.message);
            localStorage.removeItem("userToken"); // FIXED
            setIsLoggedIn(false);
        } catch (error) {
            console.log("Error in Logout", error);
            
            // Still log out locally
            localStorage.removeItem("userToken");
            setIsLoggedIn(false);
            
            const errorMsg = error.response?.data?.errors 
              || error.response?.data?.message 
              || "Logged out locally";
            toast.success(errorMsg);
        } finally {
            setIsLoggingOut(false);
        }
    }

    // Fetch all courses from backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/course/courses`, {
                    withCredentials: true,
                    timeout: 15000
                })
                console.log(response.data.course);
                setCourses(response.data.course || []); // FIXED: ensure it's always an array
                setLoading(false);
            } catch (error) {
                console.log("Error in fetch courses in home page", error);
                setCourses([]); // Set empty array on error
                setLoading(false);
            }
        };
        fetchCourses();
    }, [])

  return (
    <div className='flex'>
      {/* Sidebar */}
      <aside className='w-64 bg-gray-100 h-screen p-5 fixed'>
        <div>
            <img src={logo} alt="Profile" className='rounded-full h-12 w-12' />
        </div>
        <nav>
            <ul>
                <li className='mb-4'>
                    <Link to="/" className='flex items-center hover:text-orange-500 transition-colors'>
                      <RiHome2Fill className="mr-2" />Home
                    </Link>
                </li>
                <li className='mb-4'>
                    <Link to="/courses" className='flex items-center hover:text-orange-500 transition-colors'>
                      <FaDiscourse className="mr-2" />Courses
                    </Link>
                </li>
                <li className='mb-4'>
                    <Link to="/purchases" className='flex items-center hover:text-orange-500 transition-colors'>
                      <FaDownload className="mr-2" />Purchases
                    </Link>
                </li>
                <li className='mb-4'>
                    <Link to="/settings" className='flex items-center hover:text-orange-500 transition-colors'>
                      <IoMdSettings className="mr-2" />Settings
                    </Link>
                </li>
                <li>
                    {isLoggedIn ? (
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="flex items-center hover:text-orange-500 transition-colors disabled:opacity-50 w-full text-left"
                        >
                          <IoLogOut className="mr-2" /> 
                          {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                    ) : (
                        <Link to="/signin" className="flex items-center hover:text-orange-500 transition-colors">
                          <IoLogIn className="mr-2" />Login
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
      </aside>
      
      {/* Main */}
      <main className='ml-0 md:ml-64 w-full bg-white p-10'>
        <header className="flex justify-between items-center mb-10">
            <h1 className='text-xl font-bold'>Courses</h1>
            <div className='flex items-center space-x-3'>
                <div className='flex items-center'>
                    <input
                     type='text'
                     placeholder='Type here to search...'
                     className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
                    />
                    <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
                      <FiSearch className="text-xl text-gray-600" />
                    </button>
                </div>
            </div>
        </header>

        {/* Vertically Scrollable Courses Section */}
        <div className="overflow-y-auto h-[75vh]">
          {loading ? (
            <div className="text-center py-8">
              <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent'></div>
              <p className="text-gray-500 mt-4">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-500">
              No course posted yet by admin
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="rounded mb-4 w-full h-48 object-cover"
                  />
                  <h2 className="font-bold text-lg mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-xl">
                      ₹{course.price}{" "}
                      <span className="text-gray-500 line-through text-sm">₹5999</span>
                    </span>
                    <span className="text-green-600">20% off</span>
                  </div>

                  <Link
                    to={`/buy/${course._id}`}
                    className="block text-center bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-orange-600 duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Courses