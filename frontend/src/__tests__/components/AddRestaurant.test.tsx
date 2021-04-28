import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddRestaurant } from 'src/components';

beforeAll(() => jest.spyOn(window, 'fetch'));
afterEach(jest.clearAllMocks);

describe('<AddRestaurants/>', () => {
  it('should render without crash', () => {
    render(<AddRestaurant />);
  });

  describe('Restaurant Name Input', () => {
    it('should have correct input value', async () => {
      render(<AddRestaurant />);
      const nameInput = await screen.findByTestId('res-name-input');

      userEvent.type(nameInput, 'Ali Usta');

      expect(nameInput).toHaveValue('Ali Usta');
    });

    it('should be truthy', async () => {
      render(<AddRestaurant />);

      expect(await screen.findByTestId('res-name-input')).toBeTruthy();
    });
  });

  describe('Restaurant Location Input', () => {
    it('should have correct location input', async () => {
      render(<AddRestaurant />);
      const locationInput = await screen.findByTestId('res-location-input');

      userEvent.type(locationInput, 'edirne');

      expect(locationInput).toHaveValue('edirne');
    });
  });

  describe('Restaurant Price Input', () => {
    it('should fire change event and have correct price', async () => {
      render(<AddRestaurant />);
      const priceInput = await screen.findByTestId('res-price-input');

      fireEvent.change(priceInput, { target: { value: 5 } });

      expect(priceInput).toHaveValue('5');
      expect(priceInput).not.toHaveValue('6');
    });

    it('should have clear error on focus event', async () => {
      render(<AddRestaurant />);
      const priceInput = await screen.findByTestId('res-price-input');

      fireEvent.focus(priceInput);

      expect(priceInput).toHaveValue('');
    });
  });

  describe('add restaurant form', () => {
    describe('failed submit', () => {
      it('should be in document', async () => {
        render(<AddRestaurant />);
        const formElement = await screen.findByTestId('res-add-form');

        expect(formElement).toBeInTheDocument();
      });

      it('should handle empty input box submit', async () => {
        render(<AddRestaurant />);

        fireEvent.click(await screen.findByText('Add Restaurant'));

        expect(
          await screen.findByText('"restaurant name" is not allowed to be empty')
        ).toBeInTheDocument();
      });
    });

    describe('succesful submit', () => {
      it('should get successful response', async () => {
        (window.fetch as jest.Mock).mockResolvedValue({ status: 201, json: jest.fn });
        render(<AddRestaurant />);

        const nameInput = await screen.findByTestId('res-name-input');
        const locationInput = await screen.findByTestId('res-location-input');
        const priceInput = await screen.findByTestId('res-price-input');
        const submitButton = await screen.findByText('Add Restaurant');

        fireEvent.change(nameInput, { target: { value: 'Canan Doner' } });
        fireEvent.change(locationInput, { target: { value: ' bursa' } });
        fireEvent.change(priceInput, { target: { value: '4' } });
        fireEvent.click(submitButton);

        expect(await screen.findByTestId('res-name-input')).toHaveValue('');
      });

      it('should get unsuccessful response', async () => {
        (window.fetch as jest.Mock).mockResolvedValue({ status: 400, json: jest.fn });
        render(<AddRestaurant />);

        const nameInput = await screen.findByTestId('res-name-input');
        const locationInput = await screen.findByTestId('res-location-input');
        const priceInput = await screen.findByTestId('res-price-input');
        const submitButton = await screen.findByText('Add Restaurant');

        fireEvent.change(nameInput, { target: { value: 'Metin Doner' } });
        fireEvent.change(locationInput, { target: { value: ' edirne' } });
        fireEvent.change(priceInput, { target: { value: '4' } });
        fireEvent.click(submitButton);

        expect(await screen.findByTestId('res-name-input')).toHaveValue('');
      });
    });
  });
});
