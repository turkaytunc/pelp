import React, { useContext, useState } from 'react';
import './register.scss';
import { Store } from 'src/context/Store';
import { useHistory } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser, joiValidators } from 'src/util/';
import { DisplayError } from 'src/components';

const { registerValidation } = joiValidators;
const Register = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [inputError, setInputError] = useState('');
  const { dispatch } = useContext(Store);

  const history = useHistory();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await registerValidation.validateAsync({ name, email, password });
      const response = await registerUser(name, email, password);
      const data = await response.json();

      const { token, user } = data;
      if (token) {
        window.localStorage.setItem('token', token);
        dispatch({ type: 'ADD_USER', payload: { ...user, isAuth: true } });
        history.push('/');
      } else {
        setInputError(data.message);
        setPassword('');
      }
    } catch (error) {
      setInputError(error.message);
      setPassword('');
    }
  };

  return (
    <>
      <form
        className="register-form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleRegister(event)}
      >
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
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onFocus={() => setInputError('')}
          placeholder="Password"
        />
        {inputError && <DisplayError message={inputError} />}
        <button type="submit">Sign Up</button>
      </form>

      <ToastContainer transition={Zoom} />
    </>
  );
};

export default Register;
