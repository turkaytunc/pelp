import { ActionType } from 'src/constants';
import { Restaurant } from '../../interfaces';
import { RestaurantAction } from '../actions';

export const restaurantReducer = (state: Restaurant[], action: RestaurantAction): Restaurant[] => {
  switch (action.type) {
    case ActionType.ADD_RESTAURANT: {
      const { id, location, name, priceRange, reviews } = action.payload;
      return [...state, { id, name, location, priceRange, reviews }];
    }
    case ActionType.REMOVE_RESTAURANT: {
      return [...state.filter((e) => e.id !== action.payload)];
    }
    case ActionType.FETCH_RESTAURANTS: {
      const restaurants = action.payload;
      return restaurants;
    }
    default:
      return state;
  }
};
