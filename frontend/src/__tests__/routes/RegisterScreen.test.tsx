import { screen, render } from '@testing-library/react';
import { RegisterScreen } from 'src/routes';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

describe('<RegisterScreen/>', () => {
  it('should render without crash', async () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <RegisterScreen />
      </Router>
    );

    expect(await screen.findByText('Register Screen')).toBeTruthy();
  });
});
