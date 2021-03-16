import { render } from '@testing-library/react';
import RestaurantDetails from 'src/components/restaurant-details/RestaurantDetails';

describe('<RestaurantDetails />', () => {
  it('should render without crash', () => {
    render(<RestaurantDetails />);
  });
});
