import React, { useContext, useEffect } from 'react';
import './home-screen.scss';
import { Store } from 'src/context/Store';
import { Link, useHistory } from 'react-router-dom';
import { validateUser } from 'src/util';
import { Header, AddRestaurant, RestaurantList } from '../../components';

const HomeScreen = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);

  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await validateUser();
      const data = await response.json();

      if (response.status === 200) {
        dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: true } });
      }
      if (response.status === 403) {
        dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: false } });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="home-screen">
      <Header />

      <Link className="home-screen-link" to="/dashboard">
        dashboard
      </Link>

      {state.user.isAuth && <AddRestaurant />}
      <RestaurantList />
    </div>
  );
};

export default HomeScreen;
