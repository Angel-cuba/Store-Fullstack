import { combineReducers } from 'redux';
import productsReducer from './products.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';

const createRootReducer = () =>
  combineReducers({
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
  });

export default createRootReducer;
