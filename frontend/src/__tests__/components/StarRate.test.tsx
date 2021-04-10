import { screen, render } from '@testing-library/react';
import { StarRate } from 'src/components';

describe('<StarRate />', () => {
  it('should render without crashing', async () => {
    const rating = 3.5;
    render(<StarRate rating={rating} />);

    expect(await screen.findByTestId('half-star')).toBeInTheDocument();
  });
});
