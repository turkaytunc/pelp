import { screen, render } from '@testing-library/react';
import { SignupScreen } from 'src/routes';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

describe('<RegisterScreen/>', () => {
  it('should render without crash', async () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <SignupScreen />
      </Router>
    );

    expect(await screen.findByText('Sign Up')).toBeTruthy();
  });
});
