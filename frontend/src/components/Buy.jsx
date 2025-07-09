import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

function Buy() {
  const {courseId} = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("")

  const userData = localStorage.getItem("userToken");
  const user = userData ? JSON.parse(userData) : null;
  const token = user?.token;
  
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    const fetchBuyCourseData = async () => {
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
        console.log(response.data)
        setCourse(response.data.course)
        setClientSecret(response.data.clientSecret)
        setLoading(false);

      } catch (error) {
        setLoading(false);
        if(error.response?.status === 400) {
          setError("You have already purchased this course")
          navigate("/purchases")
        } else {
          setError(error?.response?.data?.errors)
        }
      }
    }
    fetchBuyCourseData();
  }, [courseId])

  const handlePurchase = async () => {
      event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Element not found");
      return;
    }

    setLoading(true);
    const card = elements.getElement(CardElement);

    if (card == null) {
      console.log("Cardelement not found");
      setLoading(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Stripe PaymentMethod Error: ", error);
      setLoading(false);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod Created]", paymentMethod);
    }
    if (!clientSecret) {
      console.log("No client secret found");
      setLoading(false);
      return;
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.user?.firstName,
            email: user?.user?.email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded: ", paymentIntent);
      setCardError("your payment id: ", paymentIntent.id);
      const paymentInfo = {
        email: user?.user?.email,
        userId: user.user._id,
        courseId: courseId,
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
      };
      console.log("Payment info: ", paymentInfo);
      await axios
        .post(`${BACKEND_URL}/order`, paymentInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in making payment");
        });
      toast.success("Payment Successful");
      navigate("/purchases");
    }
    setLoading(false);
  }
  return (
    <div className='flex h-screen items-center justify-center'>
      <button className='bg-blue-500 rounded-md py-2 px-4 hover:bg-blue-800 text-white duration-300' onClick={handlePurchase} disabled={loading}>{loading ? "Processing...": "Buy Now"}</button>
    </div>
  )
}

export default Buy
