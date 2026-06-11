import { createStore, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../types/ProductType';
import createRootReducer from './reducers';
import { productsInitialState } from './reducers/products.reducer';
import { userInitialState } from './reducers/user.reducer';
import { loadCart, saveCart } from '../util/cartStorage';

const appState: AppState = {
  products: productsInitialState,
  cart: loadCart(),
  user: userInitialState,
};

export const store = createStore(createRootReducer(), appState, applyMiddleware(thunk));

store.subscribe(() => {
  saveCart(store.getState().cart);
});

export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>;
