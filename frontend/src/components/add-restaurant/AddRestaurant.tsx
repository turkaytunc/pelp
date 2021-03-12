import React, { useContext, useState } from 'react';
import { ActionType } from 'src/constants';
import { Store } from 'src/context/Store';
import { addRestaurant, convertFirstLetterToUpperCase, isInputEmpty } from 'src/util';
import './add-restaurant.scss';

const AddRestaurant = (): React.ReactElement => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');
  const [restaurantPrice, setRestaurantPrice] = useState('');
  const [inputError, setInputError] = useState('');
  const { state, dispatch } = useContext(Store);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isInputEmpty(restaurantName, restaurantPrice, restaurantLocation)) {
      setInputError("Please don't left input fields blank!");
      return;
    }

    addRestaurant(
      convertFirstLetterToUpperCase(restaurantName),
      convertFirstLetterToUpperCase(restaurantLocation),
      parseInt(restaurantPrice, 10),
      window.fetch
    )
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data !== null) {
          dispatch({
            type: ActionType.ADD_RESTAURANT,
            payload: {
              ...data,
            },
          });
        }
      });

    setRestaurantPrice('');
    setRestaurantName('');
    setRestaurantLocation('');
  };

  return (
    <>
      <form className="add-restaurant-form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <input
          type="text"
          name="restaurant-name"
          id="restaurant-name"
          value={restaurantName}
          onChange={(event) => setRestaurantName(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Name"
        />
        <input
          type="text"
          name="restaurant-location"
          id="restaurant-location"
          value={restaurantLocation}
          onChange={(event) => setRestaurantLocation(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Location"
        />
        <input
          type="text"
          name="restaurant-price"
          id="restaurant-price"
          value={restaurantPrice}
          onChange={(event) => setRestaurantPrice(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Price"
        />
        {inputError}
        <button type="submit">Add Restaurant</button>
      </form>
    </>
  );
};

export default AddRestaurant;
