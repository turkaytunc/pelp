import React, { useContext, useState } from 'react';
import './register.scss';
import { Store } from 'src/context/Store';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToastConfig, isInputEmpty, registerUser } from 'src/util/';

const Register = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [inputError, setInputError] = useState('');
  const { state, dispatch } = useContext(Store);

  const history = useHistory();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isInputEmpty(name, email, password)) {
        setInputError("Please don't left inputs empty!");
        return;
      }
      const response = await registerUser(name, email, password);
      const data = await response.json();

      const { token, user } = data;
      if (token) {
        window.localStorage.setItem('token', token);
        dispatch({ type: 'ADD_USER', payload: { ...user, isAuth: true } });
        history.push('/');
      } else {
        setInputError(data.message);
      }
    } catch (error) {
      setInputError(error.message);
    } finally {
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <form className="register-form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleRegister(event)}>
        <input
          className="name-input"
          data-testid="register-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Name"
        />
        <input
          className="email-input"
          data-testid="register-email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Email"
        />
        <input
          className="password-input"
          data-testid="register-password"
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Password"
        />
        {inputError}
        <button type="submit">Sign Up</button>
      </form>

      <ToastContainer transition={Zoom} />
    </>
  );
};

export default Register;
