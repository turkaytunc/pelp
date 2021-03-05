import React, { useState } from 'react';
import { addRestaurant } from '../../util/index';

const AddRestaurant = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');
  const [restaurantPrice, setRestaurantPrice] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addRestaurant(restaurantName, restaurantLocation, parseInt(restaurantPrice), window.fetch);
  };

  return (
    <div>
      <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <label htmlFor="restaurant-name">
          <input
            type="text"
            name="restaurant-name"
            id="restaurant-name"
            value={restaurantName}
            onChange={(event) => setRestaurantName(event.target.value)}
          />
        </label>
        <label htmlFor="restaurant-location">
          <input
            type="text"
            name="restaurant-location"
            id="restaurant-location"
            value={restaurantLocation}
            onChange={(event) => setRestaurantLocation(event.target.value)}
          />
        </label>
        <label htmlFor="restaurant-price">
          <input
            type="text"
            name="restaurant-price"
            id="restaurant-price"
            value={restaurantPrice}
            onChange={(event) => setRestaurantPrice(event.target.value)}
          />
        </label>
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
