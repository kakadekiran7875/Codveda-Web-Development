import React, { useState, useEffect } from 'react';

export default function PostModal({ isOpen, onClose, onSave, postToEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    excerpt: '',
    content: '',
    tags: '',
    author: 'Kiran Kakade',
    readTime: '4 min read'
  });

  useEffect(() => {
    if (postToEdit) {
      setFormData({
        title: postToEdit.title || '',
        category: postToEdit.category || 'Web Development',
        excerpt: postToEdit.excerpt || '',
        content: postToEdit.content || '',
        tags: Array.isArray(postToEdit.tags) ? postToEdit.tags.join(', ') : (postToEdit.tags || ''),
        author: postToEdit.author || 'Kiran Kakade',
        readTime: postToEdit.readTime || '4 min read'
      });
    } else {
      setFormData({
        title: '',
        category: 'Web Development',
        excerpt: '',
        content: '',
        tags: '',
        author: 'Kiran Kakade',
        readTime: '4 min read'
      });
    }
  }, [postToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) return;

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    onSave(payload, postToEdit ? postToEdit._id : null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            {postToEdit ? '✏️ Edit Article' : '📝 Publish New Article'}
          </h3>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Article Title</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Architecting Scalable REST APIs" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Category</label>
              <select 
                className="form-input"
                value={formData.category} 
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Web Development">Web Development</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="DevOps">DevOps</option>
                <option value="Career & Internship">Career & Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Estimated Read Time</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. 5 min read" 
                value={formData.readTime} 
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Brief Excerpt (Summary)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Concise overview of what this article covers..." 
              value={formData.excerpt} 
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required 
            />
          </div>

          <div className="form-group">
            <label>Full Content (Markdown / Text)</label>
            <textarea 
              className="form-input" 
              placeholder="Write the full article content here..." 
              value={formData.content} 
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required 
            />
          </div>

          <div className="form-group">
            <label>Tags (Comma separated)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="React, Node.js, Express, Architecture" 
              value={formData.tags} 
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="btn" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'white' }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {postToEdit ? 'Save Changes' : 'Publish Article 🚀'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
