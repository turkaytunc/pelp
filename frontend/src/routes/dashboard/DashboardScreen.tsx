import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dashboard } from 'src/components';
import { Store } from 'src/context/Store';
import { validateUser } from 'src/util';

const DashboardScreen = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const [fetchError, setFetchError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await validateUser();
        const data = await response.json();
        if (response.status === 200) {
          dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: true } });
          return;
        }
        history.push('/auth/signin');
      } catch (error) {
        setFetchError(error.message);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUser();
      return;
    }

    history.push('/auth/signin');
  }, []);

  return (
    <div>
      {state.user.isAuth && <Dashboard name={state.user.name} email={state.user.email} />}
      {fetchError}
    </div>
  );
};

export default DashboardScreen;
