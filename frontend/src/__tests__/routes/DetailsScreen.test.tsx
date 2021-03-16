import { render } from '@testing-library/react';
import { DetailsScreen } from 'src/routes';

describe('<DetailsScreen />', () => {
  it('should render without crash', () => {
    render(<DetailsScreen />);
  });
});
