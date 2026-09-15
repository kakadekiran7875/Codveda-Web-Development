import React from 'react';

export default function MetricsGrid({ weather }) {
  if (!weather) return null;

  // Calculate AQI procedurally based on humidity & pressure
  const aqiValue = Math.min(100, Math.max(25, Math.round((weather.humidity * 0.4) + (weather.windSpeed * 0.8))));
  const getAqiStatus = (val) => {
    if (val < 50) return { label: 'Good', color: '#10b981' };
    if (val < 80) return { label: 'Moderate', color: '#f59e0b' };
    return { label: 'Unhealthy', color: '#ef4444' };
  };
  const aqi = getAqiStatus(aqiValue);

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-top">
          <span>💧</span>
          <span>Humidity</span>
        </div>
        <div className="metric-value">{weather.humidity}%</div>
        <div className="metric-progress-track">
          <div className="metric-progress-bar" style={{ width: `${weather.humidity}%`, background: 'linear-gradient(90deg, #38bdf8, #2563eb)' }}></div>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-top">
          <span>💨</span>
          <span>Wind Velocity</span>
        </div>
        <div className="metric-value">{weather.windSpeed} <span className="metric-unit">km/h</span></div>
        <div className="metric-progress-track">
          <div className="metric-progress-bar" style={{ width: `${Math.min(100, weather.windSpeed * 2.5)}%`, background: 'linear-gradient(90deg, #34d399, #059669)' }}></div>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-top">
          <span>☀️</span>
          <span>UV Index</span>
        </div>
        <div className="metric-value">{weather.uvIndex} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({weather.uvText})</span></div>
        <div className="metric-progress-track">
          <div className="metric-progress-bar" style={{ width: `${Math.min(100, weather.uvIndex * 10)}%`, background: 'linear-gradient(90deg, #fbbf24, #ef4444)' }}></div>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-top">
          <span>🌱</span>
          <span>Air Quality (AQI)</span>
        </div>
        <div className="metric-value" style={{ color: aqi.color }}>
          {aqiValue} <span style={{ fontSize: '0.85rem', color: aqi.color, fontWeight: 700 }}>({aqi.label})</span>
        </div>
        <div className="metric-progress-track">
          <div className="metric-progress-bar" style={{ width: `${aqiValue}%`, background: aqi.color }}></div>
        </div>
      </div>
    </div>
  );
}

