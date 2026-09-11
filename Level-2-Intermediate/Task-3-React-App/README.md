# Level 2 - Task 3: Introduction to Front-End Frameworks (React App)

[![Codveda Internship](https://img.shields.io/badge/Codveda-Level%202%20Task%203-38bdf8?style=flat-square)](https://www.codveda.com)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)](https://github.com)
[![Tech](https://img.shields.io/badge/Stack-React%2018%20|%20Vite%20|%20Component%20Props%20|%20Hooks-blue?style=flat-square)](https://github.com)

## 📌 Task Overview
- **Task Name**: Introduction to Front-End Frameworks (React or Vue)
- **Level**: Level 2 (Intermediate)
- **Domain**: Web Development
- **Internship**: Codveda Web Development Internship

## 🎯 Objective
As defined in the official Codveda Web Development Task List:
- Set up a project using create-react-app or Vue CLI (implemented using the modern industry standard Vite + React project architecture).
- Understand the basics of components, props, and state management.
- Create a simple component-based app (e.g., a weather app or calculator).

## ✨ Features
1. **Component-Driven Architecture**:
   - `SearchBar`: Controlled input component managing search queries and passing user actions up via callback props.
   - `WeatherCard`: Displays city, country, local time, primary temperature readout, and weather condition badges.
   - `MetricsGrid`: 4-quadrant layout visualizing humidity, wind speed, UV index, and atmospheric pressure.
   - `ForecastCard`: 5-day predictive meteorological cards showing condition icons, daytime highs, and nighttime lows.
2. **State Management & Props**:
   - React `useState` hooks managing active city, temperature scale units (°C vs °F), and recent search histories.
   - React `useEffect` and props propagation ensuring unidirectional data flow and deterministic rendering.
3. **Interactive Features**:
   - Instant live search for major global metropolitan centers (Mumbai, London, New York, Tokyo) with procedural generation for any global city queried.
   - Quick-select recent searches chip tray.
   - Dynamic Unit Conversion toggling between Celsius and Fahrenheit instantly updating both current metrics and 5-day forecast cards.
4. **Modern UI & Responsive Design**:
   - Dark space-gradient aesthetic, glowing borders, glassmorphism cards, and responsive CSS Grid adapting from multi-column desktop to mobile card stacks.

## 🛠️ Technologies Used
- **React 18**: Functional components, `useState`, unidirectional data flow, props.
- **Vite**: Ultra-fast module bundler and development server.
- **Vanilla CSS**: Custom properties, glassmorphism, responsive grid layouts.

## 📁 Folder Structure
```
Task-3-React-App/
│
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx    # Controlled search bar & recent search chips
│   │   ├── WeatherCard.jsx  # Primary current conditions display
│   │   ├── MetricsGrid.jsx  # Humidity, wind, UV, and pressure metrics
│   │   └── ForecastCard.jsx # 5-day predictive forecast cards
│   ├── App.jsx              # Central root state orchestrator
│   ├── App.css              # Dashboard layout and component styling
│   ├── index.css            # Design tokens & typography
│   └── main.jsx             # React DOM root mounting entrypoint
├── index.html               # Vite HTML entrypoint
├── package.json             # Scripts & dependencies
├── vite.config.js           # Vite React plugin configuration
└── README.md                # Task documentation
```

## 🚀 How to Run
1. Navigate to the project directory:
   ```bash
   cd "Level-2-Intermediate/Task-3-React-App"
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Launch development server:
   ```bash
   npm run dev
   ```
4. Open the displayed localhost URL (`http://localhost:5173`) in your browser.
5. To build production bundle:
   ```bash
   npm run build
   ```

## 📸 Screenshots
Screenshots demonstrating city searching, Celsius/Fahrenheit toggle, and mobile responsive displays are documented in [`/screenshots`](../../screenshots/README.md).

## 👤 Project & Author Information
- **Developer**: Kiran Kakade
- **Organization**: Codveda Technology
- **Repository**: [Codveda-Web-Development](https://github.com)
