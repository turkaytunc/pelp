import { render, fireEvent, screen, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import ListCard from 'src/components/restaurant-list/list-card/ListCard';
import { createBrowserHistory } from 'history';

afterEach(jest.clearAllMocks);
jest.spyOn(window, 'fetch');

const rest = { id: 9, location: 'Edirne', name: 'Ali Ustanın Yeri', priceRange: 5 };

describe('<ListCard />', () => {
  it('should render without crash', () => {
    const history = createBrowserHistory();

    render(
      <Router history={history}>
        <ListCard restaurant={rest} />
      </Router>
    );
  });

  describe('Edit Button', () => {
    it('should fire click event and change route to update', () => {
      const history = createBrowserHistory();
      const { getByTestId } = render(
        <Router history={history}>
          <ListCard restaurant={rest} />
        </Router>
      );
      const editButton = getByTestId('listcard-edit');

      fireEvent.click(editButton);

      expect(window.location.pathname).toBe('/restaurant/9/update');
    });
  });

  describe('Delete Button', () => {
    it('should fire click event and delete item successfully', async () => {
      (window.fetch as jest.Mock).mockResolvedValue({ status: 204 });
      const history = createBrowserHistory();
      const { getByTestId } = render(
        <Router history={history}>
          <ListCard restaurant={rest} />
        </Router>
      );
      const deleteButton = getByTestId('listcard-delete');

      fireEvent.click(deleteButton);
    });

    it('should fire click event', async () => {
      const asyncFunc = (window.fetch as jest.Mock).mockRejectedValue(new Error('fetch error'));

      const history = createBrowserHistory();
      const { getByTestId } = render(
        <Router history={history}>
          <ListCard restaurant={rest} />
        </Router>
      );
      const deleteButton = getByTestId('listcard-delete');

      fireEvent.click(deleteButton);
      await act(() => new Promise((resolve) => setTimeout(resolve, 1000)));

      expect(await screen.findByText('fetch error')).toBeInTheDocument();
    });
  });
});
