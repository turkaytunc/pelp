import { User } from '../../interfaces';
import { UserAction } from '../actions/UserAction';

export const userReducer = (state: User, action: UserAction): User => {
  switch (action.type) {
    case 'ADD_USER': {
      return action.payload as User;
    }
    default:
      return state;
  }
};
