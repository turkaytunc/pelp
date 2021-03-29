import React from 'react';
import { Register } from 'src/components';
import './register-screen.scss';

const RegisterScreen = (): React.ReactElement => {
  return (
    <div className="register-screen">
      Register Screen
      <Register />
    </div>
  );
};

export default RegisterScreen;
