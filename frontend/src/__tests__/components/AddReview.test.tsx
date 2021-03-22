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
      const { findByTestId } = render(
        <Router history={history}>
          <AddReview />
        </Router>
      );

      fireEvent.change(await findByTestId('review-username-input'), { target: { value: 'Berna' } });

      expect(await findByTestId('review-username-input')).toHaveValue('Berna');
    });

    it('should fire textarea change event', async () => {
      const { findByTestId } = render(
        <Router history={history}>
          <AddReview />
        </Router>
      );

      fireEvent.change(await findByTestId('review-comment-input'), { target: { value: 'This is a comment.' } });

      expect(await findByTestId('review-comment-input')).toHaveValue('This is a comment.');
    });

    it('should fire rating option change event', async () => {
      const { findByTestId } = render(
        <Router history={history}>
          <AddReview />
        </Router>
      );

      fireEvent.change(await findByTestId('review-rating-input'), { target: { value: '3' } });

      expect(await findByTestId('review-rating-input')).toHaveValue('3');
    });
  });
});
