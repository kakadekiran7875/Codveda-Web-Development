# Level 1 - Task 3: Introduction to JavaScript

[![Codveda Internship](https://img.shields.io/badge/Codveda-Level%201%20Task%203-4f46e5?style=flat-square)](https://www.codveda.com)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)](https://github.com)
[![Tech](https://img.shields.io/badge/Stack-JavaScript%20(ES6+)%20|%20HTML5%20|%20CSS3-blue?style=flat-square)](https://github.com)

## 📌 Task Overview
- **Task Name**: Introduction to JavaScript
- **Level**: Level 1 (Basic)
- **Domain**: Web Development
- **Internship**: Codveda Web Development Internship

## 🎯 Objective
As defined in the official Codveda Web Development Task List:
- Add basic interactivity to a webpage using JavaScript.
- Create interactive elements like dropdowns, modals, and forms.
- Write basic JavaScript functions and event listeners.
- Validate form inputs using JavaScript.

## ✨ Features
1. **Interactive Custom Dropdown**:
   - Custom select element with animated toggles, keyboard and click dismiss, and visual active state.
   - Dynamic selection feedback updating document state.
2. **Accessible Modal Window**:
   - Animated modal dialog with blur backdrop.
   - Dismissible via close button, backdrop click, and keyboard `Escape` key.
   - Prevents body background scrolling while open.
3. **Interactive State Counter**:
   - Increment, decrement, and reset actions powered by event listeners with dynamic color changes based on numerical values.
4. **Theme Customization**:
   - Dynamic Dark / Light mode toggle with state persisted to browser `localStorage`.
5. **Comprehensive Real-Time Form Validation**:
   - **Full Name**: Minimum character threshold, alphabetical formatting check.
   - **Email Address**: Standard RFC-compliant regex pattern verification.
   - **Phone Number**: Numeric length constraints (10-13 digits).
   - **Password Strength Meter**: Real-time evaluation checking 4 criteria (length, uppercase/lowercase, numbers, special characters) with a multi-tiered progress bar (Weak, Fair, Good, Strong).
   - **Confirm Password**: Dynamic matching validation against password field.
   - **Terms Agreement**: Checkbox validation.
6. **Toast Notification System**:
   - Animated floating toasts providing immediate feedback on actions and form status.

## 🛠️ Technologies Used
- **JavaScript (ES6+)**: Event listeners, DOM manipulation, regular expressions, `localStorage`, CSS custom property manipulation.
- **HTML5**: Form elements, ARIA attributes, semantic structure.
- **CSS3**: CSS variables, dark mode styling, keyframes, transitions.

## 📁 Folder Structure
```
Task-3-JavaScript/
│
├── css/
│   └── style.css            # Light & dark mode theme, layout, validation styling
├── js/
│   └── app.js               # Event listeners, dropdown, modal, regex validation, toast engine
├── index.html               # Main interactive dashboard
└── README.md                # Task documentation
```

## 🚀 How to Run
1. Navigate to the task directory:
   ```bash
   cd "Level-1-Basic/Task-3-JavaScript"
   ```
2. Double-click `index.html` to run in any modern browser.

## 📸 Screenshots
Screenshots of the form validation error states, password strength transitions, and modal dialog are referenced in [`/screenshots`](../../screenshots/README.md).

## 👤 Project & Author Information
- **Developer**: Kiran Kakade
- **Organization**: Codveda Technology
- **Repository**: [Codveda-Web-Development](https://github.com)
