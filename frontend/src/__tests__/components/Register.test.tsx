import { screen, fireEvent, render } from '@testing-library/react';
import { Register } from 'src/components';
import { StoreProvider } from 'src/context/Store';

jest.spyOn(window, 'fetch');
afterEach(jest.clearAllMocks);

describe('<Register />', () => {
  it('should render without crashing', async () => {
    render(
      <StoreProvider>
        <Register />
      </StoreProvider>
    );
    expect(await screen.findByText('Sign Up')).toBeTruthy();
  });

  describe('input on change events', () => {
    it('should fire name input change event', async () => {
      render(
        <StoreProvider>
          <Register />
        </StoreProvider>
      );

      fireEvent.change(await screen.findByTestId('register-name'), { target: { value: 'username123' } });
      expect(await screen.findByTestId('register-name')).toHaveValue('username123');
    });

    it('should fire email input change event', async () => {
      render(
        <StoreProvider>
          <Register />
        </StoreProvider>
      );

      fireEvent.change(await screen.findByTestId('register-email'), { target: { value: 'user@example.com' } });
      expect(await screen.findByTestId('register-email')).toHaveValue('user@example.com');
    });

    it('should fire password input change event', async () => {
      render(
        <StoreProvider>
          <Register />
        </StoreProvider>
      );

      fireEvent.change(await screen.findByTestId('register-password'), { target: { value: 'weakpassword' } });
      expect(await screen.findByTestId('register-password')).toHaveValue('weakpassword');
    });
  });

  describe('failed submit events', () => {
    it('should handle empty submit ops', async () => {
      render(
        <StoreProvider>
          <Register />
        </StoreProvider>
      );

      fireEvent.submit(await screen.findByText('Sign Up'));

      expect(await screen.findByText('"name" is not allowed to be empty')).toBeTruthy();
    });

    describe('focus events after empty submit event', () => {
      it('should fire focus events', async () => {
        render(
          <StoreProvider>
            <Register />
          </StoreProvider>
        );

        fireEvent.submit(await screen.findByText('Sign Up'));
        expect(await screen.findByText('"name" is not allowed to be empty')).toBeInTheDocument();

        fireEvent.focus(await screen.findByTestId('register-name'));
        fireEvent.focus(await screen.findByTestId('register-email'));
        fireEvent.focus(await screen.findByTestId('register-password'));

        expect(await screen.findByTestId('register-name')).toHaveValue('');
        expect(await screen.findByTestId('register-email')).toHaveValue('');
        expect(await screen.findByTestId('register-password')).toHaveValue('');
      });
    });
  });

  describe('successful submit event', () => {
    describe('successful register', () => {
      it('should register user and save jwt to localstorage', async () => {
        (window.fetch as jest.Mock).mockResolvedValue({
          status: 200,
          json: jest.fn(() => ({ token: 'fsdfjksfd', user: { name: 'username', email: 'usermail@example.com' } })),
        });

        render(
          <StoreProvider>
            <Register />
          </StoreProvider>
        );

        fireEvent.change(await screen.findByTestId('register-name'), { target: { value: 'hasan' } });
        fireEvent.change(await screen.findByTestId('register-email'), { target: { value: 'hasangeyik@gmail.com' } });
        fireEvent.change(await screen.findByTestId('register-password'), { target: { value: 'thisisasecurepass123' } });
        fireEvent.submit(await screen.findByText('Sign Up'));

        expect(await screen.findByTestId('register-password')).toHaveValue('');
      });
    });
    describe('failed register', () => {
      it('should fail to register user', async () => {
        (window.fetch as jest.Mock).mockResolvedValue({
          status: 400,
          json: jest.fn(() => ({ message: 'Error Occured' })),
        });

        render(
          <StoreProvider>
            <Register />
          </StoreProvider>
        );

        fireEvent.change(await screen.findByTestId('register-name'), { target: { value: 'hasan' } });
        fireEvent.change(await screen.findByTestId('register-email'), { target: { value: 'hasangeyik@gmail.com' } });
        fireEvent.change(await screen.findByTestId('register-password'), {
          target: { value: 'thisisasecurepass123' },
        });
        fireEvent.submit(await screen.findByText('Sign Up'));

        expect(await screen.findByText('Error Occured')).toBeTruthy();

        expect(await screen.findByTestId('register-password')).toHaveValue('');
      });

      it('should get fetch error', async () => {
        (window.fetch as jest.Mock).mockRejectedValue(new Error('Cannot Fetch'));

        render(
          <StoreProvider>
            <Register />
          </StoreProvider>
        );

        fireEvent.change(await screen.findByTestId('register-name'), { target: { value: 'hasan' } });
        fireEvent.change(await screen.findByTestId('register-email'), { target: { value: 'hasangeyik@gmail.com' } });
        fireEvent.change(await screen.findByTestId('register-password'), {
          target: { value: 'thisisasecurepass123' },
        });
        fireEvent.submit(await screen.findByText('Sign Up'));

        expect(await screen.findByText('Cannot Fetch')).toBeTruthy();
      });
    });
  });
});
