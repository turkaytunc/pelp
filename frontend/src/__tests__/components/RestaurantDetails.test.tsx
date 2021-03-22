import { render, screen, act } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import RestaurantDetails from 'src/components/restaurant-details/RestaurantDetails';

jest.spyOn(window, 'fetch');
afterEach(jest.clearAllMocks);

describe('<RestaurantDetails />', () => {
  it('should fetch reviews successfully with 200 response code', async () => {
    (window.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => [{ id: '3', name: 'user', rating: '4', comment: 'This is a comment' }]),
    });
    const history = createBrowserHistory();
    history.push('/restaurant/21');
    render(
      <Router history={history}>
        <RestaurantDetails />
      </Router>
    );

    expect(await screen.findByText('Add Review'));
  });

  it('should fail to fetch reviewswith 400 response code', async () => {
    (window.fetch as jest.Mock).mockResolvedValue({ status: 400, json: jest.fn(() => ({ message: 'an error' })) });
    const history = createBrowserHistory();
    history.push('/restaurant/21');

    render(
      <Router history={history}>
        <RestaurantDetails />
      </Router>
    );

    expect(await screen.findByText('an error')).toBeTruthy();
  });

  it('should fail to fetch reviews', async () => {
    (window.fetch as jest.Mock).mockRejectedValue(new Error('fetch error'));
    const history = createBrowserHistory();
    history.push('/restaurant/21');
    render(
      <Router history={history}>
        <RestaurantDetails />
      </Router>
    );

    expect(await screen.findByText('Add Review'));

    expect(await screen.findByText('fetch error')).toBeTruthy();
  });
});
