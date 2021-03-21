import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { isInputEmpty, updateRestaurantById } from 'src/util';
import { getRestaurantById } from 'src/util/getRestaurantById';
import './update-restaurant.scss';

const UpdateRestaurant = (): React.ReactElement => {
  const { id }: { id: string } = useParams();
  const history = useHistory();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(1);
  const [responseError, setResponseError] = useState('');

  const setInitialInputs = async () => {
    try {
      const response = await getRestaurantById(id);
      const data = await response.json();

      setName(data[0].name);
      setLocation(data[0].location);
      setPrice(data[0].price_range);
    } catch (error) {
      setResponseError(error.message);
    }
  };

  useEffect(() => {
    setInitialInputs();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isInputEmpty(name, location)) return;
    updateRestaurantById(id, name, location, price);
    setLocation('');
    setName('');
    setPrice(3);
    history.push('/');
  };

  return (
    <form
      data-testid="update-res-form"
      className="update-restaurant-container"
      onSubmit={(event) => handleSubmit(event)}
    >
      <input
        data-testid="update-res-name"
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Restaurant Name"
        value={name}
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
      <div>{responseError}</div>
    </form>
  );
};

export default UpdateRestaurant;
