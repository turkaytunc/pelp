import { render } from '@testing-library/react';
import { UpdateScreen } from 'src/routes';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

describe('<UpdateScreen />', () => {
  it('should render without crash', () => {
    const history = createBrowserHistory();

    history.push('/3/update');

    render(
      <Router history={history}>
        <UpdateScreen />
      </Router>
    );
  });
});
