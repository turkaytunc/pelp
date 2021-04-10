import { screen, render, fireEvent, act } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { NavigationBar } from 'src/components';
import { StoreProvider } from 'src/context/Store';

jest.spyOn(window, 'fetch');

describe('<NavigationBar />', () => {
  it('should render without crashing', async () => {
    const history = createBrowserHistory();
    history.push('/dashboard');
    (window.fetch as jest.Mock).mockResolvedValue({ status: 200 });
    localStorage.setItem('token', 'mock tok');
    render(
      <Router history={history}>
        <StoreProvider>
          <NavigationBar />
        </StoreProvider>
      </Router>
    );
  });
});
