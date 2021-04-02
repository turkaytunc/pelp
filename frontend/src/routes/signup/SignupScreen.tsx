import React from 'react';
import { Link } from 'react-router-dom';
import { Register } from 'src/components';
import './signup-screen.scss';

const SignupScreen = (): React.ReactElement => {
  return (
    <div className="signup-screen">
      <Register />
      <div className="signin-link-container">
        <span>Already have an account?</span>
        <Link to="/auth/signin">Sign in</Link>
      </div>
    </div>
  );
};

export default SignupScreen;
