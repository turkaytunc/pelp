import { ActionType } from 'src/constants';
import { restaurantReducer } from 'src/context/reducers';

const state = [
  { id: 5, name: 'Çetin Dürüm', location: 'Edirne', priceRange: 2 },
  { id: 2, name: 'Hasan Ustanın Yeri', location: 'Istanbul', priceRange: 4 },
];
const restaurant = { id: 3, name: 'Metin Döner', location: 'Adana', priceRange: 5 };

describe('restaurantReducer', () => {
  it('should handle add restaurant action', () => {
    const nextState = restaurantReducer(state, {
      type: ActionType.ADD_RESTAURANT,
      payload: restaurant,
    });

    expect(nextState).toEqual([
      { id: 5, name: 'Çetin Dürüm', location: 'Edirne', priceRange: 2 },
      { id: 2, name: 'Hasan Ustanın Yeri', location: 'Istanbul', priceRange: 4 },
      { id: 3, name: 'Metin Döner', location: 'Adana', priceRange: 5 },
    ]);
  });

  it('should handle remove restaurant action', () => {
    const nextState = restaurantReducer(state, {
      type: ActionType.REMOVE_RESTAURANT,
      payload: 2,
    });

    expect(nextState).toEqual([{ id: 5, name: 'Çetin Dürüm', location: 'Edirne', priceRange: 2 }]);
  });

  it('should handle remove restaurant action', () => {
    const nextState = restaurantReducer(state, {
      type: ActionType.NULL_RESTAURANT,
      payload: '',
    });

    expect(nextState).toEqual(state);
  });
});
