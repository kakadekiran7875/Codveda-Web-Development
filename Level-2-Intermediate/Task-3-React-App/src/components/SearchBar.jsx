import React, { useState } from 'react';

export default function SearchBar({ onSearch, recentSearches, onSelectRecent }) {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    onSearch(cityInput.trim());
    setCityInput('');
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search city (e.g. Mumbai, London, New York, Tokyo)..."
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search Weather 🔎
        </button>
      </form>

      {recentSearches && recentSearches.length > 0 && (
        <div className="recent-chips">
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Recent:</span>
          {recentSearches.map((city) => (
            <button
              key={city}
              type="button"
              className="recent-chip"
              onClick={() => onSelectRecent(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
