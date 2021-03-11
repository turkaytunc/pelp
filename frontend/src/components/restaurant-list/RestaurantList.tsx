import React, { useEffect, useState } from 'react';
import './restaurant-list.scss';

import { getRestaurants } from 'src/util';
import { API_URL, Restaurant } from 'src/type-helpers';

import ListCard from './list-card/ListCard';

const RestaurantList = (): React.ReactElement => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    getRestaurants(`${API_URL}/restaurants`, window.fetch)
      .then((data) => data.json())
      .then((data) => setRestaurants(data));
  }, []);

  const renderRestaurantList = () =>
    restaurants?.map((restaurant) => <ListCard key={restaurant.id} restaurant={restaurant} />);

  return (
    <div className="restaurant-list-container">
      {restaurants && <div className="restaurant-list">{renderRestaurantList()}</div>}
      <li className="restaurant-list-listitem">list item 1</li>
      <li className="restaurant-list-listitem">list item 2</li>
      <li className="restaurant-list-listitem">list item 3</li>
    </div>
  );
};

export default RestaurantList;
