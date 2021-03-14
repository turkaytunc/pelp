import React from 'react';
import './home-screen.scss';
import { Header, AddRestaurant, RestaurantList } from '../../components';

const HomeScreen = (): React.ReactElement => (
  <div className="home-screen">
    <Header />
    <AddRestaurant />
    <RestaurantList />
  </div>
);

export default HomeScreen;
