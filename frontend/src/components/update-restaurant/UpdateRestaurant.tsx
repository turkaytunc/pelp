import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API_URL } from 'src/constants';
import { Store } from 'src/context/Store';
import { isInputEmpty, updateRestaurantById } from 'src/util';
import './update-restaurant.scss';

const UpdateRestaurant = (): React.ReactElement => {
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(Store);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(1);

  const setInitialInputs = () => {
    const restaurant = state.restaurants.filter((item) => item.id === parseInt(id, 10));
    if (restaurant[0]) {
      setName(restaurant[0].name);
      setLocation(restaurant[0].location);
      setPrice(restaurant[0].priceRange);
    }
  };

  useEffect(() => {
    setInitialInputs();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isInputEmpty(name, location)) return;
    updateRestaurantById(id, API_URL, name, location, price);
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
    </form>
  );
};

export default UpdateRestaurant;
