import React, { useContext, useEffect, useState } from 'react';
import './login.scss';
import { Store } from 'src/context/Store';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToastConfig, isInputEmpty, loginUser, validateUser } from 'src/util/';

const Login = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState('');
  const { state, dispatch } = useContext(Store);

  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await validateUser();
      const data = await response.json();

      if (response.status === 200) {
        dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: true } });
        history.push('/dashboard');
      } else {
        dispatch({ type: 'ADD_USER', payload: { ...data, isAuth: false } });
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isInputEmpty(email, password)) {
        setInputError("Please don't left inputs empty!");
        return;
      }
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
      } else {
        setInputError(data.message);
      }
    } catch (error) {
      setInputError(error.message);
    } finally {
      setEmail('');
      setPassword('');
    }
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
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Password"
        />
        {inputError}
        <button type="submit">Sign In</button>
      </form>

      <ToastContainer transition={Zoom} />
    </>
  );
};

export default Login;
