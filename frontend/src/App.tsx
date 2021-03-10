import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './app.scss';
// import { FaStarHalfAlt } from 'react-icons/fa';
import { Home, RestaurantDetails, UpdateRestaurant } from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurant/:id/update" component={UpdateRestaurant} />
          <Route exact path="/restaurant/:id" component={RestaurantDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
