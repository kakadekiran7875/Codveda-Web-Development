# Level 2 - Task 1: Responsive Web Design with Flexbox and Grid

[![Codveda Internship](https://img.shields.io/badge/Codveda-Level%202%20Task%201-2563eb?style=flat-square)](https://www.codveda.com)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)](https://github.com)
[![Tech](https://img.shields.io/badge/Stack-CSS%20Flexbox%20|%20CSS%20Grid%20|%20HTML5-blue?style=flat-square)](https://github.com)

## 📌 Task Overview
- **Task Name**: Responsive Web Design with Flexbox and Grid
- **Level**: Level 2 (Intermediate)
- **Domain**: Web Development
- **Internship**: Codveda Web Development Internship

## 🎯 Objective
As defined in the official Codveda Web Development Task List:
- Build a responsive webpage layout using CSS Flexbox and Grid.
- Use Flexbox for page layout and alignment.
- Use CSS Grid for organizing sections (e.g., photo gallery or blog layout).
- Ensure the layout adapts to various screen sizes (desktop, tablet, mobile).

## 📐 Layout Architecture

### 1. CSS Flexbox Implementation
Flexbox is applied to 1-dimensional content distribution and dynamic item alignment:
- **Navigation Bar (`.nav-flex`)**: Fluid brand, navigation links, and action button alignment using `display: flex; justify-content: space-between; align-items: center;`.
- **Hero Section (`.hero-banner-flex`)**: Responsive text and action button distribution.
- **Card Meta & Author Rows (`.card-meta-flex`, `.author-flex`)**: Precise baseline alignment of avatar, name, and reading time.
- **Interactive Button Elements (`.btn`)**: Inline flex alignment for text and iconography.

### 2. CSS Grid Implementation
CSS Grid powers the 2-dimensional macro structure:
- **12-Column Editorial Grid (`.editorial-grid`)**:
  - Lead Feature Card spans **8 columns** (`grid-column: span 8;`).
  - Sidebar widget area spans **4 columns** (`grid-column: span 4;`).
  - Secondary editorial cards span **4 columns each** across the 12-column grid.
- **Asymmetrical Photo & Media Showcase (`.gallery-grid`)**:
  - Uses `grid-template-columns: repeat(4, 1fr)` and `grid-auto-rows: 240px`.
  - Lead showcase spans **2 rows and 2 columns** (`gallery-span-2x2`).
  - Horizontal feature spans **2 columns and 1 row** (`gallery-span-2x1`).
  - Regular cards span **1 column and 1 row**.
- **Footer Structure (`.footer-grid`)**:
  - 4-column layout (`grid-template-columns: 2fr repeat(3, 1fr)`).

### 3. Responsive Breakpoints
- **Desktop (>1024px)**: Full 12-column grid, 4-column photo gallery, complete horizontal header.
- **Tablet (641px - 1024px)**: Collapses into 6-column grid; lead card & sidebar each span 6 columns; gallery adapts to 2 columns.
- **Mobile (<640px)**: Single column layout (`grid-template-columns: 1fr`); full-width cards; slide-out navigation menu drawer.

## 🛠️ Technologies Used
- **HTML5**: Semantic document structuring.
- **CSS3**: CSS Flexbox, CSS Grid (`fr` units, `grid-column-span`, `grid-row-span`), Media Queries.
- **JavaScript**: Mobile drawer toggle and newsletter state handling.

## 📁 Folder Structure
```
Task-1-Responsive-Design/
│
├── css/
│   └── style.css            # Flexbox utilities, CSS Grid coordinates, media queries
├── js/
│   └── main.js              # Mobile menu toggle & interactions
├── index.html               # Main responsive editorial & media portal
└── README.md                # Task documentation
```

## 🚀 How to Run
1. Open this directory in your terminal:
   ```bash
   cd "Level-2-Intermediate/Task-1-Responsive-Design"
   ```
2. Open `index.html` in any web browser, or serve with VS Code Live Server.

## 📸 Screenshots
Responsive breakpoint tests (Desktop, Tablet, Mobile) are indexed in [`/screenshots`](../../screenshots/README.md).

## 👤 Project & Author Information
- **Developer**: Kiran Kakade
- **Organization**: Codveda Technology
- **Repository**: [Codveda-Web-Development](https://github.com)
