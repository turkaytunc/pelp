import React, { useContext, useState } from 'react';
import { ActionType } from 'src/constants';
import { Store } from 'src/context/Store';
import { addRestaurant, convertFirstLetterToUpperCase, isInputEmpty, joiValidators } from 'src/util';
import { DisplayError } from 'src/components/';
import './add-restaurant.scss';

const { restaurantValidation } = joiValidators;

const AddRestaurant = (): React.ReactElement => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');
  const [restaurantPrice, setRestaurantPrice] = useState('');
  const [inputError, setInputError] = useState('');
  const { state, dispatch } = useContext(Store);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await restaurantValidation.validateAsync({
        restaurantName,
        restaurantLocation,
        restaurantPrice,
      });

      const response = await addRestaurant(
        convertFirstLetterToUpperCase(restaurantName),
        convertFirstLetterToUpperCase(restaurantLocation),
        parseInt(restaurantPrice, 10)
      );

      if (response.status === 201) {
        const data = await response.json();

        dispatch({
          type: ActionType.ADD_RESTAURANT,
          payload: {
            ...data,
          },
        });
      }

      setRestaurantPrice('');
      setRestaurantName('');
      setRestaurantLocation('');
    } catch (error) {
      setInputError(error.message);
    }
  };

  return (
    <>
      <form
        data-testid="res-add-form"
        className="add-restaurant-form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}
      >
        <input
          data-testid="res-name-input"
          type="text"
          name="restaurant-name"
          id="restaurant-name"
          value={restaurantName}
          onChange={(event) => setRestaurantName(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Name"
        />
        <input
          data-testid="res-location-input"
          type="text"
          name="restaurant-location"
          id="restaurant-location"
          value={restaurantLocation}
          onChange={(event) => setRestaurantLocation(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Location"
        />
        <input
          data-testid="res-price-input"
          type="text"
          name="restaurant-price"
          id="restaurant-price"
          value={restaurantPrice}
          onChange={(event) => setRestaurantPrice(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Price"
        />
        {inputError && <DisplayError message={inputError} />}
        <button type="submit">Add Restaurant</button>
      </form>
    </>
  );
};

export default AddRestaurant;
