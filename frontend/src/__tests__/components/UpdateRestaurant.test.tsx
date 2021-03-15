import { render, fireEvent, screen, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { UpdateRestaurant } from 'src/components';
import { StoreProvider } from 'src/context/Store';

describe('<UpdateRestaurant/>', () => {
  it('should render without crash', () => {
    const history = createBrowserHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <UpdateRestaurant />
      </Router>
    );

    expect(getByTestId('update-res-form')).not.toBeFalsy();
  });

  describe('Input Fields', () => {
    it('should fire name input change event', () => {
      const history = createBrowserHistory();
      history.push('/restaurant/3/update');

      const { getByTestId } = render(
        <Router history={history}>
          <UpdateRestaurant />
        </Router>
      );
      const nameInput = getByTestId('update-res-name');

      fireEvent.change(nameInput, { target: { value: 'Paşa Dürüm' } });

      expect(nameInput).toHaveValue('Paşa Dürüm');
    });

    it('should fire location input change event', () => {
      const history = createBrowserHistory();
      history.push('/restaurant/5/update');

      const { getByTestId } = render(
        <Router history={history}>
          <UpdateRestaurant />
        </Router>
      );
      const locationInput = getByTestId('update-res-location');

      fireEvent.change(locationInput, { target: { value: ' edirne' } });

      expect(locationInput).toHaveValue(' edirne');
    });

    it('should fire price input change event', (): void => {
      const history = createBrowserHistory();
      history.push('/restaurant/8/update');

      const { getByTestId } = render(
        <Router history={history}>
          <UpdateRestaurant />
        </Router>
      );
      const priceInput = getByTestId('update-res-price');

      fireEvent.change(priceInput, { target: { value: 5 } });

      expect(priceInput).toHaveValue('5');
    });
  });

  describe('Handle Submit', () => {
    it('should handle empty inputs', async () => {
      const history = createBrowserHistory();

      render(
        <Router history={history}>
          <UpdateRestaurant />
        </Router>
      );

      const submitButton = await screen.findByText('Update');

      fireEvent.click(submitButton);
    });

    it('should handle successful submit', async () => {
      const history = createBrowserHistory();

      const { getByTestId } = render(
        <Router history={history}>
          <UpdateRestaurant />
        </Router>
      );

      const submitButton = await screen.findByText('Update');
      const nameInput = getByTestId('update-res-name');
      const locationInput = getByTestId('update-res-location');
      const priceInput = getByTestId('update-res-price');

      fireEvent.change(nameInput, { target: { value: 'Paşa Dürüm' } });
      fireEvent.change(locationInput, { target: { value: 'edirne' } });
      fireEvent.change(priceInput, { target: { value: '2' } });

      fireEvent.click(submitButton);

      expect(nameInput).toHaveValue('');
      expect(locationInput).toHaveValue('');
    });
  });
});
