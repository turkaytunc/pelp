import { render, screen } from '@testing-library/react';
import { StoreProvider } from 'src/context/Store';
import { HomeScreen } from 'src/routes';

jest.spyOn(window, 'fetch');
afterEach(jest.clearAllMocks);

describe('<HomeScreen />', () => {
  it('should validate jwt using fetch request', async () => {
    localStorage.setItem('token', 'Mock token');
    (window.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => ({ name: 'user', email: 'mail@example.com' })),
    });
    render(
      <StoreProvider>
        <HomeScreen />
      </StoreProvider>
    );

    expect(await screen.findByText('Add Restaurant')).toBeTruthy();
  });

  it('should reject invalid jwt', async () => {
    (window.fetch as jest.Mock).mockResolvedValue({
      status: 403,
      json: jest.fn(() => ({ name: 'user', email: 'mail@example.com' })),
    });
    render(<HomeScreen />);

    expect((await screen.findByTestId('home-screen-container')).childElementCount).toBe(2);
  });

  it('should reject fetch request and throw error', async () => {
    (window.fetch as jest.Mock).mockRejectedValue(new Error('Fetch Error'));
    render(<HomeScreen />);

    expect((await screen.findByTestId('home-screen-container')).childElementCount).toBe(3);
  });
});
