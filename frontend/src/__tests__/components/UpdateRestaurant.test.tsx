import { render, fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { UpdateRestaurant } from 'src/components';
import { StoreProvider } from 'src/context/Store';

jest.spyOn(window, 'fetch');

describe('<UpdateRestaurant/>', () => {
  it('should render without crash', async () => {
    (window.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => ({ id: 2, name: '', location: '', price_range: 3 })),
    });
    const history = createBrowserHistory();

    render(
      <StoreProvider>
        <Router history={history}>
          <UpdateRestaurant />
        </Router>
      </StoreProvider>
    );

    expect(await screen.findByTestId('update-res-form')).not.toBeFalsy();
  });

  describe('Input Fields', () => {
    it('should fire name input change event', async () => {
      const history = createBrowserHistory();
      history.push('/restaurant/3/update');

      const { getByTestId } = render(
        <StoreProvider>
          <Router history={history}>
            <UpdateRestaurant />
          </Router>
        </StoreProvider>
      );
      const nameInput = getByTestId('update-res-name');

      fireEvent.change(nameInput, { target: { value: 'Paşa Dürüm' } });

      expect(await screen.findByTestId('update-res-name')).toHaveValue('Paşa Dürüm');
    });

    it('should fire location input change event', async () => {
      const history = createBrowserHistory();
      history.push('/restaurant/5/update');

      const { getByTestId } = render(
        <StoreProvider>
          <Router history={history}>
            <UpdateRestaurant />
          </Router>
        </StoreProvider>
      );
      const locationInput = getByTestId('update-res-location');

      fireEvent.change(locationInput, { target: { value: ' edirne' } });

      expect(await screen.findByTestId('update-res-location')).toHaveValue(' edirne');
    });

    it('should fire price input change event', async () => {
      const history = createBrowserHistory();
      history.push('/restaurant/8/update');

      const { getByTestId } = render(
        <StoreProvider>
          <Router history={history}>
            <UpdateRestaurant />
          </Router>
        </StoreProvider>
      );
      const priceInput = getByTestId('update-res-price');

      fireEvent.change(priceInput, { target: { value: 5 } });

      expect(await screen.findByTestId('update-res-price')).toHaveValue('5');
    });
  });

  describe('Handle Submit', () => {
    it('should handle empty inputs', async () => {
      const history = createBrowserHistory();

      render(
        <StoreProvider>
          <Router history={history}>
            <UpdateRestaurant />
          </Router>
        </StoreProvider>
      );

      const submitButton = await screen.findByText('Update');

      fireEvent.click(submitButton);
    });

    it('should handle successful submit', async () => {
      (window.fetch as jest.Mock).mockResolvedValue({
        status: 200,
        json: jest.fn(() => ({ id: 2, name: '', location: '', price_range: 3 })),
      });
      const history = createBrowserHistory();

      const { getByTestId } = render(
        <StoreProvider>
          <Router history={history}>
            <UpdateRestaurant />
          </Router>
        </StoreProvider>
      );

      const submitButton = await screen.findByText('Update');
      const nameInput = getByTestId('update-res-name');
      const locationInput = getByTestId('update-res-location');
      const priceInput = getByTestId('update-res-price');

      fireEvent.change(nameInput, { target: { value: 'Paşa Dürüm' } });
      fireEvent.change(locationInput, { target: { value: 'edirne' } });
      fireEvent.change(priceInput, { target: { value: '2' } });

      fireEvent.click(submitButton);

      expect(await screen.findByTestId('update-res-name')).toHaveValue('');
      expect(await screen.findByTestId('update-res-location')).toHaveValue('');
    });

    it('should handle error response', async () => {
      (window.fetch as jest.Mock).mockRejectedValue(new Error('fetch error occured'));
      const history = createBrowserHistory();

      const { getByTestId } = render(
        <StoreProvider>
          <Router history={history}>
            <UpdateRestaurant />
          </Router>
        </StoreProvider>
      );

      const submitButton = await screen.findByText('Update');
      const nameInput = getByTestId('update-res-name');
      const locationInput = getByTestId('update-res-location');
      const priceInput = getByTestId('update-res-price');

      fireEvent.change(nameInput, { target: { value: 'Paşa Dürüm' } });
      fireEvent.change(locationInput, { target: { value: 'edirne' } });
      fireEvent.change(priceInput, { target: { value: '2' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText('fetch error occured')).toBeTruthy();
    });
  });
});
