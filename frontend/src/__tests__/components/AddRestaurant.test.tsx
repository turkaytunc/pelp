import { render, fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddRestaurant } from 'src/components';

beforeAll(() => jest.spyOn(window, 'fetch'));
afterEach(jest.clearAllMocks);

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
      const { getByTestId } = render(<AddRestaurant />);
      const priceInput = getByTestId('res-price-input');

      fireEvent.focus(priceInput);

      expect(priceInput).toHaveValue('');
    });
  });

  describe('add restaurant form', () => {
    describe('failed submit', () => {
      it('should be in document', () => {
        const { getByTestId } = render(<AddRestaurant />);
        const formElement = getByTestId('res-add-form');

        expect(formElement).toBeInTheDocument();
      });

      it('should handle empty input box submit', async () => {
        render(<AddRestaurant />);
        const submitButton = await screen.findByText('Add Restaurant');

        fireEvent.click(submitButton);

        expect(screen.getByText("Please don't left input fields blank!")).toBeInTheDocument();
      });
    });

    describe('succesful submit', () => {
      it('should get successful response', async () => {
        (window.fetch as jest.Mock).mockResolvedValue({ status: 201, json: jest.fn });
        const { getByTestId } = render(<AddRestaurant />);

        const nameInput = getByTestId('res-name-input');
        const locationInput = getByTestId('res-location-input');
        const priceInput = getByTestId('res-price-input');
        const submitButton = await screen.findByText('Add Restaurant');

        fireEvent.change(nameInput, { target: { value: 'Metin Doner' } });
        fireEvent.change(locationInput, { target: { value: ' edirne' } });
        fireEvent.change(priceInput, { target: { value: '4' } });
        fireEvent.click(submitButton);
        await act(() => new Promise((resolve) => setTimeout(resolve, 500)));

        expect(nameInput).toHaveValue('');
      });

      it('should get unsuccessful response', async () => {
        (window.fetch as jest.Mock).mockResolvedValue({ status: 400, json: jest.fn });
        const { getByTestId } = render(<AddRestaurant />);

        const nameInput = getByTestId('res-name-input');
        const locationInput = getByTestId('res-location-input');
        const priceInput = getByTestId('res-price-input');
        const submitButton = await screen.findByText('Add Restaurant');

        fireEvent.change(nameInput, { target: { value: 'Metin Doner' } });
        fireEvent.change(locationInput, { target: { value: ' edirne' } });
        fireEvent.change(priceInput, { target: { value: '4' } });
        fireEvent.click(submitButton);
        await act(() => new Promise((resolve) => setTimeout(resolve, 500)));

        expect(nameInput).toHaveValue('');
      });
    });
  });
});
