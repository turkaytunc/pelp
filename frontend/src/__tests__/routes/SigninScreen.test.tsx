import { render, screen } from '@testing-library/react';
import { SigninScreen } from 'src/routes';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

describe('<SigninScreen />', () => {
  it('should render without crash', async () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <SigninScreen />
      </Router>
    );
    expect(await screen.findByText('Sign In')).toBeTruthy();
  });
});
