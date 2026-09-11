import React from 'react';

export default function PostDetailModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="category-badge">{post.category}</span>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px', lineHeight: 1.3 }}>
          {post.title}
        </h2>

        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
          <span>Author: <strong style={{ color: 'white' }}>{post.author || 'Kiran Kakade'}</strong></span>
          <span>•</span>
          <span>{post.readTime || '3 min read'}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', marginBottom: '30px' }}>
          {post.content}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          <div className="tags-row" style={{ margin: 0 }}>
            {post.tags && post.tags.map((tag, idx) => (
              <span key={idx} className="tag-badge">#{tag}</span>
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
