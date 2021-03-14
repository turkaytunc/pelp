import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './app.scss';
// import { FaStarHalfAlt } from 'react-icons/fa';
import { HomeScreen, DetailsScreen, UpdateScreen } from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/restaurant/:id/update" component={UpdateScreen} />
          <Route exact path="/restaurant/:id" component={DetailsScreen} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
