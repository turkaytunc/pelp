import { render, screen, act } from '@testing-library/react';
import { DashboardScreen } from 'src/routes';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { StoreProvider } from 'src/context/Store';

jest.spyOn(window, 'fetch');

describe('<DashboardScreen/>', () => {
  it('should fetch and validate user without crash', async () => {
    const history = createBrowserHistory();
    history.push('/dashboard');
    (window.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => ({ name: 'turkay', email: 'usermail@example.com' })),
    });
    render(
      <Router history={history}>
        <StoreProvider>
          <DashboardScreen />
        </StoreProvider>
      </Router>
    );

    expect(await screen.findByText('Welcome turkay')).toBeTruthy();
  });

  it('should fetch and reject jwt', async () => {
    const history = createBrowserHistory();
    history.push('/dashboard');
    (window.fetch as jest.Mock).mockResolvedValue({ status: 403, json: jest.fn(() => ({ message: 'Unauthorized' })) });

    render(
      <Router history={history}>
        <DashboardScreen />
      </Router>
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 500)));
    expect(window.location.pathname).toBe('/auth/login');
  });
  it('should not fetch and throw error', async () => {
    const history = createBrowserHistory();
    history.push('/dashboard');
    (window.fetch as jest.Mock).mockRejectedValue(new Error('Validation error'));

    render(
      <Router history={history}>
        <DashboardScreen />
      </Router>
    );

    expect(await screen.findByText('Validation error')).toBeTruthy();
  });
});
