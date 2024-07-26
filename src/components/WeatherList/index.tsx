import React, { useState } from 'react';
import { Weather, weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";

const WeatherList: React.FC = () => {
  const [unit, setUnit] = useState<"C" | "F">("C")
  const [searchVal, setSearchVal] = useState('')
  const [favorites, setFavorites] = useState<Weather[] | []>([])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value.toLowerCase()) 
  };

  const handleClearSearch = () => { 
    setSearchVal("")
  };


  const handleUnitChange = () => { 
    if (unit === "C") {
      setUnit("F")
    } else {
      setUnit("C")
    }

  };

  const handleAddFavorite = (cityId: number) => {
    const cityToAdd = weatherData.find(place => place.id === cityId)!
    const newFavorites = [...favorites, cityToAdd]
    setFavorites(newFavorites)

  };

  const handleRemoveFavorite = (cityId: number) => {
    console.log([...favorites])
    const newFavorites = [...favorites].filter(place => place.id !== cityId)
    setFavorites(newFavorites)
  };

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            value={searchVal}
            placeholder="Search city"
            onChange={handleSearch}
            data-testid="search-input"
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.filter(place => place.city.toLowerCase().includes(searchVal)).map(place => (
            <WeatherCard
              key={place.id}
              weather={place}
              unit={unit}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorite={favorites.some(fave => fave.id === place.id)}
            />
            ))}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
            Switch to {unit === "C" ? 'Fahrenheit' : "Celsius"}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.length > 0 &&
              favorites.map(place => (
            <WeatherCard
              key={`favorite-${place.id}`}
              weather={place}
              unit={unit}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorite={favorites.some(fave => fave.id === place.id)}
            />

              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
