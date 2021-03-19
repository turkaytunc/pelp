import React from 'react';
import './restaurant-details.scss';
import { AddReview, ReviewCard, StarRate } from 'src/components';

const RestaurantDetails = (): React.ReactElement => {
  return (
    <div className="restaurant-details-container">
      <header>Restaurant Details</header>
      <StarRate rating={3.3} />
      <div className="restaurant-details-card-grid">
        <ReviewCard rating={5} />
        <ReviewCard rating={4} />
        <ReviewCard rating={2} />
        <ReviewCard rating={3} />
        <ReviewCard rating={5} />
      </div>
      <AddReview />
    </div>
  );
};

export default RestaurantDetails;
