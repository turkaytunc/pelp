import React, { useState } from 'react';
import { addRestaurant } from 'src/util';
import './add-restaurant.scss';

const AddRestaurant = (): React.ReactElement => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');
  const [restaurantPrice, setRestaurantPrice] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (restaurantPrice === '' || restaurantLocation === '' || restaurantName === '') return;
    addRestaurant(restaurantName, restaurantLocation, parseInt(restaurantPrice, 10), window.fetch);
    setRestaurantPrice('');
    setRestaurantName('');
    setRestaurantLocation('');
  };

  return (
    <div>
      <form className="add-restaurant-form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <input
          type="text"
          name="restaurant-name"
          id="restaurant-name"
          value={restaurantName}
          onChange={(event) => setRestaurantName(event.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          name="restaurant-location"
          id="restaurant-location"
          value={restaurantLocation}
          onChange={(event) => setRestaurantLocation(event.target.value)}
          placeholder="Location"
        />
        <input
          type="text"
          name="restaurant-price"
          id="restaurant-price"
          value={restaurantPrice}
          onChange={(event) => setRestaurantPrice(event.target.value)}
          placeholder="Price"
        />
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
