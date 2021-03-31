import { render, screen } from '@testing-library/react';
import { LoginScreen } from 'src/routes';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

describe('<LoginScreen />', () => {
  it('should render without crash', () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <LoginScreen />
      </Router>
    );
  });
});
