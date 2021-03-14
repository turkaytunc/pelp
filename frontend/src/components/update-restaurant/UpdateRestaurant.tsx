import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './update-restaurant.scss';

const UpdateRestaurant = (): React.ReactElement => {
  const { id }: { id: string } = useParams();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(1);

  return (
    <form className="update-restaurant-container">
      <input onChange={(event) => setName(event.target.value)} type="text" placeholder="Restaurant Name" value={name} />
      <input
        onChange={(event) => setLocation(event.target.value)}
        type="text"
        placeholder="Restaurant Location"
        value={location}
      />
      <label htmlFor="restaurant-price">
        Restaurant Price
        <input
          onChange={(event) => setPrice(parseInt(event.target.value, 10))}
          id="restaurant-price"
          type="range"
          min="1"
          max="5"
          name="restaurant-price"
          value={price}
        />
        {price}
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateRestaurant;
