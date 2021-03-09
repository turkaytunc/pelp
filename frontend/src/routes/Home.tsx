import React from 'react';

import { Header, AddRestaurant, RestaurantList } from '../components/index';

const Home = (): React.ReactElement => (
  <div>
    <Header />
    <AddRestaurant />
    <RestaurantList />
  </div>
);

export default Home;
