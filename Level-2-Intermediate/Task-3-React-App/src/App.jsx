import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import MetricsGrid from './components/MetricsGrid';
import ForecastCard from './components/ForecastCard';
import './App.css';

// Pre-seeded multi-city meteorological registry for 100% reliable offline/online demos
const CITY_DATABASE = {
  mumbai: {
    city: 'Mumbai',
    country: 'India',
    localTime: '16:30 IST',
    temperature: 31,
    feelsLike: 36,
    condition: 'Humid & Sunny',
    icon: '☀️',
    description: 'Scattered cloud cover with warm coastal sea breeze',
    humidity: 78,
    windSpeed: 18,
    uvIndex: 8,
    uvText: 'Very High',
    pressure: 1010,
    forecast: [
      { day: 'Sat', condition: 'Sunny', icon: '☀️', maxTemp: 32, minTemp: 26 },
      { day: 'Sun', condition: 'Thunderstorm', icon: '⛈️', maxTemp: 29, minTemp: 24 },
      { day: 'Mon', condition: 'Rain', icon: '🌧️', maxTemp: 28, minTemp: 23 },
      { day: 'Tue', condition: 'Partly Cloudy', icon: '⛅', maxTemp: 30, minTemp: 25 },
      { day: 'Wed', condition: 'Sunny', icon: '☀️', maxTemp: 33, minTemp: 26 },
    ]
  },
  london: {
    city: 'London',
    country: 'United Kingdom',
    localTime: '12:00 BST',
    temperature: 18,
    feelsLike: 17,
    condition: 'Light Showers',
    icon: '🌦️',
    description: 'Intermittent precipitation with moderate westerly winds',
    humidity: 68,
    windSpeed: 22,
    uvIndex: 3,
    uvText: 'Moderate',
    pressure: 1015,
    forecast: [
      { day: 'Sat', condition: 'Cloudy', icon: '☁️', maxTemp: 19, minTemp: 12 },
      { day: 'Sun', condition: 'Sunny', icon: '☀️', maxTemp: 21, minTemp: 13 },
      { day: 'Mon', condition: 'Light Rain', icon: '🌧️', maxTemp: 17, minTemp: 11 },
      { day: 'Tue', condition: 'Windy', icon: '💨', maxTemp: 16, minTemp: 10 },
      { day: 'Wed', condition: 'Clear', icon: '🌤️', maxTemp: 20, minTemp: 12 },
    ]
  },
  newyork: {
    city: 'New York',
    country: 'United States',
    localTime: '07:00 EDT',
    temperature: 24,
    feelsLike: 25,
    condition: 'Clear Sky',
    icon: '🌤️',
    description: 'Crisp morning with clear visibility across the metropolitan area',
    humidity: 52,
    windSpeed: 14,
    uvIndex: 6,
    uvText: 'High',
    pressure: 1020,
    forecast: [
      { day: 'Sat', condition: 'Sunny', icon: '☀️', maxTemp: 26, minTemp: 18 },
      { day: 'Sun', condition: 'Partly Cloudy', icon: '⛅', maxTemp: 25, minTemp: 19 },
      { day: 'Mon', condition: 'Showers', icon: '🌧️', maxTemp: 22, minTemp: 16 },
      { day: 'Tue', condition: 'Sunny', icon: '☀️', maxTemp: 27, minTemp: 17 },
      { day: 'Wed', condition: 'Clear', icon: '🌤️', maxTemp: 26, minTemp: 18 },
    ]
  },
  tokyo: {
    city: 'Tokyo',
    country: 'Japan',
    localTime: '20:00 JST',
    temperature: 22,
    feelsLike: 22,
    condition: 'Partly Cloudy',
    icon: '⛅',
    description: 'Mild evening with calm winds and gentle humidity',
    humidity: 62,
    windSpeed: 10,
    uvIndex: 1,
    uvText: 'Low',
    pressure: 1012,
    forecast: [
      { day: 'Sat', condition: 'Clear', icon: '☀️', maxTemp: 25, minTemp: 18 },
      { day: 'Sun', condition: 'Rain', icon: '🌧️', maxTemp: 21, minTemp: 17 },
      { day: 'Mon', condition: 'Overcast', icon: '☁️', maxTemp: 23, minTemp: 18 },
      { day: 'Tue', condition: 'Sunny', icon: '☀️', maxTemp: 26, minTemp: 19 },
      { day: 'Wed', condition: 'Partly Cloudy', icon: '⛅', maxTemp: 24, minTemp: 18 },
    ]
  },
  paris: {
    city: 'Paris',
    country: 'France',
    localTime: '13:00 CEST',
    temperature: 20,
    feelsLike: 19,
    condition: 'Sunny & Breezy',
    icon: '☀️',
    description: 'Pleasant afternoon with clear blue skies across Île-de-France',
    humidity: 50,
    windSpeed: 12,
    uvIndex: 4,
    uvText: 'Moderate',
    pressure: 1018,
    forecast: [
      { day: 'Sat', condition: 'Sunny', icon: '☀️', maxTemp: 22, minTemp: 14 },
      { day: 'Sun', condition: 'Partly Cloudy', icon: '⛅', maxTemp: 21, minTemp: 13 },
      { day: 'Mon', condition: 'Showers', icon: '🌦️', maxTemp: 18, minTemp: 12 },
      { day: 'Tue', condition: 'Clear', icon: '🌤️', maxTemp: 23, minTemp: 15 },
      { day: 'Wed', condition: 'Sunny', icon: '☀️', maxTemp: 24, minTemp: 15 },
    ]
  },
  dubai: {
    city: 'Dubai',
    country: 'United Arab Emirates',
    localTime: '15:00 GST',
    temperature: 38,
    feelsLike: 44,
    condition: 'Extreme Sun',
    icon: '☀️',
    description: 'Hot desert winds with high thermal index across the city',
    humidity: 45,
    windSpeed: 20,
    uvIndex: 11,
    uvText: 'Extreme',
    pressure: 1008,
    forecast: [
      { day: 'Sat', condition: 'Sunny', icon: '☀️', maxTemp: 39, minTemp: 30 },
      { day: 'Sun', condition: 'Clear', icon: '🌤️', maxTemp: 38, minTemp: 29 },
      { day: 'Mon', condition: 'Hazy Sun', icon: '☀️', maxTemp: 40, minTemp: 31 },
      { day: 'Tue', condition: 'Sunny', icon: '☀️', maxTemp: 39, minTemp: 30 },
      { day: 'Wed', condition: 'Clear', icon: '☀️', maxTemp: 41, minTemp: 32 },
    ]
  },
  sydney: {
    city: 'Sydney',
    country: 'Australia',
    localTime: '21:00 AEST',
    temperature: 16,
    feelsLike: 15,
    condition: 'Crisp & Clear',
    icon: '🌙',
    description: 'Starlit evening with south-easterly oceanic breezes',
    humidity: 60,
    windSpeed: 15,
    uvIndex: 0,
    uvText: 'Low',
    pressure: 1022,
    forecast: [
      { day: 'Sat', condition: 'Sunny', icon: '☀️', maxTemp: 20, minTemp: 12 },
      { day: 'Sun', condition: 'Cloudy', icon: '☁️', maxTemp: 18, minTemp: 11 },
      { day: 'Mon', condition: 'Rain', icon: '🌧️', maxTemp: 16, minTemp: 10 },
      { day: 'Tue', condition: 'Clear', icon: '🌤️', maxTemp: 21, minTemp: 13 },
      { day: 'Wed', condition: 'Sunny', icon: '☀️', maxTemp: 22, minTemp: 14 },
    ]
  }
};

