import React from 'react';

const CATEGORIES = ['All', 'Web Development', 'Frontend', 'Backend', 'DevOps', 'Career & Internship'];

export default function FilterBar({ selectedCategory, onSelectCategory, searchQuery, onSearchChange }) {
  return (
    <div className="filter-bar">
      <div className="category-pills">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="text"
        className="search-field"
        placeholder="🔍 Search articles or tags..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
