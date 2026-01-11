# Coursify - Course Selling LMS Platform

A full-stack Learning Management System (LMS) built with the MERN stack, enabling course creation, management, and seamless purchasing with Stripe payment integration.

## 🚀 Features

### User Features
- 🔐 User Authentication (Signup/Signin/Logout)
- 📚 Browse and Search Courses
- 🛒 Purchase Courses with Stripe Payment Gateway
- 📥 Access Purchased Courses
- 👤 User Profile Management
- 🎯 Course Enrollment System

### Admin Features
- 🎓 Course Creation and Management
- 📊 Admin Dashboard (`/admin/dashboard`)
- 🖼️ Image Upload with Cloudinary Integration
- 💰 View Orders and Revenue
- ✏️ Edit/Delete Courses
- 📈 Analytics and Reporting

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Library
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Hot Toast** - Notifications
- **React Slick** - Carousel/Slider
- **React Icons** - Icon Library

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password Hashing
- **Zod** - Validation

### Third-Party Services
- **Stripe** - Payment Processing
- **Cloudinary** - Image Storage and Management
- **Cookie Parser** - Cookie Handling
- **CORS** - Cross-Origin Resource Sharing
- **Express File Upload** - File Handling

## 📁 Project Structure
```
coursify/
├── client/                # Frontend React Application
│   ├── public/
│   │   └── logo.webp
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Signin.jsx
│   │   │   ├── Courses.jsx
│   │   │   └── ...
│   │   ├── utils/
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                # Backend Node.js Application
│   ├── model/
│   │   ├── userModel.js
│   │   ├── courseModel.js
│   │   ├── purchaseModel.js
│   │   └── adminModel.js
│   ├── router/
│   │   ├── userRouter.js
│   │   ├── courseRouter.js
│   │   ├── orderRouter.js
│   │   └── adminRouter.js
│   ├── controller/
│   │   ├── userController.js
│   │   ├── courseController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe Account
- Cloudinary Account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/coursify.git
cd coursify
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=4001
MONGO_URL=your_mongodb_connection_string
JWT_USER_SECRET=your_jwt_secret
JWT_ADMIN_SECRET=your_admin_jwt_secret
NODE_ENV=development

# Cloudinary Configuration
cloud_name=your_cloudinary_cloud_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:4001`

### 3. Frontend Setup
```bash
cd client
npm install
```

Create a `utils.js` file in `src/utils/`:
```javascript
export const BACKEND_URL = "http://localhost:4001/api/v1";
```

Start the frontend development server:
```bash
npm run dev
```

The application will run on `http://localhost:5173`

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port number |
| `MONGO_URL` | MongoDB connection string |
| `JWT_USER_SECRET` | Secret key for user JWT tokens |
| `JWT_ADMIN_SECRET` | Secret key for admin JWT tokens |
| `NODE_ENV` | Environment (development/production) |
| `cloud_name` | Cloudinary cloud name |
| `api_key` | Cloudinary API key |
| `api_secret` | Cloudinary API secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `FRONTEND_URL` | Frontend application URL |

## 🌐 API Endpoints

### User Routes (`/api/v1/user`)
- `POST /signup` - User registration
- `POST /signin` - User login
- `GET /logout` - User logout
- `GET /purchases` - Get user's purchased courses

### Course Routes (`/api/v1/course`)
- `GET /courses` - Get all courses
- `GET /course/:id` - Get single course
- `POST /create` - Create course (Admin only)
- `PUT /update/:id` - Update course (Admin only)
- `DELETE /delete/:id` - Delete course (Admin only)

### Order Routes (`/api/v1/order`)
- `POST /create` - Create new order
- `GET /orders` - Get all orders (Admin only)

### Admin Routes (`/api/v1/admin`)
- `POST /signup` - Admin registration
- `POST /signin` - Admin login
- `GET /dashboard` - Admin dashboard data

## 👥 User Roles

### User Role
- Browse and purchase courses
- Access purchased content
- Manage profile
- View purchase history

### Admin Role
- Full CRUD operations on courses
- Access admin dashboard at `/admin/dashboard`
- View all orders and revenue
- Manage course content and pricing
- Upload course images

## 💳 Payment Integration

Coursify uses **Stripe** for secure payment processing:
- Secure checkout flow
- Multiple payment methods supported
- Automatic order confirmation
- Transaction history tracking

## 🎨 Design Features

- **Responsive Design** - Works on all devices
- **Dark Theme** - Modern gradient background (black to blue)
- **Smooth Animations** - Enhanced user experience
- **Toast Notifications** - Real-time feedback
- **Loading States** - Better UX with loading indicators
- **Image Optimization** - Fast loading with Cloudinary

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies
- CORS protection
- Input validation with Zod
- Secure payment processing with Stripe

## 📱 Screenshots

### Home Page
- Hero section with course carousel
- Featured courses slider
- Footer with social links

### Courses Page
- Grid layout of available courses
- Search functionality
- Sidebar navigation

### Admin Dashboard
- Course management interface
- Order analytics
- Revenue tracking

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel
```

### Backend (Render/Railway)
```bash
cd server
# Deploy to your preferred platform
```

Update CORS origins and environment variables for production.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vivek Kumar**

- GitHub: [@vivekkumar012](https://github.com/vivekkumar012)
- Email: vivekumar7510@gmail.com

## 🙏 Acknowledgments

- React.js community
- Stripe documentation
- Cloudinary for image hosting
- MongoDB Atlas
- All open-source contributors

## 📞 Support

For support, email  or create an issue in the repository.

---

<div align="center">

Made with ❤️ by Vivek Kumar

⭐ Star this repository if you found it helpful!

</div>