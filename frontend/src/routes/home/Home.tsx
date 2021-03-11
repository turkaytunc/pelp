import React from 'react';
import './home.scss';
import { Header, AddRestaurant, RestaurantList } from '../../components';

const Home = (): React.ReactElement => (
  <div className="home-screen">
    <Header />
    <AddRestaurant />
    <RestaurantList />
  </div>
);

export default Home;
