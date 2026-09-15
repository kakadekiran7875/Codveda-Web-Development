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

  // Password criteria checks
  const password = formData.password;
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const criteriaCount = [hasMinLength, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length;
  
  const getStrengthLabel = () => {
    if (!password) return { text: 'None', color: 'var(--text-muted)', width: '0%' };
    if (criteriaCount <= 1) return { text: 'Weak', color: '#ef4444', width: '25%' };
    if (criteriaCount === 2) return { text: 'Fair', color: '#f59e0b', width: '50%' };
    if (criteriaCount === 3) return { text: 'Good', color: '#3b82f6', width: '75%' };
    return { text: 'Strong & Secure', color: '#10b981', width: '100%' };
  };

  const strength = getStrengthLabel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (password.length < 6) {
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
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          {/* Real-time Strength Meter */}
          {password.length > 0 && (
            <div className="password-meter-wrap" style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Strength:</span>
                <span style={{ color: strength.color, fontWeight: 700 }}>{strength.text}</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s ease' }}></div>
              </div>

              {/* Requirement Checklist */}
              <div className="pw-checklist" style={{ marginTop: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '0.74rem' }}>
                <div style={{ color: hasMinLength ? '#10b981' : 'var(--text-muted)' }}>
                  {hasMinLength ? '✓' : '○'} 8+ characters
                </div>
                <div style={{ color: hasUppercase ? '#10b981' : 'var(--text-muted)' }}>
                  {hasUppercase ? '✓' : '○'} Uppercase letter
                </div>
                <div style={{ color: hasNumber ? '#10b981' : 'var(--text-muted)' }}>
                  {hasNumber ? '✓' : '○'} Contains number
                </div>
                <div style={{ color: hasSpecialChar ? '#10b981' : 'var(--text-muted)' }}>
                  {hasSpecialChar ? '✓' : '○'} Special character
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Role</label>
          <select
            className="form-input"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="intern">🎓 Intern / Student</option>
            <option value="developer">💻 Software Developer</option>
            <option value="admin">⚡ System Administrator</option>
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

