import { combineReducers } from 'redux';

import products from './products.reducer';
import cart from './cart.reducer';
import user from './user.reducer';

const createRootReducer = () =>
  combineReducers({
    products,
    cart,
    user,
  });

export default createRootReducer;
