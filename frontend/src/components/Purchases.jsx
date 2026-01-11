import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Purchases() {
  const [purchases, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  
  // FIXED: Get token directly from localStorage (it's stored as a string, not JSON)
  const token = localStorage.getItem("userToken");

  console.log("Token:", token);
  console.log("Purchases: ", purchases);

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!token) {
      toast.error("Please login to view purchases");
      navigate("/signin");
    } else {
      setIsLoggedIn(true);
    }
  }, [token, navigate]);

  // Fetch purchases
  useEffect(() => {
    if (!token) return; // Don't fetch if no token

    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPurchase(response.data.courseData || []);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching purchases:", error);
        
        // Handle 401 unauthorized
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("userToken");
          navigate("/signin");
        } else {
          setErrorMessage(
            error.response?.data?.message || "Failed to fetch purchase data"
          );
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchPurchases();
  }, [token, navigate]);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);
      navigate("/signin");
    } catch (error) {
      console.log("Error in logging out ", error);
      
      // Still logout locally even if backend fails
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);
      navigate("/signin");
      
      toast.error(error.response?.data?.errors || "Logged out locally");
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Don't render if not logged in
  if (!token) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-100 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        <nav>
          <ul className="mt-16 md:mt-0">
            <li className="mb-4">
              <Link to="/" className="flex items-center hover:text-orange-500 transition-colors">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/courses" className="flex items-center hover:text-orange-500 transition-colors">
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/purchases" className="flex items-center text-blue-500">
                <FaDownload className="mr-2" /> Purchases
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center hover:text-orange-500 transition-colors">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center hover:text-orange-500 transition-colors w-full text-left">
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/signin" className="flex items-center hover:text-orange-500 transition-colors">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 p-8 bg-gray-50 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        <h2 className="text-xl font-semibold mt-6 md:mt-0 mb-6">
          My Purchases
        </h2>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
            <p className="text-gray-500 mt-4">Loading your purchases...</p>
          </div>
        ) : purchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {purchases.map((purchase) => (
              <div
                key={purchase._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center space-y-4">
                  {/* Course Image */}
                  <img
                    className="rounded-lg w-full h-48 object-cover"
                    src={
                      purchase.image?.url || "https://via.placeholder.com/200?text=Course+Image"
                    }
                    alt={purchase.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200?text=Course+Image";
                    }}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-2">{purchase.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {purchase.description?.length > 100
                        ? `${purchase.description.slice(0, 100)}...`
                        : purchase.description}
                    </p>
                    <span className="text-green-700 font-semibold text-lg">
                      ₹{purchase.price}
                    </span>
                  </div>
                  <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 w-full">
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">You have no purchases yet.</p>
            <Link to="/courses" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 inline-block">
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Purchases;