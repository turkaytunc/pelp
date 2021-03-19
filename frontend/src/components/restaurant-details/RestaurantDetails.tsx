import React from 'react';
import './restaurant-details.scss';
import { ReviewCard, StarRate } from 'src/components';

const RestaurantDetails = (): React.ReactElement => {
  return (
    <div className="restaurant-details-container">
      <StarRate rating={1.2} />
      <ReviewCard rating={3} />
    </div>
  );
};

export default RestaurantDetails;
