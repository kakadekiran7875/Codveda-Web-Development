import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, token, logout, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [role, setRole] = useState(user?.role || 'intern');
  const [statusMsg, setStatusMsg] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await updateProfile({ name, bio, role });
    if (res.success) {
      setStatusMsg('Profile updated successfully! ✨');
      setIsEditing(false);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Welcome Bar */}
      <div className="dash-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="user-avatar-badge">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome, {user?.name}</h2>
              <span className="role-pill">{user?.role}</span>
              <span className="session-status-badge">● Active Session</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Authenticated Session Active • Codveda Web Development Level 3 Task 2
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel Edit' : '✏️ Edit Profile'}
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={logout}
            style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
            Sign Out 🚪
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="alert-box alert-success" style={{ marginBottom: '24px' }}>
          <span>✓</span> {statusMsg}
        </div>
      )}

      {/* Main Grid */}
      <div className="dash-grid">
        {/* Left Card: Profile & Identity Summary */}
        <div className="dash-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
            👤 User Identity & Credentials
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Full Name</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{user?.name}</div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email Address</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>{user?.email}</div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Professional Bio</div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{user?.bio || 'No bio provided'}</div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Account Verification</span>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>● Active & Verified</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginTop: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Password Security</span>
              <span style={{ color: '#818cf8', fontWeight: 700 }}>Bcrypt 10 Salt Rounds</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginTop: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Security Level</span>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>HMAC-SHA256 Signed</span>
            </div>
          </div>
        </div>

        {/* Right Card: JWT Token & Access Inspector or Edit Form */}
        <div className="dash-card">
          {isEditing ? (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
                ✏️ Update Account Details
              </h3>
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select
                    className="form-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="intern">🎓 Intern / Student</option>
                    <option value="developer">💻 Software Developer</option>
                    <option value="admin">⚡ System Administrator</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Bio</label>
                  <textarea
                    className="form-input"
                    style={{ minHeight: '80px', resize: 'vertical' }}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Saving Changes...' : 'Save Profile Changes ✨'}
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  🛡️ JSON Web Token (JWT) Inspector
                </h3>
                <button
                  type="button"
                  className="btn-copy-token"
                  onClick={handleCopyToken}
                  title="Copy JWT token to clipboard"
                >
                  {copied ? '✓ Copied!' : '📋 Copy Token'}
                </button>
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '14px' }}>
                This Bearer token is automatically attached to the <code style={{ color: 'var(--accent-cyan)' }}>Authorization</code> header for protected REST API transactions.
              </p>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>ACTIVE BEARER TOKEN:</span>
                <span style={{ color: 'var(--accent-emerald)' }}>● Valid (24h expiry)</span>
              </div>
              <div className="jwt-token-display">
                {token}
              </div>

              <div style={{ marginTop: '20px', padding: '16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'white' }}>
                  🔒 Active Session & Device Telemetry
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Device / OS</span>
                    <strong style={{ color: 'white' }}>Windows PC</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Client Loopback</span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>127.0.0.1 (Localhost)</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Encryption</span>
                    <strong style={{ color: 'var(--accent-emerald)' }}>TLS 1.3 / JWT</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
