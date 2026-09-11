import React from 'react';

export default function ForecastCard({ forecast, unit }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <section className="forecast-section">
      <h3 className="section-heading">
        <span>📅</span> 5-Day Meteorological Forecast
      </h3>
      <div className="forecast-grid">
        {forecast.map((item, index) => {
          const max = unit === 'C' ? item.maxTemp : Math.round((item.maxTemp * 9) / 5 + 32);
          const min = unit === 'C' ? item.minTemp : Math.round((item.minTemp * 9) / 5 + 32);

          return (
            <div key={index} className="forecast-day-card">
              <div className="forecast-day">{item.day}</div>
              <div className="forecast-icon">{item.icon}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {item.condition}
              </div>
              <div className="forecast-temps">
                <span className="temp-max">{max}°</span>
                <span className="temp-min">{min}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
