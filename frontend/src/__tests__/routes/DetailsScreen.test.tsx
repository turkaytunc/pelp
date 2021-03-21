import { render } from '@testing-library/react';
import { DetailsScreen } from 'src/routes';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

describe('<DetailsScreen />', () => {
  it('should render without crash', () => {
    const history = createBrowserHistory();
    history.push('/restaurant/21');
    render(
      <Router history={history}>
        <DetailsScreen />
      </Router>
    );
  });
});
