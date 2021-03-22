import { screen, render } from '@testing-library/react';
import { ReviewCard } from 'src/components';

const review = { name: 'Derya', rating: '3', comment: 'This is a random string' };

describe('<ReviewCard />', () => {
  it('should render without crash', () => {
    render(<ReviewCard name={review.name} rating={review.rating} comment={review.comment} />);
  });
});
