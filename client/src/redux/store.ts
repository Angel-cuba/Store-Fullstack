import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AppState } from '../types/ProductType';
import createRootReducer from './reducers';
import { cartInitialState } from './reducers/cart.reducer';
import { productsInitialState } from './reducers/products.reducer';
import { userInitialState } from './reducers/user.reducer';

const appState: AppState = {
  products: productsInitialState,
  cart: cartInitialState,
  user: userInitialState,
};

export const store = createStore(createRootReducer(), appState, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
