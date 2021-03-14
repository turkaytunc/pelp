import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddRestaurant } from 'src/components';

describe('<AddRestaurants/>', () => {
  it('should render without crash', () => {
    render(<AddRestaurant />);
  });

  describe('Restaurant Name Input', () => {
    it('should have correct input value', () => {
      const { getByTestId } = render(<AddRestaurant />);
      const nameInput = getByTestId('res-name-input');

      userEvent.type(nameInput, 'Ali Usta');

      expect(nameInput).toHaveValue('Ali Usta');
    });

    it('should be truthy', () => {
      const { getByTestId } = render(<AddRestaurant />);

      const nameInput = getByTestId('res-name-input');

      expect(nameInput).toBeTruthy();
    });
  });

  describe('Restaurant Location Input', () => {
    it('should have correct location input', () => {
      const { getByTestId } = render(<AddRestaurant />);
      const locationInput = getByTestId('res-location-input');

      userEvent.type(locationInput, 'edirne');

      expect(locationInput).toHaveValue('edirne');
      expect(locationInput).not.toHaveValue('adana');
    });
  });

  describe('Restaurant Price Input', () => {
    it('should fire change event and have correct price', () => {
      const { getByTestId } = render(<AddRestaurant />);
      const priceInput = getByTestId('res-price-input');

      fireEvent.change(priceInput, { target: { value: 5 } });

      expect(priceInput).toHaveValue('5');
      expect(priceInput).not.toHaveValue('6');
    });

    it('should have clear error on focus event', () => {
      const { debug, getByTestId } = render(<AddRestaurant />);
      const priceInput = getByTestId('res-price-input');

      fireEvent.focus(priceInput);

      expect(priceInput).toHaveValue('');
    });
  });

  describe('add restaurant form', () => {
    it('should handle empty input box submit', () => {
      const { getByTestId } = render(<AddRestaurant />);
      const formElement = getByTestId('res-add-form');

      expect(formElement).toBeInTheDocument();
    });
  });
});
