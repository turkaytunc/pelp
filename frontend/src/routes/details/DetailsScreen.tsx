import React from 'react';
import { RestaurantDetails } from 'src/components/';
import './details-screen.scss';

const DetailsScreen = (): React.ReactElement => (
  <div className="details-screen-container">
    <RestaurantDetails />
  </div>
);

export default DetailsScreen;
