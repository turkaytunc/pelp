import { render, screen } from '@testing-library/react';
import { RestaurantList } from 'src/components';
import { StoreProvider } from 'src/context/Store';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

jest.spyOn(window, 'fetch');

afterEach(jest.clearAllMocks);

describe('<RestaurantList />', () => {
  it('should render without crash', async () => {
    (window.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => [{ id: '3', name: '', location: '', price_range: 3 }]),
    });
    const history = createBrowserHistory();

    render(
      <Router history={history}>
        <StoreProvider>
          <RestaurantList />
        </StoreProvider>
      </Router>
    );

    expect(await screen.findByTestId('restaurant-list')).toBeInTheDocument();
  });

  it('should throw error message', async () => {
    (window.fetch as jest.Mock).mockRejectedValue(new Error('cannot fetch'));
    const history = createBrowserHistory();

    render(
      <Router history={history}>
        <StoreProvider>
          <RestaurantList />
        </StoreProvider>
      </Router>
    );

    expect(await screen.findByText('cannot fetch')).toBeTruthy();
  });
});
