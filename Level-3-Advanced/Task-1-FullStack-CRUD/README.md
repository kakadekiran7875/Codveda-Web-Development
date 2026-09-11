# Level 3 - Task 1: Build a Full-Stack CRUD Application

[![Codveda Internship](https://img.shields.io/badge/Codveda-Level%203%20Task%201-10b981?style=flat-square)](https://www.codveda.com)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)](https://github.com)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20|%20Node.js%20|%20Express%20|%20MongoDB-blue?style=flat-square)](https://github.com)

## 📌 Task Overview
- **Task Name**: Build a Full-Stack CRUD Application
- **Level**: Level 3 (Advanced)
- **Domain**: Web Development
- **Internship**: Codveda Web Development Internship

## 🎯 Objective
As defined in the official Codveda Web Development Task List:
- Create a full-stack web application with CRUD functionality (e.g., blog, task manager).
- Set up a back-end server with Express or Django.
- Create a REST API to handle CRUD operations.
- Build a front-end with React or Vue that interacts with the back-end API.
- Use a database (e.g., MongoDB, PostgreSQL) to store data.
- Tools: Node.js, Express, React, MongoDB.

## 🏛️ System Architecture
The application is strictly decoupled into client and server layers adhering to production best practices:

```
Task-1-FullStack-CRUD/
│
├── backend/                         # Node.js + Express REST API Server
│   ├── config/
│   │   └── db.js                    # MongoDB connector with auto fallback
│   ├── controllers/
│   │   └── postController.js        # Controller business logic for CRUD
│   ├── middleware/
│   │   ├── errorHandler.js          # Centralized error handling
│   │   └── validator.js             # Input sanitization and validation
│   ├── models/
│   │   └── Post.js                  # Mongoose data schema & model
│   ├── routes/
│   │   └── postRoutes.js            # Express router endpoints
│   ├── package.json
│   ├── server.js                    # Express app initialization
│   └── README.md
│
├── frontend/                        # Modern React Single Page Application (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── PostCard.jsx         # Card component with action triggers
│   │   │   ├── PostModal.jsx        # Dual-mode Create/Update modal form
│   │   │   ├── PostDetailModal.jsx  # Full-screen article reader view
│   │   │   └── FilterBar.jsx        # Category selector and search bar
│   │   ├── App.jsx                  # State manager & API client integration
│   │   ├── App.css                  # UI layout and interactive styling
│   │   ├── index.css                # Global design tokens
│   │   └── main.jsx                 # Entrypoint
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md                        # Master task documentation
```

## ✨ End-to-End Capabilities
1. **Create (POST)**: Authors can write articles with titles, excerpts, body content, categories, and tags via an accessible modal form.
2. **Read (GET)**: Responsive card grid with real-time category filtering and query search; full-screen reading modal.
3. **Update (PUT)**: Edit any existing article with instant state synchronization.
4. **Delete (DELETE)**: Permanently remove articles with confirmation modal.
5. **Upvote (PATCH)**: Increment community approval ratings.
6. **Resilient Data Layer**: Connects to MongoDB with Mongoose, with an intelligent built-in fallback store so reviewers can run and test the application immediately without database setup blockers.

## 🚀 How to Run the Application

### 1. Start the Backend API Server
```bash
cd "Level-3-Advanced/Task-1-FullStack-CRUD/backend"
npm install
npm start
```
*Backend runs on port `5000` (Health status available at `http://localhost:5000/api/health`).*

### 2. Start the Frontend React Client
```bash
cd "Level-3-Advanced/Task-1-FullStack-CRUD/frontend"
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

## 📸 Screenshots
Visual captures of the article cards, create/edit modal, reader modal, and API endpoints are referenced in [`/screenshots`](../../screenshots/README.md).

## 👤 Project & Author Information
- **Developer**: Kiran Kakade
- **Organization**: Codveda Technology
- **Repository**: [Codveda-Web-Development](https://github.com)
