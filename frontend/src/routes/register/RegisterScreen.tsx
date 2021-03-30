import React from 'react';
import { Link } from 'react-router-dom';
import { Register } from 'src/components';
import './register-screen.scss';

const RegisterScreen = (): React.ReactElement => {
  return (
    <div className="register-screen">
      Register Screen
      <Register />
      <Link to="/auth/login">Login</Link>
    </div>
  );
};

export default RegisterScreen;
