import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './app.scss';
import { Footer, NavigationBar } from './components';
import { HomeScreen, DetailsScreen, UpdateScreen, RegisterScreen, LoginScreen, DashboardScreen } from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter basename="/pern-stack-yelp">
      <div className="app">
        <NavigationBar />
        <div className="main">
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/dashboard" component={DashboardScreen} />
            <Route exact path="/restaurant/:id/update" component={UpdateScreen} />
            <Route exact path="/restaurant/:id" component={DetailsScreen} />
            <Route exact path="/auth/register" component={RegisterScreen} />
            <Route exact path="/auth/login" component={LoginScreen} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
