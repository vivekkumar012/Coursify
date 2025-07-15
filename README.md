# 📘 Coursify

**Coursify** is a full-stack e-learning platform where users can browse, purchase, and access courses, while administrators can manage content via a dedicated admin portal.

---

## 🔗 Live Links

- 🌐 **Frontend**: [coursify-theta.vercel.app](https://coursify-theta.vercel.app)
- ⚙️ **Backend API**: [coursify-1-kh8f.onrender.com](https://coursify-1-kh8f.onrender.com)

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js
- Axios
- Tailwind CSS
- React Router DOM

### 🔙 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Stripe Payments
- Cloudinary (for file uploads)
- dotenv
- express-fileupload
- cookie-parser
- cors

---

## 🚀 Features

### 👤 User Portal
- User Signup / Login with JWT authentication
- Browse all available courses
- Stripe integration to purchase courses
- View and access enrolled course content

### 🧑‍💼 Admin Portal
Accessible at: `/admin/dashboard`

- View all users and orders
- Add/Edit/Delete courses
- Upload videos/images using Cloudinary
- Manage course pricing and details

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/coursify.git
cd coursify

cd backend
npm install

PORT=5000
MONGO_URL=your_mongodb_connection_string
FRONTEND_URL=https://coursify-theta.vercel.app

cloud_name=your_cloudinary_cloud_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

npm start

cd frontend
npm install
npm start


