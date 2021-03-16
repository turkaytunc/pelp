import { ActionType } from 'src/constants';
import { restaurantReducer } from 'src/context/reducers';

const state = [{ id: 5, name: 'Çetin Dürüm', location: 'Edirne', priceRange: 2 }];
const restaurant = { id: 3, name: 'Metin Döner', location: 'Adana', priceRange: 5 };

describe('restaurantReducer', () => {
  it('should handle add restaurant action', () => {
    const nextState = restaurantReducer(state, {
      type: ActionType.ADD_RESTAURANT,
      payload: restaurant,
    });

    expect(nextState).toEqual([
      { id: 5, name: 'Çetin Dürüm', location: 'Edirne', priceRange: 2 },
      { id: 3, name: 'Metin Döner', location: 'Adana', priceRange: 5 },
    ]);
  });
});
