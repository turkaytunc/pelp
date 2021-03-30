import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dashboard } from 'src/components';
import { Store } from 'src/context/Store';
import { validateUser } from 'src/util';

const DashboardScreen = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await validateUser();
      const data = await response.json();
      if (response.status === 200) {
        dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: true } });
      } else {
        history.push('/auth/login');
      }
    };
    fetchUser();
  }, []);

  return <div>{state.user.isAuth && <Dashboard name={state.user.name} email={state.user.email} />}</div>;
};

export default DashboardScreen;
