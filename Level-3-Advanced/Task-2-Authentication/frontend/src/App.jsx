import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  return (
    <div className="auth-wrapper">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="brand-badge-auth">
          <div className="brand-shield-icon">🛡️</div>
          <div>
            <div className="brand-shield-title">AuthShield</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              JWT Authentication & Access Control
            </div>
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Codveda Level 3 Task 2
          </span>
        </div>
      </header>

      {/* Main Views */}
      <main className="main-content">
        {isAuthenticated ? (
          <Dashboard />
        ) : authView === 'login' ? (
          <Login onSwitchToRegister={() => setAuthView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setAuthView('login')} />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
