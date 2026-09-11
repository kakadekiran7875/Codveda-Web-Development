import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register({ onSwitchToLogin }) {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'intern',
    bio: ''
  });
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (formData.password.length < 6) {
      setLocalError('Password must contain at least 6 characters.');
      return;
    }

    const res = await register(formData);
    if (!res.success && res.message) {
      setLocalError(res.message);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>🛡️</div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-desc">Register a new profile to receive an authenticated JSON Web Token.</p>
      </div>

      {localError && (
        <div className="alert-box alert-error">
          <span>⚠️</span> {localError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Kiran Kakade"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password (Min. 6 chars)</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role</label>
          <select
            className="form-input"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="intern">Intern / Student</option>
            <option value="developer">Software Developer</option>
            <option value="admin">System Administrator</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Professional Bio / Focus</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Web Development Intern at Codveda"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Registering Account...' : 'Register Account 🚀'}
        </button>
      </form>

      <div className="switch-text">
        Already registered?
        <button type="button" className="switch-link" onClick={onSwitchToLogin}>
          Sign in here
        </button>
      </div>
    </div>
  );
}
