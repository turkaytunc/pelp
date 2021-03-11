import { Restaurant } from 'src/interfaces';
import { ActionType } from 'src/constants';

export type RestaurantAction =
  | {
      type: ActionType.ADD_RESTAURANT;
      payload: Restaurant;
    }
  | {
      type: ActionType.REMOVE_RESTAURANT;
      payload: number;
    }
  | {
      type: ActionType.FETCH_RESTAURANTS;
      payload: Restaurant[];
    };
