import React from 'react';
import { RestaurantAction, UserAction } from './actions';
import { Restaurant, User } from '../interfaces';
import { restaurantReducer, userReducer } from './reducers';

type InitialStateType = {
  restaurants: Restaurant[];
  user: User;
};

const initialState = {
  restaurants: [],
  user: { name: '', email: '', isAuth: false },
};

const rootReducer = ({ restaurants, user }: InitialStateType, action: RestaurantAction | UserAction) => ({
  restaurants: restaurantReducer(restaurants, action as RestaurantAction),
  user: userReducer(user, action as UserAction),
});

export const Store = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<RestaurantAction | UserAction>;
}>({
  state: (initialState as unknown) as InitialStateType,
  dispatch: () => null,
});

export const StoreProvider: React.FC = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = React.useReducer(rootReducer, (initialState as unknown) as InitialStateType);

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};

StoreProvider.defaultProps = { children: null };
