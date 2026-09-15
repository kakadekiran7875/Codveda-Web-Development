import React from 'react';

export default function StatsOverview({ posts, selectedCategory, onSelectCategory }) {
  const totalArticles = posts.length;
  const totalUpvotes = posts.reduce((sum, p) => sum + (p.upvotes || 0), 0);
  const webDevCount = posts.filter(p => p.category === 'Web Development').length;
  const frontendCount = posts.filter(p => p.category === 'Frontend').length;
  const backendCount = posts.filter(p => p.category === 'Backend').length;

  const statCards = [
    {
      id: 'All',
      label: 'Total Articles',
      value: totalArticles,
      icon: '📚',
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      borderColor: 'rgba(16, 185, 129, 0.4)'
    },
    {
      id: 'Web Development',
      label: 'Web Development',
      value: webDevCount,
      icon: '🌐',
      color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      borderColor: 'rgba(59, 130, 246, 0.4)'
    },
    {
      id: 'Frontend',
      label: 'Frontend UI',
      value: frontendCount,
      icon: '🎨',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      borderColor: 'rgba(139, 92, 246, 0.4)'
    },
    {
      id: 'Backend',
      label: 'Backend & APIs',
      value: backendCount,
      icon: '⚙️',
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      borderColor: 'rgba(245, 158, 11, 0.4)'
    },
    {
      id: 'upvotes',
      label: 'Community Upvotes',
      value: totalUpvotes,
      icon: '▲',
      color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      borderColor: 'rgba(236, 72, 153, 0.4)',
      isStatOnly: true
    }
  ];

  return (
    <div className="stats-overview-grid">
      {statCards.map((card) => {
        const isSelected = selectedCategory === card.id;
        return (
          <div
            key={card.id}
            className={`stat-card ${isSelected ? 'active-stat-card' : ''} ${card.isStatOnly ? 'stat-only' : 'interactive-stat'}`}
            style={{
              borderColor: isSelected ? 'var(--primary)' : undefined
            }}
            onClick={() => {
              if (!card.isStatOnly) {
                onSelectCategory(card.id);
              }
            }}
            title={card.isStatOnly ? 'Total upvotes accrued' : `Filter by ${card.label}`}
          >
            <div className="stat-card-top">
              <span className="stat-label">{card.label}</span>
              <div 
                className="stat-icon-wrap"
                style={{ background: card.color }}
              >
                {card.icon}
              </div>
            </div>
            <div className="stat-value">{card.value}</div>
            {!card.isStatOnly && (
              <div className="stat-hint">
                {isSelected ? '✓ Filter applied' : 'Click to filter'}
              </div>
            )}
            {card.isStatOnly && (
              <div className="stat-hint">Across all records</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
