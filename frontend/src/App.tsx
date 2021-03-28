import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './app.scss';
import { HomeScreen, DetailsScreen, UpdateScreen, RegisterScreen, LoginScreen } from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter basename="/pern-stack-yelp">
      <div className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/restaurant/:id/update" component={UpdateScreen} />
          <Route exact path="/restaurant/:id" component={DetailsScreen} />
          <Route exact path="/auth/register" component={RegisterScreen} />
          <Route exact path="/auth/login" component={LoginScreen} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
