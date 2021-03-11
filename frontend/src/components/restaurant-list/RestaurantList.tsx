import React, { useContext, useEffect, useState } from 'react';
import './restaurant-list.scss';

import { getRestaurants } from 'src/util';
import { ActionType, API_URL } from 'src/constants';
import { Restaurant } from 'src/interfaces';
import { Store } from 'src/context/Store';

import ListCard from './list-card/ListCard';

const RestaurantList = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    getRestaurants(`${API_URL}/restaurants`, window.fetch)
      .then((data) => data.json())
      .then((data) => dispatch({ type: ActionType.FETCH_RESTAURANTS, payload: data }));
  }, []);

  return (
    <div className="restaurant-list-container">
      {state.restaurants.length > 0 && (
        <div className="restaurant-list">
          {state.restaurants?.map((restaurant) => (
            <ListCard key={restaurant?.id} restaurant={restaurant} />
          ))}
        </div>
      )}
      <li className="restaurant-list-listitem">list item 1</li>
      <li className="restaurant-list-listitem">list item 2</li>
      <li className="restaurant-list-listitem">list item 3</li>
    </div>
  );
};

export default RestaurantList;
