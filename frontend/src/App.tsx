import { createBrowserHistory } from 'history';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import { HomeScreen, DetailsScreen, UpdateScreen } from './routes';

const history = createBrowserHistory();

function App(): JSX.Element {
  return (
    <BrowserRouter basename="/pern-stack-yelp">
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