const FEATURED_CITIES = [
  { name: 'Mumbai', flag: '🇮🇳' },
  { name: 'London', flag: '🇬🇧' },
  { name: 'New York', flag: '🇺🇸' },
  { name: 'Tokyo', flag: '🇯🇵' },
  { name: 'Paris', flag: '🇫🇷' },
  { name: 'Dubai', flag: '🇦🇪' },
  { name: 'Sydney', flag: '🇦🇺' }
];

export default function App() {
  const [currentCityKey, setCurrentCityKey] = useState('mumbai');
  const [weatherData, setWeatherData] = useState(CITY_DATABASE.mumbai);
  const [unit, setUnit] = useState('C'); // 'C' or 'F'
  const [recentSearches, setRecentSearches] = useState(['Mumbai', 'London', 'New York', 'Tokyo']);

  const getConditionTheme = (cond) => {
    const c = (cond || '').toLowerCase();
    if (c.includes('rain') || c.includes('shower')) return 'theme-rain';
    if (c.includes('sun') || c.includes('clear')) return 'theme-sunny';
    if (c.includes('thunder') || c.includes('storm')) return 'theme-storm';
    if (c.includes('cloud') || c.includes('overcast')) return 'theme-cloudy';
    return 'theme-default';
  };

  const handleSearch = (cityName) => {
    const key = cityName.toLowerCase().replace(/\s+/g, '');
    if (CITY_DATABASE[key]) {
      setCurrentCityKey(key);
      setWeatherData(CITY_DATABASE[key]);
      updateRecents(CITY_DATABASE[key].city);
    } else {
      // Procedurally generate realistic metrics for any city name searched
      const randomTemp = Math.floor(Math.random() * 20) + 15;
      const customWeather = {
        city: cityName.charAt(0).toUpperCase() + cityName.slice(1),
        country: 'Global Region',
        localTime: 'Current Local',
        temperature: randomTemp,
        feelsLike: randomTemp + 2,
        condition: 'Clear Sky',
        icon: '☀️',
        description: 'Atmospheric conditions clear and stable',
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 25) + 5,
        uvIndex: Math.floor(Math.random() * 8) + 2,
        uvText: 'Moderate',
        pressure: 1014,
        forecast: [
          { day: 'Day 1', condition: 'Sunny', icon: '☀️', maxTemp: randomTemp + 2, minTemp: randomTemp - 5 },
          { day: 'Day 2', condition: 'Cloudy', icon: '⛅', maxTemp: randomTemp + 1, minTemp: randomTemp - 6 },
          { day: 'Day 3', condition: 'Showers', icon: '🌧️', maxTemp: randomTemp - 2, minTemp: randomTemp - 7 },
          { day: 'Day 4', condition: 'Partly Cloudy', icon: '🌤️', maxTemp: randomTemp + 3, minTemp: randomTemp - 4 },
          { day: 'Day 5', condition: 'Sunny', icon: '☀️', maxTemp: randomTemp + 4, minTemp: randomTemp - 3 },
        ]
      };
      setWeatherData(customWeather);
      updateRecents(customWeather.city);
    }
  };

  const updateRecents = (city) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, 5);
    });
  };

  return (
    <div className={`app-container ${getConditionTheme(weatherData.condition)}`}>
      {/* App Header */}
      <header className="app-header">
        <div className="brand-wrap">
          <div className="brand-icon">⛅</div>
          <div>
            <h1 className="brand-title">SkyPulse Weather</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Codveda Web Development Internship • Level 2 Task 3 (React Framework)
            </p>
          </div>
        </div>

        {/* Temperature Unit Toggle */}
        <div className="unit-toggle">
          <button
            className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
            onClick={() => setUnit('C')}
          >
            °C (Metric)
          </button>
          <button
            className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
            onClick={() => setUnit('F')}
          >
            °F (Imperial)
          </button>
        </div>
      </header>

      {/* Featured Cities Quick-Pill Bar */}
      <div className="featured-cities-bar">
        <span className="featured-label">Featured Hubs:</span>
        <div className="featured-chips-row">
          {FEATURED_CITIES.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`featured-city-chip ${weatherData.city.toLowerCase() === item.name.toLowerCase() ? 'active' : ''}`}
              onClick={() => handleSearch(item.name)}
            >
              <span>{item.flag}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <main>
        {/* Search Input Bar Component */}
        <SearchBar
          onSearch={handleSearch}
          recentSearches={recentSearches}
          onSelectRecent={handleSearch}
        />

        {/* Main Weather Information Display */}
        <div className="weather-main-grid">
          <WeatherCard weather={weatherData} unit={unit} />
          <MetricsGrid weather={weatherData} />
        </div>

        {/* 5-Day Extended Forecast Component */}
        <ForecastCard forecast={weatherData.forecast} unit={unit} />
      </main>

      <footer className="app-footer">
        <p>Built with React 18, Vite, and Component Props & State Architecture</p>
        <p style={{ marginTop: '4px' }}>Developer: <strong>Kiran Kakade</strong> • Codveda Technology Internship</p>
      </footer>
    </div>
  );
}
