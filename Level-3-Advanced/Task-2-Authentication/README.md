# Level 3 - Task 2: User Authentication System

[![Codveda Internship](https://img.shields.io/badge/Codveda-Level%203%20Task%202-8b5cf6?style=flat-square)](https://www.codveda.com)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)](https://github.com)
[![Security](https://img.shields.io/badge/Stack-JWT%20|%20Bcrypt%20|%20Node.js%20|%20React%2018-red?style=flat-square)](https://github.com)

## 📌 Task Overview
- **Task Name**: User Authentication System
- **Level**: Level 3 (Advanced)
- **Domain**: Web Development
- **Internship**: Codveda Web Development Internship

## 🎯 Objective
As defined in the official Codveda Web Development Task List:
- Implement a user authentication system for a web application.
- Set up user registration and login functionality using a back-end server.
- Use JWT (JSON Web Tokens) or session-based authentication to manage user sessions.
- Secure sensitive routes and implement password hashing.
- Tools: Node.js, Express, MongoDB, JWT or session handling.

## 🏛️ System Architecture
```
Task-2-Authentication/
│
├── backend/                         # Node.js + Express Authentication API
│   ├── config/
│   │   └── db.js                    # Database connector
│   ├── controllers/
│   │   └── authController.js        # Registration, login, profile endpoints
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verify guard middleware
│   ├── models/
│   │   └── User.js                  # User schema with bcrypt password hashing
│   ├── routes/
│   │   └── authRoutes.js            # Authentication routes
│   ├── package.json
│   ├── server.js                    # Express app listening on port 5001
│   └── README.md
│
├── frontend/                        # React 18 SPA (Vite)
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global authentication provider
│   │   ├── components/
│   │   │   ├── Login.jsx            # Sign-in form with demo autofill
│   │   │   ├── Register.jsx         # Account creation form
│   │   │   └── Dashboard.jsx        # Protected dashboard with JWT inspector
│   │   ├── App.jsx                  # Auth state router
│   │   ├── App.css                  # Modern UI styles
│   │   ├── index.css                # Global tokens
│   │   └── main.jsx                 # Entrypoint
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md                        # Master task documentation
```

## 🔒 Security Architecture Highlights
1. **Password Hashing**: Passwords are never saved in plaintext; hashed via `bcryptjs` with 10 salt rounds prior to persistence.
2. **Stateless JSON Web Tokens (JWT)**: Cryptographically signed bearer tokens issued upon login/registration with 7-day expiration.
3. **Route Protection**: The `protect` middleware guards sensitive endpoints, validating bearer tokens from the HTTP `Authorization` header.
4. **React Context Persistence**: `AuthContext` provides global session state seamlessly preserved across browser reloads via `localStorage`.

## 🚀 How to Run the Application

### 1. Start the Backend Auth Server
```bash
cd "Level-3-Advanced/Task-2-Authentication/backend"
npm install
npm start
```
*Runs on port `5001` (Health status available at `http://localhost:5001/api/health`).*

### 2. Start the Frontend React Client
```bash
cd "Level-3-Advanced/Task-2-Authentication/frontend"
npm install
npm run dev
```
*Runs on `http://localhost:5174`.*

### 3. Demo Credentials
- **Email**: `kiran@codveda.com`
- **Password**: `Codveda2026!`

## 📸 Screenshots
Visual captures of user registration, login error validation, and the protected JWT inspector dashboard are available in [`/screenshots`](../../screenshots/README.md).

## 👤 Project & Author Information
- **Developer**: Kiran Kakade
- **Organization**: Codveda Technology
- **Repository**: [Codveda-Web-Development](https://github.com)
