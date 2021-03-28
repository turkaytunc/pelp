import React, { useContext } from 'react';
import './home-screen.scss';
import { Store } from 'src/context/Store';
import { Header, AddRestaurant, RestaurantList } from '../../components';

const HomeScreen = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);

  return (
    <div className="home-screen">
      <Header />
      {state.user.isAuth && <AddRestaurant />}
      <RestaurantList />
    </div>
  );
};

export default HomeScreen;
