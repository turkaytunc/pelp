import { screen, render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AddReview } from 'src/components';

jest.spyOn(window, 'fetch');

afterEach(jest.clearAllMocks);

describe('<AddReview />', () => {
  const history = createBrowserHistory();
  history.push('/restaurant/12');
  it('should render without crash', () => {
    render(
      <Router history={history}>
        <AddReview />
      </Router>
    );
  });

  describe('Input Events', () => {
    it('should fire username change event', async () => {
      history.push('/restaurant/12');
      const { findByTestId } = render(
        <Router history={history}>
          <AddReview />
        </Router>
      );

      fireEvent.change(await findByTestId('review-username-input'), { target: { value: 'Berna' } });

      expect(await findByTestId('review-username-input')).toHaveValue('Berna');
    });

    it('should fire textarea change event', async () => {
      history.push('/restaurant/12');
      const { findByTestId } = render(
        <Router history={history}>
          <AddReview />
        </Router>
      );

      fireEvent.change(await findByTestId('review-comment-input'), {
        target: { value: 'This is a comment.' },
      });

      expect(await findByTestId('review-comment-input')).toHaveValue('This is a comment.');
    });

    it('should fire rating option change event', async () => {
      history.push('/restaurant/12');
      const { findByTestId } = render(
        <Router history={history}>
          <AddReview />
        </Router>
      );

      fireEvent.change(await findByTestId('review-rating-input'), { target: { value: '1' } });
      fireEvent.blur(await findByTestId('review-rating-input'));

      expect(await findByTestId('review-rating-input')).toHaveValue('1');
    });
  });

  describe('Form Event', () => {
    describe('Empty Inputs', () => {
      it('should submit form successfully', async () => {
        history.push('/restaurant/12');
        render(
          <Router history={history}>
            <AddReview />
          </Router>
        );

        fireEvent.submit(await screen.findByTestId('review-form'));

        expect(await screen.findByText('"username" is not allowed to be empty')).toBeTruthy();
      });
    });

    describe('With proper inputs', () => {
      describe('Successful fetch', () => {
        it('should submit form successfully', async () => {
          (window.fetch as jest.Mock).mockResolvedValue({ status: 201, json: jest.fn });

          global.window = Object.create(window);
          const url = '/restaurant/10';
          Object.defineProperty(window, 'location', {
            value: {
              pathname: url,
            },
          });
          history.push('/restaurant/10');

          render(
            <Router history={history}>
              <AddReview />
            </Router>
          );

          fireEvent.change(await screen.findByTestId('review-username-input'), {
            target: { value: 'Hilal' },
          });
          fireEvent.change(await screen.findByTestId('review-comment-input'), {
            target: { value: 'This is a comment.' },
          });
          fireEvent.change(await screen.findByTestId('review-rating-input'), {
            target: { value: '5' },
          });
          fireEvent.click(await screen.findByTestId('add-review-button'));

          expect(window.location.pathname).toBe('/restaurant/10');
        });
      });

      describe('Failed fetch', () => {
        it('should submit form successfully', async () => {
          history.push('/restaurant/12');
          (window.fetch as jest.Mock).mockResolvedValue({
            status: 400,
            json: jest.fn(() => ({ message: 'Cannot get restaurant' })),
          });
          const { findByTestId } = render(
            <Router history={history}>
              <AddReview />
            </Router>
          );

          fireEvent.change(await findByTestId('review-username-input'), {
            target: { value: 'Hilal' },
          });
          fireEvent.change(await findByTestId('review-comment-input'), {
            target: { value: 'This is a comment.' },
          });
          fireEvent.change(await findByTestId('review-rating-input'), { target: { value: '5' } });
          fireEvent.submit(await findByTestId('review-form'));

          expect(await screen.findByText('Cannot get restaurant')).toBeTruthy();
        });

        it('should submit form successfully and get error', async () => {
          (window.fetch as jest.Mock).mockRejectedValue(new Error('something went wrong'));
          history.push('/restaurant/12');
          const { findByTestId } = render(
            <Router history={history}>
              <AddReview />
            </Router>
          );

          fireEvent.change(await findByTestId('review-username-input'), {
            target: { value: 'Hilal' },
          });
          fireEvent.change(await findByTestId('review-comment-input'), {
            target: { value: 'This is a comment.' },
          });
          fireEvent.change(await findByTestId('review-rating-input'), { target: { value: '5' } });
          fireEvent.submit(await findByTestId('review-form'));

          expect(await screen.findByText('something went wrong')).toBeTruthy();
        });
      });
    });
  });
});
