# DevLog CRUD Application - Backend API

[![Codveda Internship](https://img.shields.io/badge/Codveda-Level%203%20Task%201-10b981?style=flat-square)](https://www.codveda.com)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=flat-square)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-REST%20API-lightgrey?style=flat-square)](https://expressjs.com)

## 📌 Overview
Robust REST API server engineered for the **DevLog Full-Stack CRUD Application** (Codveda Web Development Internship - Level 3 Task 1).

## 🏛️ Architecture (MVC Pattern)
```
backend/
├── config/
│   └── db.js               # MongoDB Mongoose connector with resilient fallback
├── controllers/
│   └── postController.js   # Business logic for all CRUD operations
├── middleware/
│   ├── errorHandler.js     # 404 and global error responses
│   └── validator.js        # Request input validation
├── models/
│   └── Post.js             # Mongoose Post data schema
├── routes/
│   └── postRoutes.js       # Express route handlers
├── package.json            # Node.js dependencies
└── server.js               # Server initialization & middleware pipeline
```

## 📡 REST API Specifications

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `GET` | `/api/health` | Service health status | None |
| `GET` | `/api/posts` | Get all posts (supports `?category=&search=`) | None |
| `GET` | `/api/posts/:id` | Get single post details | None |
| `POST` | `/api/posts` | Create new post | `{ title, excerpt, content, category, tags }` |
| `PUT` | `/api/posts/:id` | Update post by ID | `{ title, excerpt, content, category, tags }` |
| `DELETE` | `/api/posts/:id` | Delete post by ID | None |
| `PATCH` | `/api/posts/:id/upvote` | Increment upvotes on post | None |

## 🚀 Setup & Execution
1. Navigate to this directory:
   ```bash
   cd "Level-3-Advanced/Task-1-FullStack-CRUD/backend"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch server:
   ```bash
   npm start
   ```
   *Server listens on `http://localhost:5000`.*
