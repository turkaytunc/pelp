import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { UpdateRestaurant } from 'src/components';

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

  describe('Update Restaurant Name Input', () => {
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
});
