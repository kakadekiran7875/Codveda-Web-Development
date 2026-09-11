import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onSwitchToRegister }) {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password) {
      setLocalError('Please fill in both email and password.');
      return;
    }

    const res = await login(email, password);
    if (!res.success && res.message) {
      setLocalError(res.message);
    }
  };

  const handleDemoFill = () => {
    setEmail('kiran@codveda.com');
    setPassword('Codveda2026!');
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>🔐</div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-desc">Sign in with your verified credentials to access protected resources.</p>
      </div>

      {(localError || error) && (
        <div className="alert-box alert-error">
          <span>⚠️</span> {localError || error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
          <button
            type="button"
            onClick={handleDemoFill}
            style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            ⚡ Auto-Fill Demo Credentials
          </button>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Verifying Credentials...' : 'Sign In Securely 🚀'}
        </button>
      </form>

      <div className="switch-text">
        Don't have an account?
        <button type="button" className="switch-link" onClick={onSwitchToRegister}>
          Register here
        </button>
      </div>
    </div>
  );
}
