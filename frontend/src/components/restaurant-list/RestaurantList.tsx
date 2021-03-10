import React, { useEffect, useState } from 'react';
import './restaurant-list.scss';

import { API_URL, Restaurant } from '../../type-helpers';
import { getRestaurants } from '../../util';
import ListCard from './list-card/ListCard';

const RestaurantList = (): React.ReactElement => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    getRestaurants(`${API_URL}/restaurants`, window.fetch)
      .then((data) => data.json())
      .then((data) => setRestaurants(data));
  }, []);

  const renderRestaurantList = () => restaurants?.map((restaurant) => <ListCard restaurant={restaurant} />);

  return (
    <div className="restaurant-list">
      {restaurants && renderRestaurantList()}
      <li className="restaurant-list-listitem">list item 1</li>
      <li className="restaurant-list-listitem">list item 2</li>
      <li className="restaurant-list-listitem">list item 3</li>
    </div>
  );
};

export default RestaurantList;
