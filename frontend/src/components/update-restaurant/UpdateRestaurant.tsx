import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { isInputEmpty, updateRestaurantById } from 'src/util';
import { getRestaurantById } from 'src/util/getRestaurantById';
import './update-restaurant.scss';

const UpdateRestaurant = (): React.ReactElement => {
  const { id }: { id: string } = useParams();
  const history = useHistory();

  const [restaurantName, setRestaurantName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(1);
  const [responseError, setResponseError] = useState('');

  const setInitialInputs = async () => {
    try {
      const response = await getRestaurantById(id);
      const data = await response.json();

      setRestaurantName(data?.name);
      setLocation(data?.location);
      setPrice(data?.price_range);
    } catch (error) {
      setResponseError(error.message);
    }
  };

  useEffect(() => {
    setInitialInputs();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isInputEmpty(restaurantName, location)) return;

      const response = await updateRestaurantById(id, restaurantName, location, price);
      setLocation('');
      setRestaurantName('');
      setPrice(3);
      if (response.status === 201) {
        history.push('/');
        return;
      }
      const data = await response.json();
      setResponseError(data.message);
    } catch (error) {
      setResponseError(error.message);
      setLocation('');
      setRestaurantName('');
      setPrice(3);
    }
  };

  return (
    <form
      data-testid="update-res-form"
      className="update-restaurant-container"
      onSubmit={(event) => handleSubmit(event)}
    >
      <input
        data-testid="update-res-name"
        onChange={(event) => setRestaurantName(event.target.value)}
        type="text"
        placeholder="Restaurant Name"
        value={restaurantName}
      />
      <input
        data-testid="update-res-location"
        onChange={(event) => setLocation(event.target.value)}
        type="text"
        placeholder="Restaurant Location"
        value={location}
      />
      <label htmlFor="restaurant-price">
        Restaurant Price
        <input
          data-testid="update-res-price"
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
      {responseError}
    </form>
  );
};

export default UpdateRestaurant;
