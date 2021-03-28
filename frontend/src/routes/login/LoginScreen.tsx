import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Store } from 'src/context/Store';

const LoginScreen = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const history = useHistory();
  const user = { name: 'random name', email: 'user@user.com', isAuth: true };
  const handleLogin = () => {
    dispatch({ type: 'ADD_USER', payload: user });
    history.push('/');
  };

  return (
    <div>
      Login Screen
      <button type="button" onClick={() => handleLogin()}>
        log me in
      </button>
    </div>
  );
};

export default LoginScreen;
