# Level 2 - Task 2: Build a To-Do List App with JavaScript

[![Codveda Internship](https://img.shields.io/badge/Codveda-Level%202%20Task%202-6366f1?style=flat-square)](https://www.codveda.com)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)](https://github.com)
[![Tech](https://img.shields.io/badge/Stack-JavaScript%20(ES6+)%20|%20LocalStorage%20|%20CSS3-blue?style=flat-square)](https://github.com)

## 📌 Task Overview
- **Task Name**: Build a To-Do List App with JavaScript
- **Level**: Level 2 (Intermediate)
- **Domain**: Web Development
- **Internship**: Codveda Web Development Internship

## 🎯 Objective
As defined in the official Codveda Web Development Task List:
- Create a functional to-do list app that allows users to add, delete, and mark tasks as complete.
- Use HTML and CSS for layout and design.
- Implement JavaScript for adding, updating, and deleting tasks.
- Store tasks in the browser’s local storage to persist data.

## ✨ Features
1. **Full Task CRUD Lifecycle**:
   - **Create**: Add new tasks with title, category, priority indicator (Low, Medium, High), and due date.
   - **Read**: Dynamic rendering of stored tasks with priority color badges and completion status.
   - **Update**: In-place toggle completion (striking through text) and edit modal to update task titles, categories, priorities, and dates.
   - **Delete**: Instant task deletion with confirmation on bulk actions.
2. **Persistent LocalStorage**:
   - Full persistence across page reloads and browser restarts using `window.localStorage`.
   - Pre-seeds realistic Codveda internship tasks on first launch.
3. **Advanced Filtering & Search**:
   - Status filters: **All**, **Active**, and **Completed**.
   - Live real-time search input filtering tasks by keyword in title and category.
   - Clear all completed tasks action button.
4. **Productivity Metrics**:
   - Live KPI counters: Total Tasks, Pending, Completed, and Completion percentage.
   - Animated progress fill bar syncing with completion metrics.
5. **Modern Aesthetics**:
   - Sleek dark theme (`#0b0f19`, `#131b2e`) with smooth micro-interactions, custom scrollbars, and accessible modal overlays.

## 🛠️ Technologies Used
- **JavaScript (ES6+)**: Event delegation, DOM manipulation, JSON serialization, Array methods (`filter`, `map`, `unshift`), `localStorage` API.
- **HTML5**: Form inputs, select dropdowns, semantic list structure.
- **CSS3**: CSS Grid, Flexbox, custom properties, animations, dark mode aesthetics.

## 📁 Folder Structure
```
Task-2-Todo-App/
│
├── css/
│   └── style.css            # Dark mode styles, badges, progress bar, edit modal
├── js/
│   └── app.js               # CRUD logic, LocalStorage sync, search/filter engine
├── index.html               # Main task manager interface
└── README.md                # Task documentation
```

## 🚀 How to Run
1. Navigate to the task directory:
   ```bash
   cd "Level-2-Intermediate/Task-2-Todo-App"
   ```
2. Double-click `index.html` to open directly in any modern browser.

## 📸 Screenshots
Visual captures of active tasks, completed states, filter transitions, and modal editing are available in [`/screenshots`](../../screenshots/README.md).

## 👤 Project & Author Information
- **Developer**: Kiran Kakade
- **Organization**: Codveda Technology
- **Repository**: [Codveda-Web-Development](https://github.com)
