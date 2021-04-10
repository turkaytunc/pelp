import { screen, render, fireEvent, act } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { NavigationBar } from 'src/components';
import { StoreProvider } from 'src/context/Store';

describe('<NavigationBar />', () => {
  it('should render without crashing', async () => {
    const history = createBrowserHistory();
    localStorage.setItem('token', 'somejwtfdsfdshistory.push');
    history.push('/dashboard');
    render(
      <Router history={history}>
        <StoreProvider>
          <NavigationBar />
        </StoreProvider>
      </Router>
    );

    global.window = Object.create(window);
    const url = '/restaurant/10';
    Object.defineProperty(window, 'location', {
      value: {
        pathname: url,
        localStorage: { removeItem: jest.fn },
      },
    });
  });
});
