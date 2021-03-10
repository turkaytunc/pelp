import React from 'react';
import './restaurant-list.scss';

const RestaurantList = (): React.ReactElement => (
  <div className="restaurant-list">
    <li className="restaurant-list-listitem">list item 1</li>
    <li className="restaurant-list-listitem">list item 2</li>
    <li className="restaurant-list-listitem">list item 3</li>
  </div>
);

export default RestaurantList;
