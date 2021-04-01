import { screen, fireEvent, render } from '@testing-library/react';
import { Register } from 'src/components';
import { StoreProvider } from 'src/context/Store';

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

  describe('submit events', () => {
    it('should handle empty submit ops', async () => {
      render(
        <StoreProvider>
          <Register />
        </StoreProvider>
      );

      fireEvent.submit(await screen.findByText('Sign Up'));

      expect(await screen.findByText("Please don't left inputs empty!")).toBeTruthy();
    });

    describe('focus events after empty submit event', () => {
      it('should fire focus events', async () => {
        render(
          <StoreProvider>
            <Register />
          </StoreProvider>
        );
        fireEvent.submit(await screen.findByText('Sign Up'));
        expect(await screen.findByText("Please don't left inputs empty!")).toBeInTheDocument();

        fireEvent.focus(await screen.findByTestId('register-name'));
        fireEvent.focus(await screen.findByTestId('register-email'));
        fireEvent.focus(await screen.findByTestId('register-password'));
      });
    });
  });
});