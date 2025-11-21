# Task Manager with Role-Based Access Control (RBAC)

A full-stack MERN application demonstrating role-based access control, authentication, and task management.

## 🎯 Features

### User Features
- ✅ User registration with email/username
- ✅ Secure login with JWT authentication
- ✅ Create, view, edit, and delete personal tasks
- ✅ Task status management (Pending, In Progress, Completed)
- ✅ Search and filter tasks by status
- ✅ Pagination for task lists
- ✅ Responsive dashboard with statistics

### Admin Features
- ✅ Admin registration and dedicated admin login
- ✅ View all tasks from all users
- ✅ Delete any task in the system
- ✅ Admin-specific dashboard with system-wide statistics
- ✅ See who created each task
- ✅ Search and filter across all tasks
- ✅ Pagination for system-wide tasks

### Security Features
- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected routes for authenticated users
- ✅ Admin-only routes
- ✅ Request validation with Joi

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** Joi

### Frontend
- **Framework:** React 19+
- **Build Tool:** Vite
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Styling:** CSS3 with CSS Variables

## 📁 Project Structure

```
task-manager-rbac/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── taskController.js     # Task CRUD logic
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── errorHandler.js       # Error handling
│   │   └── validate.js           # Joi validation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── auth.js               # Auth endpoints
│   │   └── tasks.js              # Task endpoints
│   ├── utils/
│   │   └── validators.js         # Joi schemas
│   ├── .env                       # Environment variables
│   ├── server.js                 # Express app setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminLogin.jsx       # NEW
│   │   │   ├── AdminRegister.jsx    # NEW
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminDashboard.jsx   # NEW
│   │   │   └── NotFound.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Navbar.css
│   │   │   ├── TaskCard.css
│   │   │   ├── TaskForm.css
│   │   │   ├── Loader.css
│   │   │   └── NotFound.css
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/task-manager
   JWT_SECRET=your_very_long_random_secret_key_here_minimum_32_characters
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server:**
   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm start
   ```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## 📝 API Endpoints

### Authentication Routes

#### User Registration
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepass123",
  "role": "user"  // or "admin" (optional, defaults to "user")
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "role": "user"
  }
}
```

#### User Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepass123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "role": "user"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Task Routes

#### Get All Tasks
```
GET /api/tasks?page=1&limit=10&status=pending&search=query
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "_id": "task_id",
      "title": "Complete project",
      "description": "Finish the MERN stack project",
      "status": "in-progress",
      "createdBy": {
        "_id": "user_id",
        "username": "john_doe"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 25,
  "pages": 3
}
```

#### Get Single Task
```
GET /api/tasks/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": { /* task object */ }
}
```

#### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the MERN stack project",
  "status": "pending"
}

Response:
{
  "success": true,
  "data": { /* created task */ }
}
```

#### Update Task
```
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}

Response:
{
  "success": true,
  "data": { /* updated task */ }
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## 👥 User Roles & Permissions

### Regular User
| Action | Permission |
|--------|-----------|
| View own tasks | ✅ |
| Create tasks | ✅ |
| Edit own tasks | ✅ |
| Delete own tasks | ✅ |
| View all tasks | ❌ |
| Delete other's tasks | ❌ |
| Access admin dashboard | ❌ |

### Admin User
| Action | Permission |
|--------|-----------|
| View own tasks | ✅ |
| Create tasks | ✅ |
| Edit own tasks | ✅ |
| Delete own tasks | ✅ |
| View all tasks | ✅ |
| Delete any task | ✅ |
| Access admin dashboard | ✅ |

## 🔐 Authentication Flow

### User Registration
1. User enters username, password, and selects role (user/admin)
2. Password is hashed using bcryptjs
3. User document is created in MongoDB
4. JWT token is generated
5. Token and user info are stored in localStorage

### User Login
1. User submits username and password
2. User is found in database
3. Password is compared with hashed password
4. JWT token is generated if credentials match
5. Token is stored in localStorage for subsequent requests

### Protected Routes
1. Frontend checks for token in localStorage
2. If token exists, it's included in Authorization header
3. Backend verifies token using JWT_SECRET
4. If invalid/expired, user is redirected to login

### Admin Routes
1. Additional check verifies user.role === 'admin'
2. Non-admin users are redirected to regular dashboard

## 🧪 Testing the Application

### Test Scenario 1: Regular User Flow
1. Visit http://localhost:5173/register
2. Fill in username and password, select "User (Regular)"
3. Click "Sign Up"
4. You'll be redirected to dashboard
5. Create a task
6. Edit and delete your own task
7. Try accessing /admin/dashboard (should be denied)

### Test Scenario 2: Admin Flow
1. Visit http://localhost:5173/admin/register
2. Fill in username and password
3. Click "Create Admin Account"
4. You'll be redirected to admin dashboard
5. You can see all tasks from all users
6. You can delete any task regardless of who created it
7. Click "Admin Dashboard" in navbar

### Test Scenario 3: Admin Login
1. Visit http://localhost:5173/admin/login
2. Enter admin credentials
3. You'll be redirected to admin dashboard if role is admin
4. Non-admin users will see an error message

## 📊 Database Schema

### User Schema
```javascript
{
  username: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Task Schema
```javascript
{
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed'], default: 'pending'),
  createdBy: ObjectId (reference to User, required),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## 🎨 Styling & UI

- **Color Scheme:** Modern purple and blue gradient
- **Responsive Design:** Mobile-friendly CSS
- **Icons:** Unicode emojis for visual appeal
- **CSS Variables:** Easy theme customization
- **Form Validation:** Client-side and server-side validation

## 🔒 Security Best Practices

1. **Password Hashing:** Bcryptjs with salt rounds
2. **JWT Tokens:** Secure token-based authentication
3. **Input Validation:** Joi validation schemas
4. **CORS:** Configured for frontend domain
5. **Environment Variables:** Sensitive data in .env
6. **Role-Based Access:** Protected routes and endpoints

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Check backend is running on port 5000
- Verify API baseURL in frontend/src/services/api.js
- Check CORS is enabled in backend

### Login fails
- Verify MongoDB connection string
- Check JWT_SECRET is set in .env
- Ensure user exists in database

### Tasks not showing up
- Verify user is logged in
- Check token is valid and not expired
- Ensure tasks are created by current user (for regular users)

## 📚 Learning Outcomes

This project demonstrates:
- MERN stack development
- REST API design
- JWT authentication & authorization
- Role-based access control
- Database modeling
- React hooks and context API
- Axios HTTP client
- React Router navigation
- Form validation

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements!

## 📄 License

MIT License - feel free to use this project for learning and development.

## 📧 Support

For issues or questions, please create an issue in the GitHub repository.

---

**Happy coding!** 🚀
