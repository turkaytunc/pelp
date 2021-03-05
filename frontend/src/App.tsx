import './app.scss';
// import { FaStarHalfAlt } from 'react-icons/fa';
import { Home, RestaurantDetails, UpdateRestaurant } from './routes/index';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/restaurant/:id/update" component={UpdateRestaurant}></Route>
          <Route exact path="/restaurant/:id" component={RestaurantDetails}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
