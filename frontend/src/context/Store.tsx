import React from 'react';
import { RestaurantAction } from './actions';
import { Restaurant } from '../interfaces';
import { restaurantReducer } from './reducers';

type InitialStateType = {
  restaurants: Restaurant[];
};

const initialState = {
  restaurants: [],
};

const rootReducer = ({ restaurants }: InitialStateType, action: RestaurantAction) => ({
  restaurants: restaurantReducer(restaurants, action as RestaurantAction),
});

export const Store = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<RestaurantAction>;
}>({
  state: (initialState as unknown) as InitialStateType,
  dispatch: () => null,
});

export const StoreProvider: React.FC = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = React.useReducer(rootReducer, (initialState as unknown) as InitialStateType);

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};

StoreProvider.defaultProps = { children: null };
