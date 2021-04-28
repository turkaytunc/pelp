import React, { useContext, useEffect, useState } from 'react';
import './login.scss';
import { Store } from 'src/context/Store';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToastConfig, loginUser, validateUser, joiValidators } from 'src/util/';
import { DisplayError } from 'src/components';

const { loginValidation } = joiValidators;

const Login = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState('');
  const { dispatch } = useContext(Store);

  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await validateUser();
      const data = await response.json();

      if (response.status === 200) {
        dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: true } });
        history.push('/dashboard');
        return;
      }
      dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: false } });
    };
    if (localStorage.getItem('token')) {
      fetchUser();
    }
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await loginValidation.validateAsync({ email, password });

      const response = await loginUser(email, password);
      const data = await response.json();

      const { token, user } = data;
      if (token) {
        window.localStorage.setItem('token', token);
        dispatch({ type: 'ADD_USER', payload: { ...user, isAuth: true } });

        toast(
          'Login Successful. Redirecting to Home',
          createToastConfig(() => history.push('/'))
        );
        return;
      }
      setInputError(data.message);
    } catch (error) {
      setInputError(error.message);
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <form
        className="login-form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleLogin(event)}
      >
        <input
          data-testid="login-email"
          className="email-input"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Email"
        />
        <input
          data-testid="login-password"
          className="password-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Password"
        />
        {inputError && <DisplayError message={inputError} />}
        <button type="submit">Sign In</button>
      </form>

      <ToastContainer transition={Zoom} />
    </>
  );
};

export default Login;
