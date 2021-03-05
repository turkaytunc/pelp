import React, { useState } from 'react';
import { addRestaurant } from '../../util/index';
import './add-restaurant.scss';

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
      <form className="add-restaurant-form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <label className="add-restaurant-label" htmlFor="restaurant-name">
          <p>Restaurant Name</p>
          <input
            type="text"
            name="restaurant-name"
            id="restaurant-name"
            value={restaurantName}
            onChange={(event) => setRestaurantName(event.target.value)}
          />
        </label>
        <label className="add-restaurant-label" htmlFor="restaurant-location">
          <p>Restaurant Location</p>
          <input
            type="text"
            name="restaurant-location"
            id="restaurant-location"
            value={restaurantLocation}
            onChange={(event) => setRestaurantLocation(event.target.value)}
          />
        </label>
        <label className="add-restaurant-label" htmlFor="restaurant-price">
          <p>Restaurant Price</p>
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
