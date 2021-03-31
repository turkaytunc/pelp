import React from 'react';
import { Link } from 'react-router-dom';
import { Register } from 'src/components';
import './register-screen.scss';

const RegisterScreen = (): React.ReactElement => {
  return (
    <div className="register-screen">
      Register Screen
      <Register />
      <div className="login-link-container">
        <span>Already have an account?</span>
        <Link to="/auth/login">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
