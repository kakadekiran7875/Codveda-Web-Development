import React from 'react';

export default function TableView({ posts, onEdit, onDelete, onUpvote, onOpenDetail }) {
  return (
    <div className="table-responsive-wrapper">
      <table className="crud-table">
        <thead>
          <tr>
            <th>Article Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Tags</th>
            <th>Read Time</th>
            <th>Upvotes</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="table-row">
              <td className="cell-title">
                <span className="title-text" onClick={() => onOpenDetail(post)}>
                  {post.title}
                </span>
                <span className="cell-date">
                  {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </td>
              <td>
                <span className="table-category-pill">{post.category}</span>
              </td>
              <td className="cell-author">
                <span className="author-avatar">{post.author ? post.author.charAt(0).toUpperCase() : 'K'}</span>
                <span>{post.author || 'Kiran Kakade'}</span>
              </td>
              <td>
                <div className="table-tags-wrap">
                  {post.tags && post.tags.slice(0, 2).map((t, i) => (
                    <span key={i} className="mini-tag">#{t}</span>
                  ))}
                  {post.tags && post.tags.length > 2 && (
                    <span className="mini-tag count">+{post.tags.length - 2}</span>
                  )}
                </div>
              </td>
              <td className="cell-readtime">{post.readTime || '3 min'}</td>
              <td>
                <button 
                  type="button" 
                  className="table-upvote-btn"
                  onClick={() => onUpvote(post._id)}
                  title="Upvote article"
                >
                  ▲ {post.upvotes || 0}
                </button>
              </td>
              <td className="cell-actions" style={{ textAlign: 'right' }}>
                <button 
                  type="button" 
                  className="tbl-action-btn view"
                  onClick={() => onOpenDetail(post)}
                  title="View details"
                >
                  👁️
                </button>
                <button 
                  type="button" 
                  className="tbl-action-btn edit"
                  onClick={() => onEdit(post)}
                  title="Edit article"
                >
                  ✏️
                </button>
                <button 
                  type="button" 
                  className="tbl-action-btn delete"
                  onClick={() => onDelete(post._id)}
                  title="Delete article"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
