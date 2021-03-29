import React, { useContext, useEffect, useState } from 'react';
import './restaurant-list.scss';
import { useParams } from 'react-router-dom';

import { getRestaurants } from 'src/util';
import { ActionType } from 'src/constants';
import { Store } from 'src/context/Store';

import ListCard from './list-card/ListCard';

const RestaurantList = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const [responseError, setResponseError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        const data = await response.json();
        dispatch({ type: ActionType.FETCH_RESTAURANTS, payload: data });
      } catch (error) {
        setResponseError(error.message);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="restaurant-list-container" data-testid="restaurant-list">
      {state.restaurants.length > 0 && (
        <div className="restaurant-list">
          {state.restaurants?.map((restaurant) => (
            <ListCard key={restaurant?.id} restaurant={restaurant} />
          ))}
        </div>
      )}
      <div>{responseError}</div>
    </div>
  );
};

export default RestaurantList;
