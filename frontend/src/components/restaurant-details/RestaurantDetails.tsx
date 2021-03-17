import React from 'react';
import { StarRate } from 'src/components';
import './restaurant-details.scss';

const RestaurantDetails = (): React.ReactElement => {
  return (
    <div className="restaurant-details-container">
      <StarRate rating={5} />
    </div>
  );
};

export default RestaurantDetails;
