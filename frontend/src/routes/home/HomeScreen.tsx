import React, { useContext, useEffect, useState } from 'react';
import './home-screen.scss';
import { Store } from 'src/context/Store';
import { validateUser } from 'src/util';
import { Header, AddRestaurant, RestaurantList } from '../../components';

const HomeScreen = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await validateUser();
        const data = await response.json();

        if (response.status === 200) {
          dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: true } });
          return;
        }
        dispatch({ type: 'ADD_USER', payload: { ...state.user, isAuth: false } });
      } catch (error) {
        setFetchError(error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="home-screen" data-testid="home-screen-container">
      <Header />
      {state.user.isAuth && <AddRestaurant />}
      <RestaurantList />
    </div>
  );
};

export default HomeScreen;
