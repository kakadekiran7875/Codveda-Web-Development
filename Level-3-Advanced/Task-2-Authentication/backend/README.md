# AuthShield Authentication System - Backend API

[![Codveda Internship](https://img.shields.io/badge/Codveda-Level%203%20Task%202-8b5cf6?style=flat-square)](https://www.codveda.com)
[![Security](https://img.shields.io/badge/Security-JWT%20&%20Bcrypt-red?style=flat-square)](https://jwt.io)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=flat-square)](https://nodejs.org)

## 📌 Overview
Production-grade tokenized authentication server for the **AuthShield Authentication & Access Control System** (Codveda Web Development Internship - Level 3 Task 2).

## 🏛️ Directory Architecture
```
backend/
├── config/
│   └── db.js               # Database connection configuration
├── controllers/
│   └── authController.js   # User registration, login, and profile handlers
├── middleware/
│   └── authMiddleware.js   # JWT Bearer token authentication guard
├── models/
│   └── User.js             # Mongoose User model with pre-save bcrypt hashing
├── routes/
│   └── authRoutes.js       # Auth routing endpoints
├── package.json
└── server.js               # Server initialization
```

## 📡 API Endpoints

| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register user & return JWT token |
| `POST` | `/api/auth/login` | Public | Verify credentials & return JWT token |
| `GET` | `/api/auth/profile` | Protected (`Bearer <token>`) | Get logged-in user details |
| `PUT` | `/api/auth/profile` | Protected (`Bearer <token>`) | Update user profile |
| `GET` | `/api/health` | Public | Service health verification |

## 🚀 Setup & Execution
1. Navigate to this directory:
   ```bash
   cd "Level-3-Advanced/Task-2-Authentication/backend"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *Listens on `http://localhost:5001`.*
