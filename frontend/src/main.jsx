
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51RAQYF4dvtVIEWTIFrUUWqML0ugwxw1rXuyv57T3nDb92h9NHLzB0P4yklRGGrET9XpjLY9xh6F8O3OKgjS9aVVQ00z60tOX8z");
createRoot(document.getElementById('root')).render(
  

  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
    
)
