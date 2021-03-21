import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import RestaurantDetails from 'src/components/restaurant-details/RestaurantDetails';

describe('<RestaurantDetails />', () => {
  it('should render without crash', () => {
    const history = createBrowserHistory();
    history.push('/restaurant/21');
    render(
      <Router history={history}>
        <RestaurantDetails />
      </Router>
    );
  });
});
