import React from 'react';

export default function MetricsGrid({ weather }) {
  if (!weather) return null;

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-top">
          <span>💧</span>
          <span>Humidity</span>
        </div>
        <div className="metric-value">{weather.humidity}%</div>
      </div>

      <div className="metric-card">
        <div className="metric-top">
          <span>💨</span>
          <span>Wind Velocity</span>
        </div>
        <div className="metric-value">{weather.windSpeed} km/h</div>
      </div>

      <div className="metric-card">
        <div className="metric-top">
          <span>☀️</span>
          <span>UV Index</span>
        </div>
        <div className="metric-value">{weather.uvIndex} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>({weather.uvText})</span></div>
      </div>

      <div className="metric-card">
        <div className="metric-top">
          <span>⏲️</span>
          <span>Air Pressure</span>
        </div>
        <div className="metric-value">{weather.pressure} hPa</div>
      </div>
    </div>
  );
}
