import React, { useContext, useEffect } from 'react';
import './home-screen.scss';
import { Store } from 'src/context/Store';
import { validateUser } from 'src/util';
import { Header, AddRestaurant, RestaurantList } from '../../components';

const HomeScreen = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await validateUser();
      const data = await response.json();

      if (response.status === 200) {
        dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: true } });
      } else {
        dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: false } });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="home-screen">
      <Header />
      {state.user.isAuth && <AddRestaurant />}
      <RestaurantList />
    </div>
  );
};

export default HomeScreen;
