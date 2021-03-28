import React, { useContext, useState } from 'react';
import './login.scss';
import { Store } from 'src/context/Store';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToastConfig } from 'src/util/';

const Login = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState('');
  const { state, dispatch } = useContext(Store);

  const history = useHistory();
  const user = { name: 'random name', email: 'user@user.com', isAuth: true };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'ADD_USER', payload: user });

    toast(
      'Login Successful. Redirecting to Home',
      createToastConfig(() => history.push('/'))
    );
  };

  return (
    <>
      <form className="login-form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleLogin(event)}>
        <input
          className="email-input"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Email"
        />
        <input
          className="password-input"
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Password"
        />
        {inputError}
        <button type="submit">Login</button>
      </form>

      <ToastContainer transition={Zoom} />
    </>
  );
};

export default Login;
