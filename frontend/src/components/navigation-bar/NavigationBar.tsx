import React, { useContext } from 'react';
import { FaYelp } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { Store } from 'src/context/Store';
import './navigation-bar.scss';

const NavigationBar = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const history = useHistory();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.location.assign('/pern-stack-yelp');
  };

  return (
    <div className="navigation-bar-container">
      <section className="nav-section-logo">
        <Link to="/">
          <FaYelp size={30} fill="rgb(200, 40, 90)" />
        </Link>
      </section>
      <section className="nav-section-links">
        {state.user.isAuth ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth/login">Sign in</Link>
        )}
      </section>
    </div>
  );
};

export default NavigationBar;
