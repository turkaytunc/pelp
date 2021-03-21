import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import { HomeScreen, DetailsScreen, UpdateScreen } from './routes';

const history = createBrowserHistory();

function App(): JSX.Element {
  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/restaurant/:id/update" component={UpdateScreen} />
          <Route exact path="/restaurant/:id" component={DetailsScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
