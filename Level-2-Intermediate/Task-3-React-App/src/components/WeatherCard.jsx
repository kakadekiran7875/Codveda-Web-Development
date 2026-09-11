import React from 'react';

export default function WeatherCard({ weather, unit }) {
  if (!weather) return null;

  const displayTemp = unit === 'C' 
    ? Math.round(weather.temperature) 
    : Math.round((weather.temperature * 9) / 5 + 32);

  const displayFeelsLike = unit === 'C'
    ? Math.round(weather.feelsLike)
    : Math.round((weather.feelsLike * 9) / 5 + 32);

  return (
    <div className="current-weather-card">
      <div className="weather-header">
        <div>
          <h2 className="city-name">{weather.city}</h2>
          <div className="city-country">{weather.country} • {weather.localTime}</div>
        </div>
        <div className="weather-condition-badge">
          {weather.icon} {weather.condition}
        </div>
      </div>

      <div className="temp-large-display">
        <div className="temp-number">{displayTemp}</div>
        <div className="temp-symbol">°{unit}</div>
      </div>

      <div className="feels-like">
        Feels like <strong>{displayFeelsLike}°{unit}</strong> • {weather.description}
      </div>
    </div>
  );
}
