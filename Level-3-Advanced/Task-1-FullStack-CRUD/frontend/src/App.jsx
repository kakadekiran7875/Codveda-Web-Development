import React, { useState, useEffect } from 'react';
import PostCard from './components/PostCard';
import TableView from './components/TableView';
import StatsOverview from './components/StatsOverview';
import PostModal from './components/PostModal';
import PostDetailModal from './components/PostDetailModal';
import FilterBar from './components/FilterBar';
import './App.css';

const API_BASE = 'http://localhost:5000/api/posts';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'upvotes', 'title'
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE}?category=${encodeURIComponent(selectedCategory)}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (err) {
      console.warn('Backend API connection unavailable, operating in demo mode', err);
      // Fallback initial demo records if server not currently started
      setPosts((prev) => prev.length > 0 ? prev : [
        {
          _id: '1',
          title: 'Mastering Full-Stack MERN Architecture in 2026',
          excerpt: 'Key strategies for building decoupled, high-performance web systems with React and Node.js.',
          content: 'Building scalable full-stack applications requires a clear division of concerns. By designing stateless Express REST APIs and responsive React SPAs, engineers can achieve rapid iterations and isolated testing workflows.',
          category: 'Web Development',
          tags: ['React', 'Node.js', 'Express', 'Architecture'],
          author: 'Kiran Kakade',
          readTime: '5 min read',
          upvotes: 24,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'CSS Grid vs Flexbox: The Definitive Guide',
          excerpt: 'When to use one-dimensional flex flow vs two-dimensional coordinate matrices in modern UI design.',
          content: 'CSS Flexbox excels at component-level distribution, while CSS Grid provides comprehensive layout control. Combining both allows for robust responsiveness without relying on third-party CSS utility frameworks.',
          category: 'Frontend',
          tags: ['CSS3', 'Flexbox', 'CSS Grid', 'Responsive'],
          author: 'Kiran Kakade',
          readTime: '4 min read',
          upvotes: 18,
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          title: 'Secure JWT Authentication & Refresh Tokens',
          excerpt: 'Implementing robust security practices with salted bcrypt hashes and JSON Web Tokens.',
          content: 'Secure modern web applications by safeguarding user passwords using 10 rounds of bcrypt salting, signing JWT payloads with expiration lifetimes, and providing stateless token verification.',
          category: 'Backend',
          tags: ['Security', 'JWT', 'Bcrypt', 'Node.js'],
          author: 'Kiran Kakade',
          readTime: '6 min read',
          upvotes: 31,
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, searchQuery]);

  // Create or Update Post
  const handleSavePost = async (postData, id) => {
    try {
      if (id) {
        // PUT update
        const res = await fetch(`${API_BASE}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        });
        if (res.ok) {
          showToast('Article updated successfully! ✨');
        } else {
          throw new Error('API update failed');
        }
      } else {
        // POST create
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        });
        if (res.ok) {
          showToast('New article published! 🚀');
        } else {
          throw new Error('API create failed');
        }
      }
      fetchPosts();
    } catch (err) {
      // Local state fallback if backend is offline
      if (id) {
        setPosts(prev => prev.map(p => p._id === id ? { ...p, ...postData } : p));
        showToast('Article updated (Local) ✨');
      } else {
        const newPost = { ...postData, _id: Date.now().toString(), upvotes: 0, createdAt: new Date().toISOString() };
        setPosts(prev => [newPost, ...prev]);
        showToast('New article published (Local) 🚀');
      }
    } finally {
      setIsModalOpen(false);
      setEditingPost(null);
    }
  };

  // Delete Post
  const handleDeletePost = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this article?')) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Article deleted successfully.');
      } else {
        throw new Error('Delete failed');
      }
      fetchPosts();
    } catch (err) {
      setPosts(prev => prev.filter(p => p._id !== id));
      showToast('Article deleted (Local).');
    }
  };

  // Upvote Post
  const handleUpvotePost = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}/upvote`, { method: 'PATCH' });
      fetchPosts();
    } catch (err) {
      setPosts(prev => prev.map(p => p._id === id ? { ...p, upvotes: (p.upvotes || 0) + 1 } : p));
    }
  };

  // Filtered and sorted list
  const displayedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'upvotes') return (b.upvotes || 0) - (a.upvotes || 0);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  return (
    <div className="container">
      {/* Top Header */}
      <header className="top-nav">
        <div className="brand-section">
          <div className="brand-badge">&lt;/&gt;</div>
          <div>
            <h1 className="brand-title">DevLog Hub</h1>
            <p className="brand-subtitle">Full-Stack CRUD Application • Codveda Level 3 Task 1</p>
          </div>
        </div>

        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => { setEditingPost(null); setIsModalOpen(true); }}
        >
          + Write New Article
        </button>
      </header>

      {/* Interactive Metric Summary Cards */}
      <StatsOverview
        posts={posts}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Filter and Search Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* View & Sort Controls Bar */}
      <div className="view-controls-bar">
        <div className="results-count">
          Showing <strong>{displayedPosts.length}</strong> {displayedPosts.length === 1 ? 'article' : 'articles'}
          {selectedCategory !== 'All' && <span className="active-filter-tag">in {selectedCategory}</span>}
        </div>

        <div className="controls-right">
          {/* Sort By Dropdown */}
          <div className="sort-wrapper">
            <label htmlFor="sort-select" className="sort-label">Sort:</label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">🕒 Newest First</option>
              <option value="upvotes">🔥 Most Upvoted</option>
              <option value="title">🔤 Title (A-Z)</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <span className="view-icon">⊞</span> Grid
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <span className="view-icon">☰</span> Table
            </button>
          </div>
        </div>
      </div>

      {/* Articles Display */}
      <main>
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p style={{ fontSize: '1.2rem', marginTop: '14px' }}>⚡ Loading articles from REST API...</p>
          </div>
        ) : displayedPosts.length === 0 ? (
          <div className="empty-articles-card">
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📚</div>
            <h3 style={{ color: 'white', marginBottom: '8px', fontSize: '1.4rem' }}>No Articles Found</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              No articles match your category or search query. Try choosing another filter or writing a new article!
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: '16px' }}
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <TableView
            posts={displayedPosts}
            onEdit={(p) => { setEditingPost(p); setIsModalOpen(true); }}
            onDelete={handleDeletePost}
            onUpvote={handleUpvotePost}
            onOpenDetail={(p) => setViewingPost(p)}
          />
        ) : (
          <div className="posts-grid">
            {displayedPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onEdit={(p) => { setEditingPost(p); setIsModalOpen(true); }}
                onDelete={handleDeletePost}
                onUpvote={handleUpvotePost}
                onOpenDetail={(p) => setViewingPost(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Post Modal (Create / Edit) */}
      <PostModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingPost(null); }}
        onSave={handleSavePost}
        postToEdit={editingPost}
      />

      {/* Article Full Detail View Modal */}
      <PostDetailModal
        post={viewingPost}
        onClose={() => setViewingPost(null)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <span>✓</span> {toastMessage}
        </div>
      )}
    </div>
  );
}
