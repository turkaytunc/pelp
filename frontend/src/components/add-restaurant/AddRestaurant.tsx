import React, { useState } from 'react';
import { addRestaurant } from '../../util/index';

const AddRestaurant = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addRestaurant('metin usta', 'Edirne', 4, window.fetch);
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
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
