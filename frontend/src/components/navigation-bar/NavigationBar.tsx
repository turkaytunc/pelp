import React from 'react';
import './navigation-bar.scss';

const NavigationBar = (): React.ReactElement => {
  return (
    <div className="navigation-bar-container">
      <section>
        <img src="#" alt="company logo with ocean" />
      </section>
      <section>
        <ul>
          <li>Dashboard</li>
          <li>Sign in</li>
          <li>Sign up </li>
        </ul>
      </section>
    </div>
  );
};

export default NavigationBar;
