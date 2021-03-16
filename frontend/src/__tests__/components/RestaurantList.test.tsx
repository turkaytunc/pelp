import { act, render, screen } from '@testing-library/react';
import { RestaurantList } from 'src/components';
import { StoreProvider } from 'src/context/Store';

jest.spyOn(window, 'fetch');

afterEach(jest.clearAllMocks);

describe('<RestaurantList />', () => {
  it('should render without crash', async () => {
    (window.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => [{ id: '3', name: '', location: '', price_range: 3 }]),
    });

    const { getByTestId } = render(
      <StoreProvider>
        <RestaurantList />
      </StoreProvider>
    );
    await act(() => new Promise((resolve) => setTimeout(resolve, 500)));

    expect(getByTestId('restaurant-list')).toBeInTheDocument();
  });

  it('should throw error message', async () => {
    (window.fetch as jest.Mock).mockRejectedValue(new Error('cannot fetch'));

    const { getByTestId } = render(
      <StoreProvider>
        <RestaurantList />
      </StoreProvider>
    );
    await act(() => new Promise((resolve) => setTimeout(resolve, 500)));

    expect(await screen.findByText('cannot fetch')).toBeTruthy();
  });
});
