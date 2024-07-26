import React from 'react';
import { Weather } from '../../data/weatherData';

interface WeatherCardProps {
  weather: Weather;
  unit: 'C' | 'F';
  onAddFavorite: (cityId: number) => void;
  onRemoveFavorite: (cityId: number) => void;
  isFavorite: boolean;
}

const celsiusToF = (celsius: number) => {
  return Math.floor(((celsius * (9/5)) + 32) * 10) / 10
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  unit,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {

  const handleFavoriteClick = (cityId: number) => {
    if (isFavorite) {
      onRemoveFavorite(cityId)
    } else {
      onAddFavorite(cityId)
    }

  };

  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}`}>
      <td>{weather.city}</td>
      <td>{unit ==="C" ? `${weather.temperature}°C` : `${celsiusToF(weather.temperature)}°F`} </td>
      <td>{weather.description}</td>
      <td>
        <button onClick={() => handleFavoriteClick(weather.id)} data-testid={`weather-card-action-${weather.id}`}>
          {isFavorite ? "Remove from Favorites" : "Add to favorites"}
        </button>
      </td>
    </tr>
  );
};

export default WeatherCard;

