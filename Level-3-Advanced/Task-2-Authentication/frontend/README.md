# AuthShield Authentication System - React Frontend Client

[![Codveda Internship](https://img.shields.io/badge/Codveda-Level%203%20Task%202-8b5cf6?style=flat-square)](https://www.codveda.com)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Bundler-purple?style=flat-square)](https://vitejs.dev)

## 📌 Overview
React client implementing authenticated user flows with global state management via the React Context API (`AuthContext`), persistent session tokens in browser `localStorage`, protected dashboard views, and real-time profile editing.

## ✨ Frontend Features
- **User Registration**: Create an account with name, email, password validation, role assignment, and bio.
- **User Authentication (Login)**: Secure login with instant feedback and a quick "Auto-Fill Demo Credentials" button for streamlined review.
- **Protected Dashboard**: Accessible only upon token authentication. Renders user details, security metadata, and the raw verified JWT token.
- **Profile Customization**: In-dashboard profile editing and immediate state updates.
- **One-Click Logout**: Revokes active session tokens and returns to the login screen.

## 🚀 Setup & Execution
1. Navigate to this directory:
   ```bash
   cd "Level-3-Advanced/Task-2-Authentication/frontend"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Vite development server:
   ```bash
   npm run dev
   ```
   *Runs on `http://localhost:5174`.*
