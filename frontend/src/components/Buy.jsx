import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

function Buy() {
  const {courseId} = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const userData = localStorage.getItem("userToken");
  const user = userData ? JSON.parse(userData) : null;
  const token = user?.token;

  

  const handlePurchase = async () => {
      if(!token) {
        toast.error("Please login to purchase the courses");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.post(`http://localhost:4001/api/v1/course/buy/${courseId}`,{}, {
          withCredentials: true,
          Headers:{
            Authorization: `Bearer ${token}`
          }
        }
        );
        toast.success(response.data.message || "Course Purchased Successfully!!!");
        navigate("/purchases")
        setLoading(false);

      } catch (error) {
        setLoading(false);
        if(error.response?.status === 400) {
          toast.error("You have already purchased this course")
          navigate("/purchases")
        } else {
          toast.error(error?.response?.data?.errors)
        }
      }
  }
  return (
    <div className='flex h-screen items-center justify-center'>
      <button className='bg-blue-500 rounded-md py-2 px-4 hover:bg-blue-800 text-white duration-300' onClick={handlePurchase} disabled={loading}>{loading ? "Processing...": "Buy Now"}</button>
    </div>
  )
}

export default Buy
