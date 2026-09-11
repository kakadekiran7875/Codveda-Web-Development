import React from 'react';

export default function PostCard({ post, onEdit, onDelete, onUpvote, onOpenDetail }) {
  return (
    <article className="post-card">
      <div className="post-top">
        <span className="category-badge">{post.category}</span>
        <span className="read-time">{post.readTime || '3 min read'}</span>
      </div>

      <h3 className="post-title" onClick={() => onOpenDetail(post)}>
        {post.title}
      </h3>

      <p className="post-excerpt">{post.excerpt}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="tags-row">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="tag-badge">#{tag}</span>
          ))}
        </div>
      )}

      <div className="post-bottom">
        <div>
          <span style={{ color: 'var(--text-muted)' }}>By </span>
          <strong style={{ color: 'white' }}>{post.author || 'Kiran Kakade'}</strong>
        </div>

        <div className="card-actions">
          <button 
            type="button" 
            className="action-icon-btn upvote" 
            onClick={() => onUpvote(post._id)}
            title="Upvote article"
          >
            ▲ {post.upvotes || 0}
          </button>
          <button 
            type="button" 
            className="action-icon-btn" 
            onClick={() => onEdit(post)}
            title="Edit article"
          >
            ✏️ Edit
          </button>
          <button 
            type="button" 
            className="action-icon-btn delete" 
            onClick={() => onDelete(post._id)}
            title="Delete article"
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  );
}
