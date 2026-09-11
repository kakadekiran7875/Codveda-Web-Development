# Codveda Web Development Internship 🚀

[![Codveda Technology](https://img.shields.io/badge/Codveda-Web%20Development%20Internship-00C49F?style=for-the-badge&logo=codeigniter&logoColor=white)](https://www.codveda.com)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)](https://github.com)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20|%20CSS3%20|%20JavaScript%20|%20React%20|%20Node.js%20|%20Express%20|%20MongoDB-blue?style=for-the-badge)](https://github.com)

Welcome to the official GitHub repository for my **Web Development Internship** at **Codveda Technology**. This repository contains modular, production-ready implementations of all tasks specified in the official **Codveda Web Development Task List**, organized systematically across three progressive levels: Basic, Intermediate, and Advanced.

---

## 📌 About Codveda Technology
**Codveda Technology** is an innovative IT solutions company specializing in tailored digital services including Web Development, App Development, Digital Marketing, SEO Optimization, AI/ML Automation, and Data Analytics.

- **Website**: [www.codveda.com](https://www.codveda.com)
- **LinkedIn**: [@codveda](https://www.linkedin.com)
- **Support**: support@codveda.com

---

## 📂 Repository Architecture

```
Codveda-Web-Development/
│
├── Level-1-Basic/
│   ├── Task-1-Static-Website/           # Multi-Page Static Corporate Website
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   ├── index.html, about.html, services.html, contact.html
│   │   └── README.md
│   │
│   ├── Task-2-Portfolio/                # Modern Single-Page Personal Portfolio
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   ├── index.html
│   │   └── README.md
│   │
│   └── Task-3-JavaScript/               # Interactive UI Elements & Form Validation
│       ├── css/
│       ├── js/
│       ├── index.html
│       └── README.md
│
├── Level-2-Intermediate/
│   ├── Task-1-Responsive-Design/        # Advanced Responsive Layout (Flexbox & CSS Grid)
│   │   ├── css/
│   │   ├── js/
│   │   ├── index.html
│   │   └── README.md
│   │
│   ├── Task-2-Todo-App/                 # Persistent LocalStorage Task Management App
│   │   ├── css/
│   │   ├── js/
│   │   ├── index.html
│   │   └── README.md
│   │
│   └── Task-3-React-App/                # Modern React Weather & Forecast SPA (Vite)
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── README.md
│
├── Level-3-Advanced/
│   ├── Task-1-FullStack-CRUD/           # Full-Stack CRUD Application (Articles / Resources)
│   │   ├── frontend/                    # React SPA Client
│   │   ├── backend/                     # Node.js + Express REST API (MVC Architecture)
│   │   └── README.md
│   │
│   └── Task-2-Authentication/           # Secure Authentication & Access Control System
│       ├── frontend/                    # React Client with AuthContext & Protected Routes
│       ├── backend/                     # Node.js + Express JWT & bcrypt Authentication
│       └── README.md
│
├── screenshots/                         # Organized UI captures for documentation
├── videos/                              # Video walkthroughs for LinkedIn showcase
├── .gitignore                           # Git ignore rules for node_modules and secrets
└── README.md                            # Main internship overview documentation
```

---

## 🎯 Task Breakdown & Descriptions

### Level 1: Basic

| Task | Title | Key Technologies | Description |
|---|---|---|---|
| **Task 1** | **Build a Simple Static Website** | HTML5, CSS3, JavaScript | Multi-page static website (Home, About, Services, Contact) with navigation, modern styling, and media query responsiveness. |
| **Task 2** | **Create a Portfolio Webpage** | HTML5, CSS3, JavaScript | High-impact developer portfolio showcasing projects, technical skills matrix, internship milestones, and contact channels. |
| **Task 3** | **Introduction to JavaScript** | JavaScript (ES6+), DOM, CSS3 | Interactive webpage featuring custom dropdowns, accessible modal dialogs, and real-time form validation with password strength metering. |

---

### Level 2: Intermediate

| Task | Title | Key Technologies | Description |
|---|---|---|---|
| **Task 1** | **Responsive Design with Flexbox and Grid** | CSS Flexbox, CSS Grid, HTML5 | Complex responsive portal combining Flexbox alignment with a 12-column CSS Grid layout and responsive photo/media galleries. |
| **Task 2** | **Build a To-Do List App with JavaScript** | JavaScript, LocalStorage, CSS3 | Full-featured task management application with task creation, categorization, priority badges, completion status, filtering, and local persistence. |
| **Task 3** | **Introduction to Front-End Frameworks (React)** | React 18, Vite, Hooks, Modern CSS | Component-based weather intelligence dashboard with city search, atmospheric metrics, forecast cards, temperature toggling, and history. |

---

### Level 3: Advanced

| Task | Title | Key Technologies | Description |
|---|---|---|---|
| **Task 1** | **Build a Full-Stack CRUD Application** | React, Node.js, Express, MongoDB / JSON Fallback | Complete full-stack RESTful resource manager with full Create, Read, Update, Delete capabilities, MVC architecture, input validation, and toast alerts. |
| **Task 2** | **User Authentication System** | React, Express, JWT, bcryptjs, Context API | End-to-end authentication system featuring secure password hashing, JSON Web Token generation, protected private dashboard routes, and session persistence. |

---

## 🚀 How to Run Each Project

### 1. Static HTML/CSS/JavaScript Projects
Tasks in Level 1 (Tasks 1, 2, 3) and Level 2 (Tasks 1, 2):
1. Navigate to the task directory:
   ```bash
   cd "Level-1-Basic/Task-1-Static-Website"
   ```
2. Open `index.html` directly in any modern browser, or serve using VS Code Live Server or python:
   ```bash
   # Optional simple HTTP server
   npx serve .
   ```

### 2. React Applications (Level 2 Task 3, Level 3 Frontends)
1. Navigate to the React app folder:
   ```bash
   cd "Level-2-Intermediate/Task-3-React-App"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed localhost URL (usually `http://localhost:5173`).

### 3. Full-Stack Applications (Level 3 Tasks 1 & 2)
Both advanced tasks contain separate `frontend/` and `backend/` directories:
1. **Start the Backend Server**:
   ```bash
   cd "Level-3-Advanced/Task-1-FullStack-CRUD/backend"
   npm install
   npm run dev    # or npm start
   ```
   *Runs on port `5000` (or `5001`).*

2. **Start the Frontend Client**:
   ```bash
   cd "Level-3-Advanced/Task-1-FullStack-CRUD/frontend"
   npm install
   npm run dev
   ```
   *Runs on port `5173`.*

---

## 🛡️ Security & Best Practices
- **No Sensitive Data**: Passwords, API tokens, `.env` files, and database connection strings are excluded via `.gitignore`.
- **Clean Separation**: Every task is completely self-contained with its own dependencies and README.
- **Accessible & Semantic**: Semantic HTML5 markup, responsive layouts tested across viewport breakpoints.

---

## 📢 Submission & Social Showcase
- **LinkedIn Hashtags**: `#CodvedaJourney` `#CodvedaExperience` `#FutureWithCodveda` `#CodvedaAchievements` `#CodvedaProjects`
- **Tag**: **@Codveda** / **Codveda Technology**
- **Intern**: Kiran Kakade
