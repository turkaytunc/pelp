import { screen, render, fireEvent } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Login } from 'src/components';

jest.spyOn(window, 'fetch');
afterEach(jest.clearAllMocks);

describe('<Login />', () => {
  it('should render without crashing', async () => {
    render(<Login />);
    expect(await screen.findByText('Sign In')).toBeTruthy();
  });

  describe('Input Events', () => {
    it('should throw error for empty inputs', async () => {
      (window.fetch as jest.Mock).mockResolvedValue({});
      render(<Login />);
      fireEvent.click(await screen.findByRole('button'));
      expect(await screen.findByText('"email" is not allowed to be empty')).toBeTruthy();
    });

    it('should fire change event for email input ', async () => {
      render(<Login />);
      fireEvent.change(await screen.findByTestId('login-email'), {
        target: { value: 'hey@hey.com' },
      });
      expect(await screen.findByTestId('login-email')).toHaveValue('hey@hey.com');
    });

    it('should fire change event for password input ', async () => {
      render(<Login />);
      fireEvent.change(await screen.findByTestId('login-password'), {
        target: { value: 'this is a password 123 ' },
      });
      expect(await screen.findByTestId('login-password')).toHaveValue('this is a password 123 ');
    });

    it('should fire focus event for email input ', async () => {
      render(<Login />);
      fireEvent.change(await screen.findByTestId('login-email'), {
        target: { value: 'hey@hey.com' },
      });
      fireEvent.click(await screen.findByRole('button'));
      expect(await screen.findByText('"password" is not allowed to be empty')).toBeTruthy();

      fireEvent.focus(await screen.findByTestId('login-email'));

      expect(await screen.findByTestId('login-email')).toHaveValue('');
    });

    it('should fire focus event for password input ', async () => {
      render(<Login />);
      fireEvent.change(await screen.findByTestId('login-password'), {
        target: { value: 'this is a password 123 ' },
      });
      fireEvent.click(await screen.findByRole('button'));
      expect(await screen.findByText('"email" is not allowed to be empty')).toBeTruthy();

      fireEvent.focus(await screen.findByTestId('login-password'));

      expect(await screen.findByTestId('login-password')).toHaveValue('');
    });
  });

  describe('Successful Submit Operation', () => {
    it('should validate user and fetch userdata', async () => {
      (window.fetch as jest.Mock).mockResolvedValue({
        response: 200,
        json: jest.fn(() => ({ user: {}, token: 'somerandomtoken' })),
      });
      const history = createBrowserHistory();
      history.push('/auth/login');
      render(
        <Router history={history}>
          <Login />
        </Router>
      );

      fireEvent.change(await screen.findByTestId('login-email'), {
        target: { value: 'hey@hey.com' },
      });
      fireEvent.change(await screen.findByTestId('login-password'), {
        target: { value: 'this is a password' },
      });
      fireEvent.click(await screen.findByRole('button'));

      expect(await screen.findByTestId('login-password')).toHaveValue('');
    });
  });
});
